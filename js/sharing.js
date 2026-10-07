import { sharePermissions } from './data.js';
import { showToast } from './app.js';

const defaultPermissions = { ...sharePermissions };

function makeQrSvg() {
  const size = 21;
  const sq = 10;
  const cells = [];

  const isFilled = (x, y) => {
    const finder = (fx, fy) => {
      const inFinder = x >= fx && x < fx + 7 && y >= fy && y < fy + 7;
      if (!inFinder) return false;
      const border = x === fx || y === fy || x === fx + 6 || y === fy + 6;
      return border || ((x - fx === 2 || x - fx === 3 || x - fx === 4) && (y - fy === 2 || y - fy === 3 || y - fy === 4));
    };

    if (finder(0, 0) || finder(size - 7, 0) || finder(0, size - 7)) return true;
    return ((x + y) % 3 === 0 || ((x * y) % 5 === 0 && x > 2 && y > 2)) && !(x < 7 && y < 7) && !(x > size - 8 && y < 7) && !(x < 7 && y > size - 8);
  };

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const filled = isFilled(x, y);
      if (filled) {
        cells.push(`<rect x="${x * sq}" y="${y * sq}" width="${sq}" height="${sq}" fill="#111" rx="1"/>`);
      }
    }
  }

  return `
    <svg class="qr-svg" viewBox="0 0 ${size * sq} ${size * sq}" aria-label="QR code for shared passport">
      <rect width="100%" height="100%" fill="#fff"/>
      ${cells.join('')}
    </svg>
  `;
}

function getPermissions() {
  const saved = localStorage.getItem('kudi-share-permissions');
  if (!saved) return defaultPermissions;
  try {
    return { ...defaultPermissions, ...JSON.parse(saved) };
  } catch (error) {
    return defaultPermissions;
  }
}

function persistPermissions(nextPermissions) {
  localStorage.setItem('kudi-share-permissions', JSON.stringify(nextPermissions));
}

export function renderSharePage(root) {
  const permissions = getPermissions();

  root.innerHTML = `
    <div class="section-head">
      <h3>Share your Business Passport</h3>
    </div>

    <div class="sharing-layout">
      <div class="card sharing-card">
        <p class="card-caption">Shared access</p>
        <h3>Share a secure view of your business activity with organisations you choose.</h3>

        <div class="share-link-row">
          <div class="input-wrap">
            <input class="text-input" type="text" value="kudi-link.demo/passport/david-sneakers" readonly aria-label="Share link" />
          </div>
          <button class="primary-btn" type="button" id="copy-link-btn">Copy link</button>
        </div>

        <div class="permission-list" style="margin-top: 20px;">
          <div class="permission-item">
            <div>
              <strong>Business identity</strong>
            </div>
            <button class="switch ${permissions.businessIdentity ? 'on' : ''}" type="button" data-permission="businessIdentity" aria-label="Toggle business identity visibility"></button>
          </div>
          <div class="permission-item">
            <div>
              <strong>Business activity</strong>
            </div>
            <button class="switch ${permissions.businessActivity ? 'on' : ''}" type="button" data-permission="businessActivity" aria-label="Toggle business activity visibility"></button>
          </div>
          <div class="permission-item">
            <div>
              <strong>Revenue trends</strong>
            </div>
            <button class="switch ${permissions.revenueTrends ? 'on' : ''}" type="button" data-permission="revenueTrends" aria-label="Toggle revenue trends visibility"></button>
          </div>
          <div class="permission-item">
            <div>
              <strong>Transaction details</strong>
            </div>
            <button class="switch ${permissions.transactionDetails ? 'on' : ''}" type="button" data-permission="transactionDetails" aria-label="Toggle transaction detail visibility"></button>
          </div>
        </div>
      </div>

      <div class="card sharing-card">
        <p class="card-caption">Scan</p>
        <div class="qr-box">
          ${makeQrSvg()}
        </div>
        <p style="text-align:center; margin: 18px 0 0; color: var(--muted);">Scan to view shared passport</p>
      </div>
    </div>
  `;

  const copyButton = document.getElementById('copy-link-btn');
  copyButton.addEventListener('click', async () => {
    const link = 'kudi-link.demo/passport/david-sneakers';
    try {
      await navigator.clipboard.writeText(link);
      showToast('Link copied');
    } catch (error) {
      const input = document.querySelector('.text-input');
      input.focus();
      input.select();
      document.execCommand('copy');
      showToast('Link copied');
    }
  });

  document.querySelectorAll('[data-permission]').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const key = toggle.dataset.permission;
      const nextPermissions = getPermissions();
      nextPermissions[key] = !nextPermissions[key];
      persistPermissions(nextPermissions);
      toggle.classList.toggle('on', nextPermissions[key]);
    });
  });
}
