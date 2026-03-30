import React, { useMemo, useState } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import htm from "https://esm.sh/htm@3.1.1";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "https://esm.sh/recharts@2.15.1?deps=react@18.3.1,react-dom@18.3.1";

const html = htm.bind(React.createElement);

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

const percent1 = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

const overviewConfig = {
  revenue: { label: "Revenue", color: "#0f2f54" },
  ebitda: { label: "EBITDA", color: "#c28d4c" }
};

const mixConfig = {
  fixedBid: { label: "Fixed Bid", color: "#d9d6ce" },
  xdt: { label: "XDT", color: "#245a61" },
  tm: { label: "T&M", color: "#8ea1d6" },
  xdtShare: { label: "XDT Contribution", color: "#c28d4c" }
};

const winConfig = {
  revenueWon: { label: "Revenue Won", color: "#0f2f54" },
  avgDealSize: { label: "Avg. Deal Size", color: "#245a61" }
};

function setFromToggle(prev, key) {
  const next = new Set(prev);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  return next;
}

function formatCurrency(value) {
  return currency0.format(Number(value) || 0);
}

function ChartContainer({ config, className = "", children }) {
  const style = Object.fromEntries(
    Object.entries(config || {}).map(([key, item]) => [`--color-${key}`, item.color])
  );

  return html`<div className=${`chart-container ${className}`.trim()} style=${style}>${children}</div>`;
}

function ChartTooltipContent({ active, payload, label, valueFormatter }) {
  if (!active || !payload?.length) {
    return null;
  }

  return html`
    <div className="chart-tooltip-card">
      <div className="chart-tooltip-card__label">${label}</div>
      <div className="chart-tooltip-card__rows">
        ${payload
          .filter((item) => item && item.value != null)
          .map(
            (item) => html`
              <div className="chart-tooltip-card__row" key=${item.dataKey}>
                <span className="chart-tooltip-card__swatch" style=${{ background: item.color }}></span>
                <span className="chart-tooltip-card__name">${item.name}</span>
                <strong className="chart-tooltip-card__value">
                  ${(valueFormatter?.[item.dataKey] || ((value) => value))(item.value)}
                </strong>
              </div>
            `
          )}
      </div>
    </div>
  `;
}

function ChartLegendContent({ payload, hiddenKeys, onToggle, config }) {
  if (!payload?.length) {
    return null;
  }

  return html`
    <div className="chart-legend">
      ${payload.map((item) => {
        const key = item.dataKey;
        const hidden = hiddenKeys.has(key);
        const label = config?.[key]?.label || item.value;

        return html`
          <button
            key=${key}
            className=${`chart-legend__item${hidden ? " is-muted" : ""}`}
            type="button"
            onClick=${() => onToggle(key)}
          >
            <span className="chart-legend__swatch" style=${{ background: item.color }}></span>
            <span>${label}</span>
          </button>
        `;
      })}
    </div>
  `;
}

function FinancialChartsApp({ data }) {
  const [view, setView] = useState("overview");

  const overviewData = useMemo(
    () =>
      data.financial.panels[0].points.map((point, index) => ({
        year: point.label,
        revenue: point.value,
        ebitda: data.financial.panels[1].points[index].value
      })),
    [data]
  );

  const mixData = useMemo(
    () =>
      data.xdt.years.map((year, index) => ({
        year,
        fixedBid: data.xdt.absoluteSeries[0].values[index],
        xdt: data.xdt.absoluteSeries[1].values[index],
        tm: data.xdt.absoluteSeries[2].values[index],
        xdtShare: data.xdt.shareSeries[1].values[index]
      })),
    [data]
  );

  const winData = useMemo(
    () =>
      data.winMetrics.revenueWon.map((entry, index) => ({
        segment: entry.label,
        revenueWon: entry.amount,
        avgDealSize: data.winMetrics.avgDealSize[index].amount
      })),
    [data]
  );

  const views = {
    overview: {
      label: "Overview",
      kicker: "Revenue & EBITDA",
      caption: "Interactive performance view across FY’22–FY’26."
    },
    mix: {
      label: "Mix Shift",
      kicker: "XDT Growth",
      caption: "See how XDT has expanded against Fixed Bid and T&M."
    },
    wins: {
      label: "Deal Quality",
      kicker: "Closed Won",
      caption: "Compare revenue won and average deal size together."
    }
  };

  return html`
    <div className="finance-explorer">
      <div className="finance-explorer__toolbar">
        <div className="finance-explorer__copy">
          <p className="finance-explorer__eyebrow">${views[view].kicker}</p>
          <p className="finance-explorer__caption">${views[view].caption}</p>
        </div>
        <div className="finance-explorer__tabs" role="tablist" aria-label="Financial chart views">
          ${Object.entries(views).map(
            ([key, meta]) => html`
              <button
                key=${key}
                className=${`finance-explorer__tab${view === key ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected=${view === key}
                onClick=${() => setView(key)}
              >
                ${meta.label}
              </button>
            `
          )}
        </div>
      </div>

      ${view === "overview" &&
      html`<${OverviewChartView} data=${overviewData} />`}
      ${view === "mix" &&
      html`<${MixChartView} data=${mixData} />`}
      ${view === "wins" &&
      html`<${WinsChartView} data=${winData} />`}
    </div>
  `;
}

function OverviewChartView({ data }) {
  const [hiddenKeys, setHiddenKeys] = useState(new Set());

  return html`
    <${ChartContainer} config=${overviewConfig} className="finance-chart-surface">
      <div className="finance-chart-surface__frame">
        <${ResponsiveContainer} width="100%" height=${360}>
          <${ComposedChart} data=${data} margin=${{ top: 8, right: 12, bottom: 0, left: -14 }}>
            <${CartesianGrid} vertical=${false} stroke="rgba(15, 23, 36, 0.1)" strokeDasharray="3 3" />
            <${XAxis}
              dataKey="year"
              tickLine=${false}
              axisLine=${false}
              tickMargin=${12}
              tick=${{ fill: "#5f6676", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
            />
            <${YAxis}
              yAxisId="value"
              tickLine=${false}
              axisLine=${false}
              width=${86}
              tickFormatter=${(value) => currencyCompact.format(value)}
              tick=${{ fill: "#5f6676", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
            />
            <${YAxis}
              yAxisId="ebitda"
              orientation="right"
              tickLine=${false}
              axisLine=${false}
              width=${82}
              tickFormatter=${(value) => currencyCompact.format(value)}
              tick=${{ fill: "#5f6676", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
            />
            <${Tooltip}
              cursor=${{ fill: "rgba(15, 23, 36, 0.04)" }}
              content=${(props) =>
                html`<${ChartTooltipContent}
                  ...${props}
                  valueFormatter=${{
                    revenue: formatCurrency,
                    ebitda: formatCurrency
                  }}
                />`}
            />
            <${Legend}
              verticalAlign="top"
              align="right"
              content=${(props) =>
                html`<${ChartLegendContent}
                  payload=${props.payload}
                  hiddenKeys=${hiddenKeys}
                  onToggle=${(key) => setHiddenKeys((prev) => setFromToggle(prev, key))}
                  config=${overviewConfig}
                />`}
            />
            ${!hiddenKeys.has("revenue") &&
            html`<${Bar}
              yAxisId="value"
              dataKey="revenue"
              name=${overviewConfig.revenue.label}
              fill="var(--color-revenue)"
              radius=${[10, 10, 0, 0]}
              barSize=${42}
            />`}
            ${!hiddenKeys.has("ebitda") &&
            html`<${Line}
              yAxisId="ebitda"
              type="monotone"
              dataKey="ebitda"
              name=${overviewConfig.ebitda.label}
              stroke="var(--color-ebitda)"
              strokeWidth=${3}
              dot=${{ r: 4, fill: "#fffaf2", stroke: "#c28d4c", strokeWidth: 2 }}
              activeDot=${{ r: 6 }}
            />`}
          </${ComposedChart}>
        </${ResponsiveContainer}>
      </div>
    </${ChartContainer}>
  `;
}

function MixChartView({ data }) {
  const [hiddenKeys, setHiddenKeys] = useState(new Set());

  return html`
    <${ChartContainer} config=${mixConfig} className="finance-chart-surface">
      <div className="finance-chart-surface__frame">
        <${ResponsiveContainer} width="100%" height=${360}>
          <${ComposedChart} data=${data} margin=${{ top: 8, right: 18, bottom: 0, left: -14 }}>
            <${CartesianGrid} vertical=${false} stroke="rgba(15, 23, 36, 0.1)" strokeDasharray="3 3" />
            <${XAxis}
              dataKey="year"
              tickLine=${false}
              axisLine=${false}
              tickMargin=${12}
              tick=${{ fill: "#5f6676", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
            />
            <${YAxis}
              yAxisId="amount"
              tickLine=${false}
              axisLine=${false}
              width=${84}
              tickFormatter=${(value) => currencyCompact.format(value)}
              tick=${{ fill: "#5f6676", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
            />
            <${YAxis}
              yAxisId="share"
              orientation="right"
              tickLine=${false}
              axisLine=${false}
              width=${66}
              tickFormatter=${(value) => percent1.format(value)}
              domain=${[0, 0.8]}
              tick=${{ fill: "#5f6676", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
            />
            <${Tooltip}
              cursor=${{ fill: "rgba(15, 23, 36, 0.04)" }}
              content=${(props) =>
                html`<${ChartTooltipContent}
                  ...${props}
                  valueFormatter=${{
                    fixedBid: formatCurrency,
                    xdt: formatCurrency,
                    tm: formatCurrency,
                    xdtShare: percent1.format
                  }}
                />`}
            />
            <${Legend}
              verticalAlign="top"
              align="right"
              content=${(props) =>
                html`<${ChartLegendContent}
                  payload=${props.payload}
                  hiddenKeys=${hiddenKeys}
                  onToggle=${(key) => setHiddenKeys((prev) => setFromToggle(prev, key))}
                  config=${mixConfig}
                />`}
            />
            ${!hiddenKeys.has("fixedBid") &&
            html`<${Bar}
              yAxisId="amount"
              dataKey="fixedBid"
              name=${mixConfig.fixedBid.label}
              stackId="mix"
              fill="var(--color-fixedBid)"
              radius=${[0, 0, 10, 10]}
            />`}
            ${!hiddenKeys.has("xdt") &&
            html`<${Bar}
              yAxisId="amount"
              dataKey="xdt"
              name=${mixConfig.xdt.label}
              stackId="mix"
              fill="var(--color-xdt)"
            />`}
            ${!hiddenKeys.has("tm") &&
            html`<${Bar}
              yAxisId="amount"
              dataKey="tm"
              name=${mixConfig.tm.label}
              stackId="mix"
              fill="var(--color-tm)"
              radius=${[10, 10, 0, 0]}
            />`}
            ${!hiddenKeys.has("xdtShare") &&
            html`<${Line}
              yAxisId="share"
              type="monotone"
              dataKey="xdtShare"
              name=${mixConfig.xdtShare.label}
              stroke="var(--color-xdtShare)"
              strokeWidth=${3}
              dot=${{ r: 4, fill: "#fffaf2", stroke: "#c28d4c", strokeWidth: 2 }}
              activeDot=${{ r: 6 }}
            />`}
          </${ComposedChart}>
        </${ResponsiveContainer}>
      </div>
    </${ChartContainer}>
  `;
}

function WinsChartView({ data }) {
  return html`
    <div className="finance-split-charts">
      <${MiniBarChart}
        config=${{ revenueWon: winConfig.revenueWon }}
        data=${data}
        dataKey="revenueWon"
        title="Revenue Won"
        formatter=${formatCurrency}
      />
      <${MiniBarChart}
        config=${{ avgDealSize: winConfig.avgDealSize }}
        data=${data}
        dataKey="avgDealSize"
        title="Avg. Deal Size"
        formatter=${formatCurrency}
      />
    </div>
  `;
}

function MiniBarChart({ config, data, dataKey, title, formatter }) {
  const colorKey = Object.keys(config)[0];

  return html`
    <${ChartContainer} config=${config} className="finance-mini-chart">
      <div className="finance-mini-chart__header">
        <p className="finance-mini-chart__title">${title}</p>
      </div>
      <div className="finance-mini-chart__frame">
        <${ResponsiveContainer} width="100%" height=${290}>
          <${BarChart} data=${data} layout="vertical" margin=${{ top: 4, right: 16, bottom: 0, left: 22 }}>
            <${CartesianGrid} horizontal=${false} stroke="rgba(15, 23, 36, 0.08)" />
            <${XAxis}
              type="number"
              tickLine=${false}
              axisLine=${false}
              tickFormatter=${(value) => currencyCompact.format(value)}
              tick=${{ fill: "#5f6676", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
            />
            <${YAxis}
              type="category"
              dataKey="segment"
              tickLine=${false}
              axisLine=${false}
              width=${100}
              tick=${{ fill: "#1a2438", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
            />
            <${Tooltip}
              cursor=${{ fill: "rgba(15, 23, 36, 0.04)" }}
              content=${(props) =>
                html`<${ChartTooltipContent}
                  ...${props}
                  valueFormatter=${{ [dataKey]: formatter }}
                />`}
            />
            <${Bar}
              dataKey=${dataKey}
              name=${config[colorKey].label}
              fill=${`var(--color-${colorKey})`}
              radius=${[0, 10, 10, 0]}
              barSize=${28}
            />
          </${BarChart}>
        </${ResponsiveContainer}>
      </div>
    </${ChartContainer}>
  `;
}

function DetailTablesApp({ data }) {
  const [tab, setTab] = useState("yearly");

  const tableConfigs = {
    yearly: {
      label: "Yearly Financials",
      columns: [
        { key: "year", label: "Year" },
        { key: "revenue", label: "Revenue", align: "right", format: formatCurrency, sortType: "number" },
        { key: "ebitda", label: "EBITDA", align: "right", format: formatCurrency, sortType: "number" }
      ],
      rows: data.financial.panels[0].points.map((point, index) => ({
        year: point.label,
        revenue: point.value,
        ebitda: data.financial.panels[1].points[index].value
      }))
    },
    mix: {
      label: "XDT Growth",
      columns: [
        { key: "year", label: "Year" },
        { key: "fixedBid", label: "Fixed Bid", align: "right", format: formatCurrency, sortType: "number" },
        { key: "xdt", label: "XDT", align: "right", format: formatCurrency, sortType: "number" },
        { key: "tm", label: "T&M", align: "right", format: formatCurrency, sortType: "number" },
        { key: "xdtShare", label: "XDT Contribution", align: "right", format: percent1.format, sortType: "number" }
      ],
      rows: data.xdt.years.map((year, index) => ({
        year,
        fixedBid: data.xdt.absoluteSeries[0].values[index],
        xdt: data.xdt.absoluteSeries[1].values[index],
        tm: data.xdt.absoluteSeries[2].values[index],
        xdtShare: data.xdt.shareSeries[1].values[index]
      }))
    },
    newClients: {
      label: data.newClients.title,
      columns: [
        { key: "client", label: "Client" },
        { key: "amount", label: "Amount", align: "right", format: formatCurrency, sortType: "number" }
      ],
      rows: data.newClients.entries.map((entry) => ({
        client: entry.client,
        amount: entry.amount
      }))
    },
    dealQuality: {
      label: data.winMetrics.title,
      columns: [
        { key: "measure", label: "Measure" },
        { key: "segment", label: "Segment" },
        { key: "amount", label: "Amount", align: "right", format: formatCurrency, sortType: "number" }
      ],
      rows: [
        ...data.winMetrics.revenueWon.map((entry) => ({
          measure: "Revenue Won",
          segment: entry.label,
          amount: entry.amount
        })),
        ...data.winMetrics.avgDealSize.map((entry) => ({
          measure: "Avg. Deal Size",
          segment: entry.label,
          amount: entry.amount
        }))
      ]
    }
  };

  return html`
    <div className="financial-detail-explorer">
      <div className="financial-detail-explorer__tabs" role="tablist" aria-label="Detailed financial views">
        ${Object.entries(tableConfigs).map(
          ([key, config]) => html`
            <button
              key=${key}
              className=${`financial-detail-explorer__tab${tab === key ? " is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected=${tab === key}
              onClick=${() => setTab(key)}
            >
              ${config.label}
            </button>
          `
        )}
      </div>
      <${InteractiveTable} columns=${tableConfigs[tab].columns} rows=${tableConfigs[tab].rows} title=${tableConfigs[tab].label} />
    </div>
  `;
}

function InteractiveTable({ columns, rows, title }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({
    key: columns.find((column) => column.sortType === "number")?.key || columns[0].key,
    direction: "desc"
  });

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const searched = normalized
      ? rows.filter((row) =>
          columns.some((column) => String(row[column.key] ?? "").toLowerCase().includes(normalized))
        )
      : rows.slice();

    const activeColumn = columns.find((column) => column.key === sort.key) || columns[0];

    return searched.sort((a, b) => {
      const aValue = a[sort.key];
      const bValue = b[sort.key];

      if (activeColumn.sortType === "number") {
        return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return sort.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [columns, query, rows, sort]);

  const setSortFor = (key) => {
    setSort((current) =>
      current.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "desc" }
    );
  };

  return html`
    <div className="table-explorer">
      <div className="table-explorer__toolbar">
        <div>
          <p className="table-explorer__title">${title}</p>
          <p className="table-explorer__meta">${filteredRows.length} rows</p>
        </div>
        <label className="table-explorer__search">
          <span className="visually-hidden">Search rows</span>
          <input
            type="search"
            value=${query}
            onInput=${(event) => setQuery(event.target.value)}
            placeholder="Search"
          />
        </label>
      </div>
      <div className="table-explorer__surface">
        <div className="table-explorer__scroll">
          <table className="interactive-table">
            <thead>
              <tr>
                ${columns.map(
                  (column) => html`
                    <th key=${column.key} className=${column.align === "right" ? "is-right" : ""}>
                      <button type="button" onClick=${() => setSortFor(column.key)}>
                        <span>${column.label}</span>
                        <span className=${sort.key === column.key ? "is-active" : ""}>
                          ${sort.key === column.key ? (sort.direction === "asc" ? "↑" : "↓") : "↕"}
                        </span>
                      </button>
                    </th>
                  `
                )}
              </tr>
            </thead>
            <tbody>
              ${filteredRows.map(
                (row, index) => html`
                  <tr key=${`${title}-${index}`}>
                    ${columns.map((column) => {
                      const value = row[column.key];
                      return html`
                        <td key=${column.key} className=${column.align === "right" ? "is-right" : ""}>
                          ${column.format ? column.format(value) : value}
                        </td>
                      `;
                    })}
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function mountFinancialInteractives(data) {
  const chartMount = document.querySelector("[data-financial-chart-app]");
  const detailMount = document.querySelector("[data-financial-detail-app]");

  if (chartMount) {
    createRoot(chartMount).render(html`<${FinancialChartsApp} data=${data} />`);
  }

  if (detailMount) {
    createRoot(detailMount).render(html`<${DetailTablesApp} data=${data} />`);
  }
}
