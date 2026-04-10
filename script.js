(() => {
  const presentationRoot = document.getElementById("presentation");
  const progressBar = document.getElementById("progress-bar");
  const currentSectionLabel = document.getElementById("current-section-label");
  const chaptersToggle = document.querySelector("[data-toc-toggle]");
  const chaptersClose = document.querySelector("[data-toc-close]");
  const chaptersPanel = document.getElementById("toc-panel");
  const chaptersList = document.getElementById("toc-body");
  const chaptersScrim = document.getElementById("chapters-scrim");

  const backToTop = document.querySelector("[data-back-to-top]");
  const liveRegion = document.getElementById("live-region");
  const deck = window.deckData || {};
  const chapters = Array.isArray(deck.chapters) ? deck.chapters : [];

  let currentActiveChapter = null;
  let lastFocusedElement = null;
  const chartInstances = new Map();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let chartResizeFrame = null;

  const currency0 = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  const currencyCompact = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1
  });

  const percent0 = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 0
  });

  const percent1 = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function getClientInitials(name) {
    return String(name ?? "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  function renderClientLogo(client, logoPath) {
    if (logoPath) {
      return `<img class="wins-row__logo-image" src="${escapeAttr(logoPath)}" alt="${escapeAttr(client)} logo">`;
    }

    return `<span class="wins-row__logo" aria-hidden="true">${escapeHtml(getClientInitials(client))}</span>`;
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function formatCurrency(value) {
    return currency0.format(value ?? 0);
  }

  function formatCompact(value) {
    return currencyCompact.format(value ?? 0).replace(".0", "");
  }

  function formatPercent(value) {
    return percent1.format(value ?? 0);
  }

  function formatPercentWhole(value) {
    return percent0.format(value ?? 0);
  }

  function formatSignedPercent(value) {
    const numeric = Number(value ?? 0);
    const prefix = numeric > 0 ? "+" : numeric < 0 ? "-" : "";
    return `${prefix}${percent1.format(Math.abs(numeric))}`;
  }

  function stylizeTitle(title, accentPhrases = []) {
    let html = escapeHtml(title);
    [...accentPhrases]
      .filter(Boolean)
      .sort((a, b) => b.length - a.length)
      .forEach((phrase) => {
        const escaped = escapeHtml(phrase);
        html = html.replace(escaped, `<span class="title-accent">${escaped}</span>`);
      });
    return html;
  }

  function renderBulletList(items) {
    return `
      <ul class="bullet-list">
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    `;
  }

  function renderDetailDrawer(summary, body, className = "") {
    return `
      <details class="detail-drawer ${className}" data-reveal>
        <summary>${escapeHtml(summary)}</summary>
        <div class="detail-drawer__body">
          ${body}
        </div>
      </details>
    `;
  }

  function encodeChartPayload(payload) {
    return escapeAttr(encodeURIComponent(JSON.stringify(payload)));
  }

  function decodeChartPayload(encoded) {
    try {
      return JSON.parse(decodeURIComponent(encoded || ""));
    } catch {
      return null;
    }
  }

  function readCssVariable(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  function renderComboChart(series) {
    return `
      <figure class="chart-figure chart-figure--interactive">
        <div
          class="echart-canvas"
          data-chart-type="combo"
          data-chart-payload="${encodeChartPayload(series)}"
          role="img"
          aria-label="${escapeAttr(`${series.label} and ${series.growthLabel} by year`)}"
        ></div>
        <figcaption class="chart-caption">
          <span>${escapeHtml(series.label)}</span>
          <span>Hover data points for yearly values and growth.</span>
        </figcaption>
      </figure>
    `;
  }

  function renderMixChart(config) {
    return `
      <figure class="chart-figure chart-figure--interactive">
        <div
          class="echart-canvas"
          data-chart-type="mix"
          data-chart-payload="${encodeChartPayload(config)}"
          role="img"
          aria-label="${escapeAttr(config.label)}"
        ></div>
        <figcaption class="chart-caption">
          <span>${escapeHtml(config.label)}</span>
          <span>Toggle series in the legend and inspect contribution by year.</span>
        </figcaption>
      </figure>
    `;
  }

  function buildTooltipMarkup(title, rows) {
    return `
      <div class="tooltip-card">
        <div class="tooltip-card__title">${escapeHtml(title)}</div>
        ${rows
          .map(
            (row) => `
              <div class="tooltip-card__row">
                <span>${escapeHtml(row.label)}</span>
                <strong>${escapeHtml(row.value)}</strong>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  function createComboChartOption(series) {
    const blue = readCssVariable("--color-blue", "#67a9ff");
    const gold = readCssVariable("--color-gold", "#bf8a54");
    const inkStrong = readCssVariable("--color-text-primary-light", "#121a24");
    const inkSoft = readCssVariable("--color-text-tertiary-light", "#778295");
    const grid = readCssVariable("--color-border-dark-subtle", "rgba(18, 26, 36, 0.08)");
    const animationEnabled = !prefersReducedMotion.matches;
    const minGrowth = Math.min(...series.growth);
    const maxGrowth = Math.max(...series.growth);
    const growthPadding = Math.max((maxGrowth - minGrowth) * 0.18, 0.08);

    return {
      aria: {
        enabled: true
      },
      animation: animationEnabled,
      animationDuration: 720,
      animationEasing: "cubicOut",
      animationDurationUpdate: 420,
      grid: {
        top: 30,
        right: 80,
        bottom: 46,
        left: 72
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(8, 12, 18, 0.96)",
        borderColor: "rgba(248, 245, 238, 0.12)",
        borderWidth: 1,
        padding: 0,
        extraCssText: "border-radius: 18px; box-shadow: 0 22px 52px rgba(0,0,0,0.24);",
        className: "echarts-premium-tooltip",
        axisPointer: {
          type: "shadow",
          shadowStyle: {
            color: "rgba(103, 169, 255, 0.08)"
          }
        },
        formatter(params) {
          const barPoint = params.find((item) => item.seriesType === "bar");
          const linePoint = params.find((item) => item.seriesType === "line");
          const year = barPoint?.axisValueLabel || linePoint?.axisValueLabel || "";

          return buildTooltipMarkup(year, [
            {
              label: series.label,
              value: formatCurrency(barPoint?.data ?? 0)
            },
            {
              label: series.growthLabel,
              value: formatSignedPercent(linePoint?.data ?? 0)
            }
          ]);
        }
      },
      xAxis: {
        type: "category",
        data: series.years,
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            color: grid
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: inkSoft,
          fontFamily: "Instrument Sans",
          fontSize: 11,
          margin: 16
        }
      },
      yAxis: [
        {
          type: "value",
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            lineStyle: {
              color: grid
            }
          },
          axisLabel: {
            color: inkSoft,
            fontFamily: "Instrument Sans",
            fontSize: 11,
            formatter(value) {
              return formatCompact(value);
            }
          }
        },
        {
          type: "value",
          min: minGrowth - growthPadding,
          max: maxGrowth + growthPadding,
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: {
            color: inkSoft,
            fontFamily: "Instrument Sans",
            fontSize: 11,
            formatter(value) {
              return `${Math.round(value * 100)}%`;
            }
          }
        }
      ],
      series: [
        {
          name: series.label,
          type: "bar",
          barMaxWidth: 42,
          itemStyle: {
            color: blue,
            borderRadius: [16, 16, 6, 6],
            shadowColor: "rgba(103, 169, 255, 0.18)",
            shadowBlur: 10,
            shadowOffsetY: 6
          },
          emphasis: {
            focus: "series",
            itemStyle: {
              color: gold,
              shadowColor: "rgba(191, 138, 84, 0.32)",
              shadowBlur: 24,
              shadowOffsetY: 10
            }
          },
          data: series.values
        },
        {
          name: series.growthLabel,
          type: "line",
          yAxisIndex: 1,
          smooth: 0.32,
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            color: "#ffffff",
            borderColor: gold,
            borderWidth: 3
          },
          lineStyle: {
            color: gold,
            width: 3
          },
          emphasis: {
            focus: "series",
            scale: true,
            itemStyle: {
              color: inkStrong,
              borderColor: gold,
              borderWidth: 4,
              shadowBlur: 18,
              shadowColor: "rgba(191, 138, 84, 0.28)"
            }
          },
          data: series.growth
        }
      ]
    };
  }

  function createMixChartOption(config) {
    const inkSoft = readCssVariable("--color-text-tertiary-light", "#778295");
    const grid = readCssVariable("--color-border-dark-subtle", "rgba(18, 26, 36, 0.08)");
    const fixedColor = "#1d782e";
    const xdtColor = readCssVariable("--color-violet", "#8477ff");
    const tmColor = readCssVariable("--color-blue", "#67a9ff");
    const palette = [fixedColor, xdtColor, tmColor];
    const animationEnabled = !prefersReducedMotion.matches;

    return {
      aria: {
        enabled: true
      },
      color: palette,
      animation: animationEnabled,
      animationDuration: 700,
      animationEasing: "cubicOut",
      animationDurationUpdate: 420,
      grid: {
        top: 34,
        right: 26,
        bottom: 78,
        left: 60
      },
      legend: {
        bottom: 8,
        left: 0,
        icon: "circle",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: inkSoft,
          fontFamily: "Instrument Sans",
          fontSize: 12
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          shadowStyle: {
            color: "rgba(132, 119, 255, 0.08)"
          }
        },
        backgroundColor: "rgba(8, 12, 18, 0.96)",
        borderColor: "rgba(248, 245, 238, 0.12)",
        borderWidth: 1,
        padding: 0,
        extraCssText: "border-radius: 18px; box-shadow: 0 22px 52px rgba(0,0,0,0.24);",
        className: "echarts-premium-tooltip",
        formatter(params) {
          const year = params[0]?.axisValueLabel || "";
          const rows = params.map((item) => ({
            label: item.seriesName,
            value: formatPercentWhole(item.data)
          }));

          return buildTooltipMarkup(year, rows);
        }
      },
      xAxis: {
        type: "category",
        data: config.years,
        axisLine: {
          lineStyle: {
            color: grid
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: inkSoft,
          fontFamily: "Instrument Sans",
          fontSize: 11,
          margin: 16
        }
      },
      yAxis: {
        type: "value",
        max: 1.0,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: {
            color: grid
          }
        },
        axisLabel: {
          color: inkSoft,
          fontFamily: "Instrument Sans",
          fontSize: 11,
          formatter(value) {
            return formatPercentWhole(value);
          }
        }
      },
      series: config.series.map((series, index) => ({
        name: series.name,
        type: "bar",
        stack: "mix",
        barMaxWidth: 34,
        itemStyle: {
          color: palette[index],
          borderRadius: index === config.series.length - 1 ? [14, 14, 4, 4] : [0, 0, 0, 0]
        },
        emphasis: {
          focus: "series",
          itemStyle: {
            shadowBlur: 18,
            shadowColor: `${palette[index]}55`
          }
        },
        data: series.values
      }))
    };
  }

  function renderChart(node) {
    if (!(node instanceof HTMLElement) || !window.echarts) {
      return;
    }

    const parentPanel = node.closest("[data-tab-panel]");
    if (parentPanel?.hidden) {
      return;
    }

    const payload = decodeChartPayload(node.dataset.chartPayload);
    if (!payload) {
      return;
    }

    let instance = chartInstances.get(node);
    if (!instance) {
      instance = window.echarts.init(node, null, { renderer: "canvas" });
      chartInstances.set(node, instance);
    }

    const option = node.dataset.chartType === "mix"
      ? createMixChartOption(payload)
      : createComboChartOption(payload);

    instance.setOption(option, true);
    instance.resize();
  }

  function refreshCharts(scope = document) {
    scope.querySelectorAll("[data-chart-type]").forEach((node) => {
      renderChart(node);
    });
  }

  function queueChartResize() {
    if (chartResizeFrame) {
      cancelAnimationFrame(chartResizeFrame);
    }

    chartResizeFrame = requestAnimationFrame(() => {
      chartInstances.forEach((instance, element) => {
        if (element.isConnected) {
          instance.resize();
        }
      });
    });
  }

  function renderFinancialDetailTable(financial) {
    return `
      <div class="financial-detail-grid">
        <div class="table-shell table-shell--detail">
          <table class="clean-table clean-table--financial-detail">
            <thead>
              <tr>
                <th>Year</th>
                <th>Revenue</th>
                <th>Revenue Growth %</th>
                <th>EBITDA</th>
                <th>EBITDA Growth %</th>
              </tr>
            </thead>
            <tbody>
              ${financial.revenueSeries.years
                .map(
                  (year, index) => `
                    <tr>
                      <th>${escapeHtml(year)}</th>
                      <td>${escapeHtml(formatCurrency(financial.revenueSeries.values[index]))}</td>
                      <td>${escapeHtml(formatPercent(financial.revenueSeries.growth[index]))}</td>
                      <td>${escapeHtml(formatCurrency(financial.ebitdaSeries.values[index]))}</td>
                      <td>${escapeHtml(formatPercent(financial.ebitdaSeries.growth[index]))}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderChartTabs(financial, chapterId) {
    const tabs = [
      { key: "revenue", label: "Revenue", chart: renderComboChart(financial.revenueSeries) },
      { key: "ebitda", label: "EBITDA", chart: renderComboChart(financial.ebitdaSeries) },
      { key: "mix", label: "XDT Contribution", chart: renderMixChart(financial.mixSeries) }
    ];

    return `
      <div class="chart-tabs" data-tabs>
        <div class="tab-list" role="tablist" aria-label="Financial views">
          ${tabs
            .map(
              (tab, index) => `
                <button
                  class="tab-button${index === 0 ? " is-active" : ""}"
                  type="button"
                  role="tab"
                  id="${escapeAttr(`${chapterId}-tab-${tab.key}`)}"
                  aria-controls="${escapeAttr(`${chapterId}-panel-${tab.key}`)}"
                  aria-selected="${index === 0 ? "true" : "false"}"
                  tabindex="${index === 0 ? "0" : "-1"}"
                  data-tab-target="${escapeAttr(tab.key)}"
                >
                  ${escapeHtml(tab.label)}
                </button>
              `
            )
            .join("")}
        </div>
        <div class="tab-panels">
          ${tabs
            .map(
              (tab, index) => `
                <section
                  class="tab-panel${index === 0 ? " is-active" : ""}"
                  id="${escapeAttr(`${chapterId}-panel-${tab.key}`)}"
                  role="tabpanel"
                  aria-labelledby="${escapeAttr(`${chapterId}-tab-${tab.key}`)}"
                  ${index === 0 ? "" : "hidden"}
                  data-tab-panel="${escapeAttr(tab.key)}"
                >
                  ${tab.chart}
                </section>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderChapterHeader(chapter) {
    return `
      <header class="chapter-header wrap" data-reveal>
        <div class="chapter-header__number">${pad(chapter.number)}</div>
        <h2 class="chapter-header__title">${stylizeTitle(chapter.title, chapter.accentPhrases)}</h2>
      </header>
    `;
  }

  function renderHeroChapter(chapter) {
    const { brandImage, heroVideo } = deck;
    const { kicker, lines, name, role, date } = chapter.data;
    return `
      <section class="chapter chapter--hero chapter--${escapeAttr(chapter.tone)}" id="${escapeAttr(chapter.id)}" data-label="${escapeAttr(chapter.title)}" data-tone="${escapeAttr(chapter.tone)}">
        <div class="hero-media">
          <video class="hero-video" autoplay muted loop playsinline preload="auto">
            <source src="${escapeAttr(heroVideo)}" type="video/mp4">
          </video>
          <div class="hero-overlay"></div>
        </div>
        <div class="wrap hero-layout">
          <div class="hero-content">
            <div class="hero-copy" data-reveal>
              <div class="hero-context">
                <img class="hero-logo" src="${escapeAttr(brandImage)}" alt="Aptara">
                <span class="hero-kicker">${escapeHtml(kicker)}</span>
              </div>
              <h1 class="hero-title" data-reveal>
                ${lines
                  .map((line) => `<span class="hero-title__line">${stylizeTitle(line, chapter.accentPhrases)}</span>`)
                  .join("")}
              </h1>
              <button class="hero-scroll" type="button" data-scroll-next>
                <span>Scroll to begin</span>
              </button>
            </div>
            <aside class="hero-meta" data-reveal>
              <div class="hero-meta__container">
                <div class="hero-meta__speaker">
                  <p class="hero-meta__name">${escapeHtml(name)}</p>
                  <p class="hero-meta__role">${escapeHtml(role)}</p>
                </div>
                <div class="hero-meta__date">${escapeHtml(date)}</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    `;
  }

  function renderFinancialChapter(chapter) {
    const { revenueSeries, ebitdaSeries, revenueWon, avgDealSize } = chapter.data;
    return `
      <section class="chapter chapter--financial chapter--${escapeAttr(chapter.tone)}" id="${escapeAttr(chapter.id)}" data-label="${escapeAttr(chapter.title)}" data-tone="${escapeAttr(chapter.tone)}">
        ${renderChapterHeader(chapter)}
        <div class="wrap chapter-body chapter-body--financial">
          <div class="metric-row" data-reveal>
            <article class="metric-card">
              <span class="metric-card__label">2025-26 Revenue (Forecast)</span>
              <strong class="metric-card__value">${escapeHtml(formatCompact(revenueSeries.values[4]))}</strong>
            </article>
            <article class="metric-card">
              <span class="metric-card__label">2025-26 EBITDA (Forecast)</span>
              <strong class="metric-card__value">${escapeHtml(formatCompact(ebitdaSeries.values[4]))}</strong>
            </article>
            <article class="metric-card">
              <span class="metric-card__label">Revenue Won FY’26</span>
              <strong class="metric-card__value">${escapeHtml(formatCompact(revenueWon))}</strong>
            </article>
            <article class="metric-card metric-card--quiet">
              <span class="metric-card__label">Avg. Deal Size Won FY’26</span>
              <strong class="metric-card__value">${escapeHtml(formatCurrency(avgDealSize))}</strong>
            </article>
          </div>
          <div class="financial-surface" data-reveal>
            ${renderChartTabs(chapter.data, chapter.id)}
          </div>
          ${renderDetailDrawer("View detailed financials", renderFinancialDetailTable(chapter.data), "detail-drawer--financial")}
        </div>
      </section>
    `;
  }

  function renderRevenueWinsChapter(chapter) {
    const { note, columns, budgetRows, deltaRows, winsTitle, wins, winsTotal } = chapter.data;
    return `
      <section class="chapter chapter--revenueWins chapter--${escapeAttr(chapter.tone)}" id="${escapeAttr(chapter.id)}" data-label="${escapeAttr(chapter.title)}" data-tone="${escapeAttr(chapter.tone)}">
        ${renderChapterHeader(chapter)}
        <div class="wrap chapter-body chapter-body--split">
          <article class="data-surface data-surface--table" data-reveal>
            <div class="surface-head">
              <span class="surface-title">${escapeHtml(chapter.title)}</span>
              <span class="surface-note">${escapeHtml(note)}</span>
            </div>
            <div class="table-shell">
              <table class="clean-table clean-table--financial">
                <thead>
                  <tr>
                    <th>ENT</th>
                    ${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}
                  </tr>
                </thead>
                <tbody>
                  ${budgetRows
                    .map(
                      (row) => `
                        <tr class="${row.emphasis ? "is-emphasis" : ""}">
                          <th>${escapeHtml(row.label)}</th>
                          ${row.values.map((value) => `<td>${escapeHtml(value)}</td>`).join("")}
                        </tr>
                      `
                    )
                    .join("")}
                  <tr class="clean-table__spacer"><td colspan="5"></td></tr>
                  ${deltaRows
                    .map(
                      (row) => `
                        <tr>
                          <th>${escapeHtml(row.label)}</th>
                          ${row.values.map((value) => `<td>${escapeHtml(value)}</td>`).join("")}
                        </tr>
                      `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </article>

          <article class="data-surface data-surface--wins" data-reveal>
            <div class="surface-head">
              <span class="surface-title">${escapeHtml(winsTitle)}</span>
            </div>
            <div class="wins-summary">
              <span class="wins-summary__label">Total won</span>
              <strong class="wins-summary__value">${escapeHtml(winsTotal)}</strong>
            </div>
            <div class="wins-list">
              ${wins
                .map(
                  (item) => `
                    <div class="wins-row">
                      <div class="wins-row__client-meta">
                        <span class="wins-row__client">${escapeHtml(item.client)}</span>
                      </div>
                      <span class="wins-row__amount">${escapeHtml(item.amount)}</span>
                    </div>
                  `
                )
                .join("")}
            </div>
          </article>
        </div>
        <div class="wins-logos-marquee__container wins-logos-marquee__fullwidth">
          <div class="wins-logos-marquee" aria-hidden="true">
            ${[...wins.filter(item => item.logo), ...wins.filter(item => item.logo)]
              .map(item => `<img class="wins-row__logo-image" src="${escapeAttr(item.logo)}" alt="${escapeAttr(item.client)} logo">`)
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function buildTrendHighlights(rows) {
    const byClient = Object.fromEntries(rows.map((row) => [row.client, row]));
    const formatAmount = (value) => formatCompact(value * 1000);
    const atnt = byClient["AT&T"];
    const pmi = byClient["PMI"];
    const pge = byClient["Pacific Gas & Electric"];
    const ey = byClient["Ernst & Young"];
    const pwc = byClient["PricewaterhouseCoopers"];
    const kpmg = byClient["KPMG LLP"];

    return [
      {
        label: "FY’26 leader",
        text: `AT&T moved from rank ${atnt.values[0].rank} in FY’21 to rank ${atnt.values[5].rank} in FY’26, reaching ${formatAmount(
          atnt.values[5].amount
        )}.`
      },
      {
        label: "New concentration",
        text: `PMI entered the mix in FY’24 and climbed to rank ${pmi.values[5].rank} in FY’26 at ${formatAmount(
          pmi.values[5].amount
        )}.`
      },
      {
        label: "Emerging anchor",
        text: `Pacific Gas & Electric rose from outside the early mix to rank ${pge.values[5].rank} in FY’26 at ${formatAmount(
          pge.values[5].amount
        )}.`
      },
      {
        label: "Legacy shift",
        text: `Ernst & Young, PricewaterhouseCoopers, and KPMG LLP led FY’21, but by FY’26 they stood at ranks ${ey.values[5].rank}, ${pwc.values[5].rank}, and ${kpmg.values[5].rank}.`
      }
    ];
  }

  function renderTrendChapter(chapter) {
    const { note, years, rows } = chapter.data;
    const highlights = buildTrendHighlights(rows);
    return `
      <section class="chapter chapter--trend chapter--${escapeAttr(chapter.tone)}" id="${escapeAttr(chapter.id)}" data-label="${escapeAttr(chapter.title)}" data-tone="${escapeAttr(chapter.tone)}">
        ${renderChapterHeader(chapter)}
        <div class="wrap chapter-body">
          <div class="trend-shell" data-reveal>
            <p class="trend-lede">
              Over the past 6 years, our Top 10 client composition has changed significantly, reflecting a material shift in where enterprise revenue is concentrated.
            </p>
            <div class="trend-highlights">
              ${highlights
                .map(
                  (item, index) => `
                    <article class="trend-highlight">
                      <span class="trend-highlight__index">${pad(index + 1)}</span>
                      <div class="trend-highlight__body">
                        <h3>${escapeHtml(item.label)}</h3>
                        <p>${escapeHtml(item.text)}</p>
                      </div>
                    </article>
                  `
                )
                .join("")}
            </div>
          </div>
          ${renderDetailDrawer(
            "View full client trend matrix",
            `
              <div class="surface-head">
                <span class="surface-title">${escapeHtml(chapter.title)}</span>
                <span class="surface-note">${escapeHtml(note)}</span>
              </div>
              <div class="matrix-scroll">
                <table class="trend-table">
                  <thead>
                    <tr>
                      <th rowspan="2" class="trend-table__client-head">Client Name</th>
                      ${years.map((year) => `<th colspan="2">${escapeHtml(year)}</th>`).join("")}
                    </tr>
                    <tr>
                      ${years.map(() => "<th>Rank</th><th>Amounts ($)</th>").join("")}
                    </tr>
                  </thead>
                  <tbody>
                    ${rows
                      .map(
                        (row) => `
                          <tr>
                            <th>${escapeHtml(row.client)}</th>
                            ${row.values
                              .map(
                                (value) => `
                                  <td>${escapeHtml(String(value.rank))}</td>
                                  <td>${escapeHtml(`$${value.amount.toLocaleString("en-US")}`)}</td>
                                `
                              )
                              .join("")}
                          </tr>
                        `
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            `,
            "detail-drawer--matrix"
          )}
        </div>
      </section>
    `;
  }

  function renderRankingPanel(tab) {
    const featured = tab.entries[0];
    const topFive = tab.entries.slice(0, 5);
    const maxValue = topFive[0].amount;
    const remainder = tab.entries.slice(5);
    return `
      <div class="ranking-panel">
        <div class="ranking-panel__head">
          <span class="surface-title">${escapeHtml(tab.subheading)}</span>
        </div>
        <div class="ranking-panel__body">
          <div class="ranking-feature">
            <span class="ranking-feature__label">#01 ${escapeHtml(featured.client)}</span>
            <strong class="ranking-feature__value">${escapeHtml(formatCurrency(featured.amount))}</strong>
          </div>
          <div class="ranking-bars">
            ${topFive
              .slice(1)
              .map(
                (entry, index) => `
                  <div class="ranking-bar">
                    <div class="ranking-bar__meta">
                      <span class="ranking-bar__rank">${pad(index + 2)}</span>
                      <span class="ranking-bar__client">${escapeHtml(entry.client)}</span>
                      <span class="ranking-bar__value">${escapeHtml(formatCurrency(entry.amount))}</span>
                    </div>
                    <div class="ranking-bar__track">
                      <span class="ranking-bar__fill" style="width:${(entry.amount / maxValue) * 100}%"></span>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="ranking-remainder">
          ${remainder
            .map(
              (entry, index) => `
                <div class="ranking-remainder__item">
                  <span class="ranking-bar__rank">${pad(index + 6)}</span>
                  <span class="ranking-remainder__client">${escapeHtml(entry.client)}</span>
                  <span class="ranking-remainder__value">${escapeHtml(formatCurrency(entry.amount))}</span>
                </div>
              `
            )
            .join("")}
        </div>
        ${renderDetailDrawer(
          "View full top 10 list",
          `
            <table class="clean-table clean-table--ranking">
              <thead>
                <tr><th>Client Name</th><th>Amount ($)</th></tr>
              </thead>
              <tbody>
                ${tab.entries
                  .map(
                    (entry) => `
                      <tr>
                        <th>${escapeHtml(entry.client)}</th>
                        <td>${escapeHtml(formatCurrency(entry.amount))}</td>
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
          `,
          "detail-drawer--ranking"
        )}
      </div>
    `;
  }

  function renderRankingChapter(chapter) {
    const tabs = chapter.data.tabs;
    return `
      <section class="chapter chapter--rankings chapter--${escapeAttr(chapter.tone)}" id="${escapeAttr(chapter.id)}" data-label="${escapeAttr(chapter.title)}" data-tone="${escapeAttr(chapter.tone)}">
        ${renderChapterHeader(chapter)}
        <div class="wrap chapter-body">
          <div class="chart-tabs" data-tabs data-reveal>
            <div class="tab-list" role="tablist" aria-label="Top client views">
              ${tabs
                .map(
                  (tab, index) => `
                    <button
                      class="tab-button${index === 0 ? " is-active" : ""}"
                      type="button"
                      role="tab"
                      id="${escapeAttr(`${chapter.id}-tab-${tab.key}`)}"
                      aria-controls="${escapeAttr(`${chapter.id}-panel-${tab.key}`)}"
                      aria-selected="${index === 0 ? "true" : "false"}"
                      tabindex="${index === 0 ? "0" : "-1"}"
                      data-tab-target="${escapeAttr(tab.key)}"
                    >
                      ${escapeHtml(tab.label)}
                    </button>
                  `
                )
                .join("")}
            </div>
            <div class="tab-panels">
              ${tabs
                .map(
                  (tab, index) => `
                    <section
                      class="tab-panel${index === 0 ? " is-active" : ""}"
                      id="${escapeAttr(`${chapter.id}-panel-${tab.key}`)}"
                      role="tabpanel"
                      aria-labelledby="${escapeAttr(`${chapter.id}-tab-${tab.key}`)}"
                      ${index === 0 ? "" : "hidden"}
                      data-tab-panel="${escapeAttr(tab.key)}"
                    >
                      ${renderRankingPanel(tab)}
                    </section>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderInitiativesChapter(chapter) {
    const { automation, capabilitiesBuilt } = chapter.data;
    return `
      <section class="chapter chapter--initiatives chapter--${escapeAttr(chapter.tone)}" id="${escapeAttr(chapter.id)}" data-label="${escapeAttr(chapter.title)}" data-tone="${escapeAttr(chapter.tone)}">
        ${renderChapterHeader(chapter)}
        <div class="wrap chapter-body">
          <div class="initiatives-grid" data-reveal>
            <article class="initiative-card">
              <h3>Automation Initiatives</h3>
              ${renderBulletList(automation)}
            </article>
            <article class="initiative-card">
              <h3>AR/VR/XR & AI Capabilities</h3>
              ${renderBulletList(capabilitiesBuilt)}
            </article>
          </div>
        </div>
      </section>
    `;
  }

  function renderGrowthPlanChapter(chapter) {
    const { columns } = chapter.data;
    return `
      <section class="chapter chapter--growth-plan chapter--${escapeAttr(chapter.tone)}" id="${escapeAttr(chapter.id)}" data-label="${escapeAttr(chapter.title)}" data-tone="${escapeAttr(chapter.tone)}">
        ${renderChapterHeader(chapter)}
        <div class="wrap chapter-body">
          <div class="plan-grid" data-reveal>
            ${columns
              .map(
                (column) => `
                  <article class="plan-card">
                    <h3>${stylizeTitle(column.title, chapter.accentPhrases)}</h3>
                    ${renderBulletList(column.bullets)}
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderChapter(chapter) {
    switch (chapter.template) {
      case "hero":
        return renderHeroChapter(chapter);
      case "financial":
        return renderFinancialChapter(chapter);
      case "revenueWins":
        return renderRevenueWinsChapter(chapter);
      case "trendMatrix":
        return renderTrendChapter(chapter);
      case "rankings":
        return renderRankingChapter(chapter);
      case "initiatives":
        return renderInitiativesChapter(chapter);
      case "growthPlan":
        return renderGrowthPlanChapter(chapter);
      default:
        return "";
    }
  }

  function renderNarrative() {
    presentationRoot.innerHTML = chapters.map((chapter) => renderChapter(chapter)).join("");
  }

  function setActiveChapterLink(id) {
    chaptersList?.querySelectorAll("[data-target]").forEach((button) => {
      const isActive = button.dataset.target === id;
      button.classList.toggle("is-active", isActive);
      if (isActive) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  function setupTabs(root = document) {
    root.querySelectorAll("[data-tabs]").forEach((group) => {
      const buttons = [...group.querySelectorAll("[data-tab-target]")];
      const panels = [...group.querySelectorAll("[data-tab-panel]")];

      const activate = (target) => {
        buttons.forEach((button) => {
          const active = button.dataset.tabTarget === target;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-selected", active ? "true" : "false");
          button.tabIndex = active ? 0 : -1;
        });
        panels.forEach((panel) => {
          const active = panel.dataset.tabPanel === target;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });
        requestAnimationFrame(() => refreshCharts(group));
      };

      buttons.forEach((button) => {
        button.addEventListener("click", () => activate(button.dataset.tabTarget));
      });

      group.addEventListener("keydown", (event) => {
        const currentIndex = buttons.findIndex((button) => button === document.activeElement);
        if (currentIndex === -1) {
          return;
        }

        let nextIndex = currentIndex;
        if (event.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % buttons.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = buttons.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        buttons[nextIndex].focus();
        activate(buttons[nextIndex].dataset.tabTarget);
      });
    });
  }

  function updateBackToTopVisibility() {
    if (!backToTop) {
      return;
    }
    const visible = window.scrollY > window.innerHeight * 0.7 && !document.body.classList.contains("is-toc-open");
    backToTop.classList.toggle("is-visible", visible);
  }

  function primeHeroVideo() {
    const heroVideo = document.querySelector(".hero-video");
    if (!(heroVideo instanceof HTMLVideoElement)) {
      return;
    }

    const seekToHighlightFrame = () => {
      if (heroVideo.duration && heroVideo.currentTime < 0.9) {
        heroVideo.currentTime = Math.min(1.25, Math.max(heroVideo.duration - 0.25, 0));
      }
      heroVideo.play().catch(() => {});
    };

    if (heroVideo.readyState >= 1) {
      seekToHighlightFrame();
      return;
    }

    heroVideo.addEventListener("loadedmetadata", seekToHighlightFrame, { once: true });
  }

  function openToc() {
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.classList.add("is-toc-open");
    chaptersPanel?.setAttribute("aria-hidden", "false");
    chaptersToggle?.setAttribute("aria-expanded", "true");
    chaptersScrim?.removeAttribute("hidden");
    updateBackToTopVisibility();
    requestAnimationFrame(() => {
      const activeLink = chaptersList?.querySelector(".toc-link.is-active");
      const firstFocusable = activeLink || chaptersClose || chaptersList?.querySelector(".toc-link");
      firstFocusable?.focus();
    });
  }

  function closeToc(restoreFocus = true) {
    document.body.classList.remove("is-toc-open");
    chaptersPanel?.setAttribute("aria-hidden", "true");
    chaptersToggle?.setAttribute("aria-expanded", "false");
    chaptersScrim?.setAttribute("hidden", "");
    updateBackToTopVisibility();
    if (restoreFocus && lastFocusedElement) {
      requestAnimationFrame(() => lastFocusedElement?.focus());
    }
    lastFocusedElement = null;
  }

  function scrollToId(id) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function initToc() {
    chaptersList.innerHTML = chapters
      .map(
        (chapter) => `
          <li>
            <button class="toc-link" type="button" data-target="${escapeAttr(chapter.id)}">
              <span class="toc-link__index">${pad(chapter.number)}</span>
              <span class="toc-link__title">${escapeHtml(chapter.title)}</span>
            </button>
          </li>
        `
      )
      .join("");

    chaptersList.querySelectorAll("[data-target]").forEach((button) => {
      button.addEventListener("click", () => {
        closeToc(false);
        scrollToId(button.dataset.target);
      });
    });


  }



  function initObservers() {
    const sections = [...document.querySelectorAll(".chapter")];
    if (!sections.length) {
      return;
    }

    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      progressBar.style.transform = `scaleX(${Math.max(0.02, Math.min(1, progress))})`;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!activeEntry) {
          return;
        }

        const section = activeEntry.target;
        currentActiveChapter = section.id;
        document.body.setAttribute("data-tone", section.dataset.tone || "dark");
        document.body.setAttribute("data-active", section.id);
        currentSectionLabel.textContent = section.dataset.label || "Presentation";
        liveRegion.textContent = currentSectionLabel.textContent;
        setActiveChapterLink(section.id);
      },
      {
        rootMargin: "-18% 0px -50% 0px",
        threshold: [0.2, 0.35, 0.5, 0.65]
      }
    );

    sections.forEach((section) => observer.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.16 }
    );

    document.querySelectorAll("[data-reveal]").forEach((node) => revealObserver.observe(node));

    updateProgress();
    window.addEventListener("scroll", () => {
      updateProgress();
      updateBackToTopVisibility();
    }, { passive: true });
    window.addEventListener("resize", () => {
      updateProgress();
      queueChartResize();
    });
  }

  function initChrome() {
    chaptersToggle?.addEventListener("click", () => {
      if (document.body.classList.contains("is-toc-open")) {
        closeToc();
      } else {
        openToc();
      }
    });

    chaptersClose?.addEventListener("click", closeToc);
    chaptersScrim?.addEventListener("click", closeToc);

    backToTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.querySelectorAll("[data-scroll-next]").forEach((button) => {
      button.addEventListener("click", () => {
        const current = button.closest(".chapter");
        const next = current?.nextElementSibling;
        if (next instanceof HTMLElement) {
          next.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("is-toc-open")) {
        event.preventDefault();
        closeToc();
      }

      if (event.key !== "Tab" || !document.body.classList.contains("is-toc-open")) {
        return;
      }

      const focusableElements = chaptersPanel?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (
        document.body.classList.contains("is-toc-open") &&
        target instanceof HTMLElement &&
        !chaptersPanel?.contains(target) &&
        !chaptersToggle?.contains(target)
      ) {
        closeToc();
      }
    });
  }

  function init() {
    renderNarrative();
    initToc();
    setupTabs(presentationRoot);
    refreshCharts(presentationRoot);
    primeHeroVideo();
    initChrome();
    initObservers();
    updateBackToTopVisibility();
    if (chapters.length) {
      setActiveChapterLink(chapters[0].id);
    }
  }

  init();
})();
