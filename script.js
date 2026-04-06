(() => {
  const presentationRoot = document.getElementById("presentation");
  const progressBar = document.getElementById("progress-bar");
  const currentSectionLabel = document.getElementById("current-section-label");
  const tocToggle = document.querySelector("[data-toc-toggle]");
  const tocClose = document.querySelector("[data-toc-close]");
  const tocPanel = document.getElementById("toc-panel");
  const tocBody = document.getElementById("toc-body");
  const tocScrim = document.getElementById("toc-scrim");
  const backToTop = document.querySelector("[data-back-to-top]");
  const liveRegion = document.getElementById("live-region");
  const deck = window.deckData || {};
  const chapters = Array.isArray(deck.chapters) ? deck.chapters : [];

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

  function renderComboChart(series) {
    const width = 860;
    const height = 360;
    const padding = { top: 28, right: 28, bottom: 78, left: 72 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const maxValue = Math.max(...series.values);
    const maxBar = Math.ceil(maxValue / 1000000 / 5) * 5 * 1000000;
    const minGrowth = Math.min(...series.growth);
    const maxGrowth = Math.max(...series.growth);
    const growthRange = maxGrowth - minGrowth || 1;
    const stepX = chartWidth / series.years.length;
    const barWidth = Math.min(56, stepX * 0.5);
    const ticks = new Array(5).fill(0).map((_, index) => (maxBar / 4) * index);

    const linePoints = series.values
      .map((_, index) => {
        const x = padding.left + stepX * index + stepX / 2;
        const y = padding.top + chartHeight - ((series.growth[index] - minGrowth) / growthRange) * chartHeight;
        return `${x},${y}`;
      })
      .join(" ");

    return `
      <figure class="chart-figure">
        <svg viewBox="0 0 ${width} ${height}" class="combo-chart" role="img" aria-label="${escapeAttr(series.label)}">
          ${ticks
            .map((tick) => {
              const y = padding.top + chartHeight - (tick / maxBar) * chartHeight;
              return `
                <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid-line"></line>
                <text x="${padding.left - 14}" y="${y + 5}" class="chart-axis-label" text-anchor="end">${escapeHtml(
                  formatCompact(tick)
                )}</text>
              `;
            })
            .join("")}

          ${series.values
            .map((value, index) => {
              const x = padding.left + stepX * index + stepX / 2 - barWidth / 2;
              const barHeight = (value / maxBar) * chartHeight;
              const y = padding.top + chartHeight - barHeight;
              const pointX = padding.left + stepX * index + stepX / 2;
              const pointY = padding.top + chartHeight - ((series.growth[index] - minGrowth) / growthRange) * chartHeight;
              return `
                <g class="chart-series-group">
                  <title>${escapeHtml(series.years[index])} • ${escapeHtml(formatCurrency(value))} • ${escapeHtml(
                    formatPercent(series.growth[index])
                  )}</title>
                  <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="18" class="chart-bar"></rect>
                  <circle cx="${pointX}" cy="${pointY}" r="5.5" class="chart-point"></circle>
                  <text x="${pointX}" y="${pointY - 14}" class="chart-point-label" text-anchor="middle">${escapeHtml(
                    `${Math.round(series.growth[index] * 100)}%`
                  )}</text>
                  <text x="${pointX}" y="${height - 34}" class="chart-year-label" text-anchor="middle">${escapeHtml(
                    series.years[index]
                  )}</text>
                  <text x="${pointX}" y="${y - 12}" class="chart-value-label" text-anchor="middle">${escapeHtml(
                    formatCompact(value)
                  )}</text>
                </g>
              `;
            })
            .join("")}

          <polyline points="${linePoints}" class="chart-line"></polyline>
        </svg>
        <figcaption class="chart-caption">
          <span>${escapeHtml(series.label)}</span>
          <span>${escapeHtml(series.growthLabel)}</span>
        </figcaption>
      </figure>
    `;
  }

  function renderMixChart(config) {
    const width = 860;
    const height = 360;
    const padding = { top: 28, right: 28, bottom: 78, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const maxValue = 0.8;
    const groupWidth = chartWidth / config.years.length;
    const barWidth = Math.min(26, groupWidth / 4);
    const ticks = [0, 0.2, 0.4, 0.6, 0.8];
    const colors = ["mix-bar--fixed", "mix-bar--xdt", "mix-bar--tm"];

    return `
      <figure class="chart-figure">
        <svg viewBox="0 0 ${width} ${height}" class="mix-chart" role="img" aria-label="${escapeAttr(config.label)}">
          ${ticks
            .map((tick) => {
              const y = padding.top + chartHeight - (tick / maxValue) * chartHeight;
              return `
                <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid-line"></line>
                <text x="${padding.left - 10}" y="${y + 4}" class="chart-axis-label" text-anchor="end">${escapeHtml(
                  formatPercentWhole(tick)
                )}</text>
              `;
            })
            .join("")}
          ${config.years
            .map((year, yearIndex) => {
              const startX = padding.left + groupWidth * yearIndex + groupWidth / 2 - (barWidth * config.series.length + 12) / 2;
              const bars = config.series
                .map((series, seriesIndex) => {
                  const value = series.values[yearIndex];
                  const barHeight = (value / maxValue) * chartHeight;
                  const x = startX + seriesIndex * (barWidth + 6);
                  const y = padding.top + chartHeight - barHeight;
                  return `
                    <g>
                      <title>${escapeHtml(year)} • ${escapeHtml(series.name)} • ${escapeHtml(formatPercentWhole(value))}</title>
                      <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="14" class="mix-bar ${colors[seriesIndex]}"></rect>
                    </g>
                  `;
                })
                .join("");

              return `
                <g>
                  ${bars}
                  <text x="${padding.left + groupWidth * yearIndex + groupWidth / 2}" y="${height - 34}" class="chart-year-label" text-anchor="middle">${escapeHtml(
                    year
                  )}</text>
                </g>
              `;
            })
            .join("")}
        </svg>
        <figcaption class="chart-caption">
          <span>${escapeHtml(config.label)}</span>
          <span class="chart-legend">
            ${config.series
              .map(
                (series, index) => `
                  <span class="chart-legend__item">
                    <span class="chart-legend__swatch ${colors[index]}"></span>
                    ${escapeHtml(series.name)}
                  </span>
                `
              )
              .join("")}
          </span>
        </figcaption>
      </figure>
    `;
  }

  function renderChartTabs(financial) {
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
                  aria-selected="${index === 0 ? "true" : "false"}"
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
                <section class="tab-panel${index === 0 ? " is-active" : ""}" data-tab-panel="${escapeAttr(tab.key)}">
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
          <div class="hero-copy" data-reveal>
            <span class="hero-kicker">${escapeHtml(kicker)}</span>
            <div class="hero-brand">
              <img src="${escapeAttr(brandImage)}" alt="Aptara">
            </div>
            <h1 class="hero-title">
              ${lines
                .map((line) => `<span class="hero-title__line">${stylizeTitle(line, chapter.accentPhrases)}</span>`)
                .join("")}
            </h1>
            <button class="hero-scroll" type="button" data-scroll-next>Scroll to begin</button>
          </div>
          <aside class="hero-meta" data-reveal>
            <p class="hero-meta__name">${escapeHtml(name)}</p>
            <p class="hero-meta__role">${escapeHtml(role)}</p>
            <p class="hero-meta__date">${escapeHtml(date)}</p>
          </aside>
        </div>
      </section>
    `;
  }

  function renderFinancialChapter(chapter) {
    const { revenueSeries, ebitdaSeries, revenueWon, avgDealSize, slideSnapshot } = chapter.data;
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
            ${renderChartTabs(chapter.data)}
          </div>
        </div>
      </section>
    `;
  }

  function renderRevenueWinsChapter(chapter) {
    const { note, columns, budgetRows, deltaRows, winsTitle, wins, winsTotal, slideSnapshots } = chapter.data;
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
                      <span class="wins-row__client">${escapeHtml(item.client)}</span>
                      <span class="wins-row__amount">${escapeHtml(item.amount)}</span>
                    </div>
                  `
                )
                .join("")}
            </div>
          </article>
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
    const { note, years, rows, slideSnapshot } = chapter.data;
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
                      aria-selected="${index === 0 ? "true" : "false"}"
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
                    <section class="tab-panel${index === 0 ? " is-active" : ""}" data-tab-panel="${escapeAttr(tab.key)}">
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
    const { heroImage, automation, capabilitiesBuilt } = chapter.data;
    return `
      <section class="chapter chapter--initiatives chapter--${escapeAttr(chapter.tone)}" id="${escapeAttr(chapter.id)}" data-label="${escapeAttr(chapter.title)}" data-tone="${escapeAttr(chapter.tone)}">
        ${renderChapterHeader(chapter)}
        <div class="wrap chapter-body initiatives-layout">
          <div class="initiative-copy" data-reveal>
            <article class="initiative-block">
              <h3>Automation</h3>
              ${renderBulletList(automation)}
            </article>
            <article class="initiative-block">
              <h3>AR/VR/XR &amp; AI Capabilities Built</h3>
              ${renderBulletList(capabilitiesBuilt)}
            </article>
          </div>
          <figure class="initiative-visual" data-reveal>
            <img src="${escapeAttr(heroImage)}" alt="${escapeAttr(chapter.title)}">
          </figure>
        </div>
      </section>
    `;
  }

  function renderGrowthPlanChapter(chapter) {
    const { columns, slideSnapshot } = chapter.data;
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

  function setupTabs(root = document) {
    root.querySelectorAll("[data-tabs]").forEach((group) => {
      const buttons = [...group.querySelectorAll("[data-tab-target]")];
      const panels = [...group.querySelectorAll("[data-tab-panel]")];

      const activate = (target) => {
        buttons.forEach((button) => {
          const active = button.dataset.tabTarget === target;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-selected", active ? "true" : "false");
        });
        panels.forEach((panel) => {
          panel.classList.toggle("is-active", panel.dataset.tabPanel === target);
        });
      };

      buttons.forEach((button) => {
        button.addEventListener("click", () => activate(button.dataset.tabTarget));
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

  function openToc() {
    document.body.classList.add("is-toc-open");
    tocPanel?.setAttribute("aria-hidden", "false");
    tocToggle?.setAttribute("aria-expanded", "true");
    tocScrim?.removeAttribute("hidden");
    updateBackToTopVisibility();
  }

  function closeToc() {
    document.body.classList.remove("is-toc-open");
    tocPanel?.setAttribute("aria-hidden", "true");
    tocToggle?.setAttribute("aria-expanded", "false");
    tocScrim?.setAttribute("hidden", "");
    updateBackToTopVisibility();
  }

  function scrollToId(id) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function initToc() {
    tocBody.innerHTML = chapters
      .map(
        (chapter) => `
          <button class="toc-link" type="button" data-target="${escapeAttr(chapter.id)}">
            <span class="toc-link__index">${pad(chapter.number)}</span>
            <span class="toc-link__title">${escapeHtml(chapter.title)}</span>
          </button>
        `
      )
      .join("");

    tocBody.querySelectorAll("[data-target]").forEach((button) => {
      button.addEventListener("click", () => {
        closeToc();
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
        document.body.setAttribute("data-tone", section.dataset.tone || "dark");
        document.body.setAttribute("data-active", section.id);
        currentSectionLabel.textContent = section.dataset.label || "Presentation";
        liveRegion.textContent = currentSectionLabel.textContent;
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
    });
    window.addEventListener("resize", updateProgress);
  }

  function initChrome() {
    tocToggle?.addEventListener("click", () => {
      if (document.body.classList.contains("is-toc-open")) {
        closeToc();
      } else {
        openToc();
      }
    });

    tocClose?.addEventListener("click", closeToc);
    tocScrim?.addEventListener("click", closeToc);

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
      if (event.key === "Escape") {
        closeToc();
      }
    });
  }

  function init() {
    renderNarrative();
    initToc();
    setupTabs(presentationRoot);
    initChrome();
    initObservers();
    updateBackToTopVisibility();
  }

  init();
})();
