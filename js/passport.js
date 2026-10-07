import { business } from './data.js';

export function renderPassport(root) {
  root.innerHTML = `
    <div class="section-head">
      <div>
        <p class="card-caption">Business Passport</p>
        <h3>Digital Business Passport</h3>
      </div>
    </div>

    <div class="passport-grid">
      <div class="card passport-card">
        <div class="card-header">
          <p class="card-caption">Business Identity</p>
        </div>
        <div class="identity-list">
          <div class="identity-item">
            <strong>Business name</strong>
            <span>${business.name}</span>
          </div>
          <div class="identity-item">
            <strong>Category</strong>
            <span>${business.category}</span>
          </div>
          <div class="identity-item">
            <strong>Location</strong>
            <span>${business.location}</span>
          </div>
          <div class="identity-item">
            <strong>Business type</strong>
            <span>${business.type}</span>
          </div>
          <div class="identity-item">
            <strong>Operating period</strong>
            <span>${business.operatingPeriod}</span>
          </div>
        </div>
      </div>

      <div class="card passport-card">
        <div class="card-header">
          <p class="card-caption">Business Activity</p>
        </div>
        <div class="identity-list">
          <div class="identity-item">
            <strong>Recorded activity</strong>
            <span>${business.recordedActivity}</span>
          </div>
          <div class="identity-item">
            <strong>Average monthly revenue</strong>
            <span>₦${business.averageMonthlyRevenue.toLocaleString('en-NG')}</span>
          </div>
          <div class="identity-item">
            <strong>Revenue trend</strong>
            <span>+${business.revenueTrend}%</span>
          </div>
          <div class="identity-item">
            <strong>Transaction activity</strong>
            <span>${business.recordedTransactions} records</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card passport-card" style="margin-top: 22px;">
      <div class="card-header">
        <p class="card-caption">Business History</p>
      </div>
      <div class="timeline-list">
        <div class="timeline-item">
          <strong>Business started</strong>
          <span>Operations began in early 2025.</span>
        </div>
        <div class="timeline-item">
          <strong>First recorded activity</strong>
          <span>Initial sales records were documented in the first quarter of operation.</span>
        </div>
        <div class="timeline-item">
          <strong>Consistent activity</strong>
          <span>Ongoing pattern of payment inflow and inventory activity across multiple months.</span>
        </div>
        <div class="timeline-item">
          <strong>Recent growth</strong>
          <span>More consistent demand and stronger month-over-month revenue performance.</span>
        </div>
      </div>
    </div>

    <div class="card passport-card" style="margin-top: 22px;">
      <div class="card-header">
        <p class="card-caption">Activity Evidence</p>
      </div>
      <div class="evidence-grid">
        <div class="evidence-item">
          <strong>Business information</strong>
          <span>Provided</span>
        </div>
        <div class="evidence-item">
          <strong>Financial activity</strong>
          <span>Recorded</span>
        </div>
        <div class="evidence-item">
          <strong>Activity history</strong>
          <span>Available</span>
        </div>
        <div class="evidence-item">
          <strong>Verification</strong>
          <span>Self-reported</span>
        </div>
      </div>
    </div>
  `;
}
