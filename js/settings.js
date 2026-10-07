import { settings as defaultSettings } from './data.js';
import { showToast } from './app.js';

function getStoredSettings() {
  const saved = localStorage.getItem('kudi-settings');
  if (!saved) return { ...defaultSettings };
  try {
    return { ...defaultSettings, ...JSON.parse(saved) };
  } catch (error) {
    return { ...defaultSettings };
  }
}

function persistSettings(nextState) {
  localStorage.setItem('kudi-settings', JSON.stringify(nextState));
}

export function renderSettings(root) {
  const state = getStoredSettings();

  root.innerHTML = `
    <div class="section-head">
      <h3>Settings</h3>
    </div>

    <div class="settings-grid">
      <div class="settings-section">
        <h4>Business information</h4>
        <div class="toggle-row">
          <div class="toggle-label">
            <strong>Business name</strong>
            <span>David Sneakers</span>
          </div>
          <button class="switch on" type="button" data-setting="businessName" aria-label="Toggle business name visibility"></button>
        </div>
        <div class="toggle-row">
          <div class="toggle-label">
            <strong>Category</strong>
            <span>Fashion & Retail</span>
          </div>
          <button class="switch on" type="button" data-setting="category" aria-label="Toggle category visibility"></button>
        </div>
        <div class="toggle-row">
          <div class="toggle-label">
            <strong>Location</strong>
            <span>Lagos, Nigeria</span>
          </div>
          <button class="switch on" type="button" data-setting="location" aria-label="Toggle location visibility"></button>
        </div>
      </div>

      <div class="settings-section">
        <h4>Privacy</h4>
        <div class="toggle-row">
          <div class="toggle-label">
            <strong>Business visibility</strong>
            <span>Visible to connected partners</span>
          </div>
          <button class="switch ${state.businessVisibility ? 'on' : ''}" type="button" data-setting="businessVisibility" aria-label="Toggle business visibility"></button>
        </div>
        <div class="toggle-row">
          <div class="toggle-label">
            <strong>Financial activity visibility</strong>
            <span>Expose transaction summaries</span>
          </div>
          <button class="switch ${state.financialActivityVisibility ? 'on' : ''}" type="button" data-setting="financialActivityVisibility" aria-label="Toggle financial activity visibility"></button>
        </div>
        <div class="toggle-row">
          <div class="toggle-label">
            <strong>Transaction detail visibility</strong>
            <span>Limit detailed payment records</span>
          </div>
          <button class="switch ${state.transactionDetailVisibility ? 'on' : ''}" type="button" data-setting="transactionDetailVisibility" aria-label="Toggle transaction detail visibility"></button>
        </div>
      </div>

      <div class="settings-section">
        <h4>Preferences</h4>
        <div class="toggle-row">
          <div class="toggle-label">
            <strong>Notifications</strong>
            <span>Activity and status alerts</span>
          </div>
          <button class="switch ${state.notifications ? 'on' : ''}" type="button" data-setting="notifications" aria-label="Toggle notifications"></button>
        </div>
        <div class="toggle-row">
          <div class="toggle-label">
            <strong>Language</strong>
            <span>${state.language}</span>
          </div>
          <button class="switch on" type="button" data-setting="language" aria-label="Toggle language preference"></button>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('[data-setting]').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const key = toggle.dataset.setting;

      if (key === 'businessName' || key === 'category' || key === 'location' || key === 'language') {
        toggle.classList.toggle('on');
        showToast('Preferences updated');
        return;
      }

      const nextState = getStoredSettings();
      nextState[key] = !nextState[key];
      persistSettings(nextState);
      toggle.classList.toggle('on', nextState[key]);
      showToast('Preferences updated');
    });
  });
}
