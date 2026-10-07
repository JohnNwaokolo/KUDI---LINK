import { business, monthlyRevenue, recentActivity } from './data.js';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(value);
}

function renderRevenueChart() {
  const svg = document.querySelector('.revenue-chart');
  const chartWrapper = document.querySelector('.chart-wrapper');

  if (!svg || !chartWrapper) return;

  const values = monthlyRevenue.map((item) => item.value);
  const width = 640;
  const height = 240;
  const padding = { top: 16, right: 18, bottom: 32, left: 18 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = width - padding.left - padding.right;
  const maxValue = Math.max(...values) * 1.18;

  const points = values.map((value, index) => {
    const x = padding.left + (chartWidth / (values.length - 1)) * index;
    const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
    return { x, y, value, month: monthlyRevenue[index].month };
  });

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

  svg.innerHTML = `
    <defs>
      <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="rgba(17,17,17,0.18)"/>
        <stop offset="100%" stop-color="rgba(17,17,17,0.02)"/>
      </linearGradient>
    </defs>
    ${points.map((point, index) => `
      <g class="chart-bar-group" data-month="${point.month}" data-value="${point.value}" data-index="${index}" tabindex="0">
        <rect x="${point.x - 9}" y="${padding.top}" width="18" height="${height - padding.top - padding.bottom}" fill="rgba(17,17,17,0.02)" rx="9"></rect>
      </g>
    `).join('')}
    <path d="${areaPath}" fill="url(#chartFill)"></path>
    <path d="${linePath}" fill="none" stroke="rgba(17,17,17,0.88)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
    ${points.map((point) => `
      <circle cx="${point.x}" cy="${point.y}" r="4.5" fill="#fff" stroke="rgba(17,17,17,0.82)" stroke-width="2"></circle>
    `).join('')}
    ${points.map((point) => `
      <text x="${point.x}" y="${height - 10}" text-anchor="middle" fill="rgba(17,17,17,0.65)" font-size="11">${point.month}</text>
    `).join('')}
  `;

  const tooltip = document.getElementById('chart-tooltip');

  svg.querySelectorAll('.chart-bar-group').forEach((group) => {
    const show = (event) => {
      const { month, value } = group.dataset;
      tooltip.textContent = `${month} - ${formatCurrency(Number(value))}`;
      const rect = svg.getBoundingClientRect();
      const x = (Number(group.dataset.index) / (monthlyRevenue.length - 1)) * rect.width;
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${8}px`;
      tooltip.style.display = 'block';
    };

    group.addEventListener('mouseenter', show);
    group.addEventListener('focus', show);
    group.addEventListener('mouseleave', () => tooltip.style.display = 'none');
    group.addEventListener('blur', () => tooltip.style.display = 'none');
  });
}

export function renderDashboard(root) {
  const averageMonthlyRevenue = business.averageMonthlyRevenue.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  });

  root.innerHTML = `
    <div class="dashboard-hero">
      <div class="card business-card">
        <div class="card-header">
          <p class="card-caption">Business</p>
          <span class="badge">Recorded</span>
        </div>
        <h3>${business.name}</h3>
        <p class="subtitle">${business.category}</p>
        <p class="subtitle">${business.location}</p>

        <div class="business-meta">
          <div class="meta-item">
            <span>Operating for</span>
            <strong>${business.operatingPeriod}</strong>
          </div>
          <div class="meta-item">
            <span>Recorded activity</span>
            <strong>${business.recordedActivity}</strong>
          </div>
          <div class="meta-item">
            <span>Activity status</span>
            <strong>${business.status}</strong>
          </div>
          <div class="meta-item">
            <span>Business type</span>
            <strong>${business.type}</strong>
          </div>
        </div>
      </div>

      <div class="card passport-summary">
        <div class="card-header">
          <p class="card-caption">Business Passport</p>
        </div>
        <h3>${business.name}</h3>
        <p class="subtitle">${business.category}</p>
        <div class="passport-badges">
          <span class="badge">Operating for ${business.operatingPeriod}</span>
          <span class="badge">Recorded activity ${business.recordedActivity}</span>
        </div>
      </div>
    </div>

    <div class="metrics-row">
      <div class="card metric-card">
        <span class="metric-label">Average monthly revenue</span>
        <p class="metric-value">₦${averageMonthlyRevenue.split('₦')[1]}</p>
        <span class="metric-up">+23% vs last quarter</span>
      </div>
      <div class="card metric-card">
        <span class="metric-label">Revenue trend</span>
        <p class="metric-value">+23%</p>
        <span class="metric-up">This quarter</span>
      </div>
      <div class="card metric-card">
        <span class="metric-label">Recorded transactions</span>
        <p class="metric-value">126</p>
        <span class="metric-up">Across 8 months</span>
      </div>
      <div class="card metric-card">
        <span class="metric-label">Active months</span>
        <p class="metric-value">8</p>
        <span class="metric-up">Consistent activity</span>
      </div>
    </div>

    <div class="app-grid">
      <div class="left-column">
        <div class="card chart-card">
          <div class="card-header">
            <p class="card-caption">Revenue</p>
            <span class="subtitle">Last 8 months</span>
          </div>
          <div class="chart-wrapper">
            <svg class="revenue-chart" viewBox="0 0 640 240" role="img" aria-label="Monthly revenue chart"></svg>
            <div id="chart-tooltip" class="chart-tooltip" aria-live="polite"></div>
          </div>
        </div>
      </div>

      <div class="card activity-list">
        <div class="card-header">
          <p class="card-caption">Recent activity</p>
        </div>
        ${recentActivity.map((item) => `
          <div class="activity-row">
            <span class="activity-icon ${item.type === 'expense' ? 'expense' : ''}"></span>
            <div class="activity-copy">
              <strong>${item.title}</strong>
              <span>${item.dateLabel}</span>
            </div>
            <span class="amount-cell ${item.type === 'income' ? 'income' : 'expense'}">${item.type === 'income' ? '+' : '-'}₦${item.amount.toLocaleString('en-NG')}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  renderRevenueChart();
}
