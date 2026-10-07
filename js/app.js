import { business } from './data.js';
import { renderDashboard } from './dashboard.js';
import { renderTransactions } from './transactions.js';
import { renderPassport } from './passport.js';
import { renderInsights } from './insights.js';
import { renderSharePage } from './sharing.js';
import { renderSettings } from './settings.js';

const sections = {
  dashboard: document.getElementById('dashboard-section'),
  passport: document.getElementById('passport-section'),
  transactions: document.getElementById('transactions-section'),
  insights: document.getElementById('insights-section'),
  connect: document.getElementById('connect-section'),
  share: document.getElementById('share-section'),
  settings: document.getElementById('settings-section')
};

const navButtons = [...document.querySelectorAll('.nav-item')];
const landingPage = document.getElementById('landing-page');
const appShell = document.getElementById('app-shell');
const toastContainer = document.getElementById('toast-container');
const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

export function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2400);
}

function renderPage(sectionName) {
  Object.entries(sections).forEach(([key, section]) => {
    section.classList.toggle('active', key === sectionName);
  });

  navButtons.forEach((button) => {
    const isActive = button.dataset.section === sectionName;
    button.classList.toggle('active', isActive);
  });

  switch (sectionName) {
    case 'dashboard':
      renderDashboard(sections.dashboard);
      break;
    case 'passport':
      renderPassport(sections.passport);
      break;
    case 'transactions':
      renderTransactions(sections.transactions);
      break;
    case 'insights':
      renderInsights(sections.insights);
      break;
    case 'connect':
      sections.connect.innerHTML = `
        <div class="section-head">
          <h3>Connect financial activity</h3>
        </div>
        <div class="connect-card card">
          <p class="card-caption">Prototype mode</p>
          <h3>Connect a supported financial account</h3>
          <p class="subtitle">Connect a supported financial account to automatically organise your business activity.</p>
          <div class="connect-grid" style="margin-top: 20px;">
            <button class="connect-option" type="button" data-connect="bank">
              <span class="connect-label">
                <span class="connect-icon">🏦</span>
                <span><strong>Bank account</strong><br><span class="muted small">Link a primary account</span></span>
              </span>
              <span class="small muted">Connect</span>
            </button>
            <button class="connect-option" type="button" data-connect="payment">
              <span class="connect-label">
                <span class="connect-icon">💳</span>
                <span><strong>Payment account</strong><br><span class="muted small">Use a wallet or payment platform</span></span>
              </span>
              <span class="small muted">Connect</span>
            </button>
            <button class="connect-option" type="button" data-connect="upload">
              <span class="connect-label">
                <span class="connect-icon">📄</span>
                <span><strong>Upload transaction file</strong><br><span class="muted small">CSV or exported ledger</span></span>
              </span>
              <span class="small muted">Upload</span>
            </button>
          </div>
          <div class="connect-status" id="connect-status" aria-live="polite">
            <span class="status-pill">Connecting...</span>
            <strong>Account connected</strong>
            <div class="muted small" style="margin-top: 8px;">Prototype mode — no real financial account is connected.</div>
          </div>
        </div>
      `;

      const statusBox = document.getElementById('connect-status');
      sections.connect.querySelectorAll('[data-connect]').forEach((button) => {
        button.addEventListener('click', () => {
          statusBox.classList.add('visible');
          statusBox.querySelector('.status-pill').textContent = 'Connecting...';

          setTimeout(() => {
            statusBox.querySelector('.status-pill').textContent = 'Connected';
            statusBox.querySelector('strong').textContent = 'Account connected';
            showToast('Account connected');
          }, 900);
        });
      });
      break;
    case 'share':
      renderSharePage(sections.share);
      break;
    case 'settings':
      renderSettings(sections.settings);
      break;
    default:
      break;
  }
}

function bindNavigation() {
  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const sectionName = button.dataset.section;
      renderPage(sectionName);
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    });
  });

  document.getElementById('enter-app-btn').addEventListener('click', () => {
    landingPage.classList.add('hidden');
    appShell.classList.remove('hidden');
    renderPage('dashboard');
  });

  document.getElementById('scroll-how-btn').addEventListener('click', () => {
    document.getElementById('landing-page').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

function boot() {
  bindNavigation();
  renderPage('dashboard');
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('landing-page').classList.remove('hidden');
  const greeting = document.querySelector('.greeting');
  if (greeting) {
    greeting.textContent = `Good morning, ${business.name.split(' ')[0]}`;
  }
}

boot();
