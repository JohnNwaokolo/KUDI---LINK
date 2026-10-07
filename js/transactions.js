import { transactions } from './data.js';
import { showToast } from './app.js';

function formatCurrency(value) {
  return `₦${new Intl.NumberFormat('en-NG').format(value)}`;
}

function openTransactionModal(transaction) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="transaction-modal-title">
      <div class="modal-header">
        <div>
          <p class="card-caption">Transaction detail</p>
          <h3 id="transaction-modal-title">${transaction.description}</h3>
        </div>
        <button type="button" class="ghost-btn" data-close-modal="true" aria-label="Close transaction details">Close</button>
      </div>
      <div class="modal-body">
        <div class="modal-amount ${transaction.type === 'Income' ? 'income' : 'expense'}">${transaction.type === 'Income' ? '+' : '-'}${formatCurrency(transaction.amount)}</div>
        <div class="detail-row"><span>Type</span><strong>${transaction.type}</strong></div>
        <div class="detail-row"><span>Category</span><strong>${transaction.category}</strong></div>
        <div class="detail-row"><span>Date</span><strong>${new Date(transaction.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></div>
        <div class="detail-row"><span>Source</span><strong>${transaction.source}</strong></div>
        <div class="detail-row"><span>Reference</span><strong>${transaction.reference}</strong></div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.dataset.closeModal === 'true') {
      modal.remove();
    }
  });
}

export function renderTransactions(root) {
  const state = {
    search: '',
    type: 'all',
    category: 'all'
  };

  const categories = [...new Set(transactions.map((item) => item.category))];

  root.innerHTML = `
    <div class="section-head">
      <h3>Transactions</h3>
    </div>
    <div class="card table-card">
      <div class="transactions-controls">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 4.5a6.5 6.5 0 1 1 0 13a6.5 6.5 0 0 1 0-13Zm8.5 19-4.8-4.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          <input type="search" id="transaction-search" placeholder="Search transaction" aria-label="Search transactions" />
        </div>
        <select class="filter-select" id="type-filter" aria-label="Filter transactions by type">
          <option value="all">All types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select class="filter-select" id="category-filter" aria-label="Filter transactions by category">
          <option value="all">All categories</option>
          ${categories.map((category) => `<option value="${category}">${category}</option>`).join('')}
        </select>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody id="transactions-body"></tbody>
        </table>
      </div>
    </div>
  `;

  const searchInput = document.getElementById('transaction-search');
  const typeFilter = document.getElementById('type-filter');
  const categoryFilter = document.getElementById('category-filter');
  const tbody = document.getElementById('transactions-body');

  const getFilteredTransactions = () => {
    return transactions.filter((transaction) => {
      const matchesSearch = !state.search || transaction.description.toLowerCase().includes(state.search.toLowerCase()) || transaction.reference.toLowerCase().includes(state.search.toLowerCase());
      const matchesType = state.type === 'all' || transaction.type === state.type;
      const matchesCategory = state.category === 'all' || transaction.category === state.category;
      return matchesSearch && matchesType && matchesCategory;
    });
  };

  const renderTable = () => {
    const filtered = getFilteredTransactions();

    if (!filtered.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5">
            <div class="empty-state">
              <strong>No transactions match your filters.</strong>
              <button class="secondary-btn" type="button" id="clear-filters-btn">Clear filters</button>
            </div>
          </td>
        </tr>
      `;

      const clearButton = document.getElementById('clear-filters-btn');
      clearButton.addEventListener('click', () => {
        state.search = '';
        state.type = 'all';
        state.category = 'all';
        searchInput.value = '';
        typeFilter.value = 'all';
        categoryFilter.value = 'all';
        renderTable();
      });
      return;
    }

    tbody.innerHTML = filtered.map((transaction) => `
      <tr data-transaction-id="${transaction.id}" tabindex="0" style="cursor:pointer;">
        <td>${transaction.description}</td>
        <td>${transaction.category}</td>
        <td>${new Date(transaction.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
        <td>${transaction.type === 'Income' ? '+' : '-'}${formatCurrency(transaction.amount)}</td>
        <td><span class="type-badge ${transaction.type === 'Income' ? 'income' : 'expense'}">${transaction.type}</span></td>
      </tr>
    `).join('');

    tbody.querySelectorAll('tr[data-transaction-id]').forEach((row) => {
      row.addEventListener('click', () => {
        const selected = transactions.find((item) => item.id === row.dataset.transactionId);
        if (selected) openTransactionModal(selected);
      });

      row.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          const selected = transactions.find((item) => item.id === row.dataset.transactionId);
          if (selected) openTransactionModal(selected);
        }
      });
    });
  };

  searchInput.addEventListener('input', (event) => {
    state.search = event.target.value.trim();
    renderTable();
  });

  typeFilter.addEventListener('change', (event) => {
    state.type = event.target.value;
    renderTable();
  });

  categoryFilter.addEventListener('change', (event) => {
    state.category = event.target.value;
    renderTable();
  });

  renderTable();
  showToast('Transaction data loaded');
}
