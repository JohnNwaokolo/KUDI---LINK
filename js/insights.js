import { insights, monthlyRevenue } from './data.js';

export function renderInsights(root) {
  const values = monthlyRevenue.map((item) => item.value);
  const maxValue = Math.max(...values);

  root.innerHTML = `
    <div class="section-head">
      <h3>Insights</h3>
    </div>

    <div class="insight-grid">
      ${insights.map((item) => `
        <div class="card insight-card">
          <span class="insight-tag">${item.type}</span>
          <h4>${item.title}</h4>
          <p>${item.note}</p>
        </div>
      `).join('')}
    </div>

    <div class="card insights-panel" style="margin-top: 22px;">
      <div class="card-header">
        <p class="card-caption">Revenue pattern</p>
      </div>
      <div class="bar-graph" aria-label="Revenue by month">
        ${monthlyRevenue.map((item) => `
          <div>
            <div style="height: ${Math.max((item.value / maxValue) * 100, 18)}%; background: rgba(17,17,17,0.76); border-radius: 12px 12px 0 0; min-height: 26px;" aria-label="${item.month} revenue ${item.value}"></div>
            <div style="font-size: 0.7rem; text-align: center; color: var(--muted); margin-top: 8px;">${item.month}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
