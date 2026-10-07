export const business = {
  name: 'David Sneakers',
  category: 'Fashion & Retail',
  location: 'Lagos, Nigeria',
  type: 'Sole proprietor',
  operatingPeriod: '14 months',
  recordedActivity: '8 months',
  status: 'Recorded',
  averageMonthlyRevenue: 185000,
  revenueTrend: 23,
  recordedTransactions: 126,
  activeMonths: 8
};

export const monthlyRevenue = [
  { month: 'Jan', value: 145000 },
  { month: 'Feb', value: 165000 },
  { month: 'Mar', value: 175000 },
  { month: 'Apr', value: 185000 },
  { month: 'May', value: 180000 },
  { month: 'Jun', value: 200000 },
  { month: 'Jul', value: 210000 },
  { month: 'Aug', value: 220000 }
];

export const recentActivity = [
  { title: 'Payment received', type: 'income', amount: 35000, dateLabel: 'Today' },
  { title: 'Inventory purchase', type: 'expense', amount: 18500, dateLabel: 'Yesterday' },
  { title: 'Payment received', type: 'income', amount: 12000, dateLabel: 'Oct 4' },
  { title: 'Cash sales', type: 'income', amount: 42000, dateLabel: 'Oct 2' },
  { title: 'Supplier payment', type: 'expense', amount: 26000, dateLabel: 'Sep 26' }
];

export const transactions = [
  { id: 'KL-2026-00428', description: 'Payment received', category: 'Fashion Sales', type: 'Income', amount: 35000, date: '2026-10-07', source: 'Connected account', reference: 'KL-2026-00428' },
  { id: 'KL-2026-00419', description: 'Inventory purchase', category: 'Supplier', type: 'Expense', amount: 18500, date: '2026-10-06', source: 'Bank transfer', reference: 'KL-2026-00419' },
  { id: 'KL-2026-00410', description: 'Cash sales', category: 'Sales', type: 'Income', amount: 42000, date: '2026-10-04', source: 'Cash', reference: 'KL-2026-00410' },
  { id: 'KL-2026-00405', description: 'Supplier payment', category: 'Operations', type: 'Expense', amount: 26000, date: '2026-10-02', source: 'Bank transfer', reference: 'KL-2026-00405' },
  { id: 'KL-2026-00398', description: 'Customer payment', category: 'Fashion Sales', type: 'Income', amount: 24500, date: '2026-09-28', source: 'Connected account', reference: 'KL-2026-00398' },
  { id: 'KL-2026-00392', description: 'Rent', category: 'Utilities', type: 'Expense', amount: 110000, date: '2026-09-24', source: 'Bank transfer', reference: 'KL-2026-00392' },
  { id: 'KL-2026-00386', description: 'Sales deposit', category: 'Sales', type: 'Income', amount: 32000, date: '2026-09-18', source: 'Payment account', reference: 'KL-2026-00386' },
  { id: 'KL-2026-00375', description: 'Delivery cost', category: 'Logistics', type: 'Expense', amount: 9800, date: '2026-09-14', source: 'Cash', reference: 'KL-2026-00375' },
  { id: 'KL-2026-00366', description: 'Online order', category: 'Fashion Sales', type: 'Income', amount: 18300, date: '2026-09-12', source: 'Payment account', reference: 'KL-2026-00366' },
  { id: 'KL-2026-00361', description: 'Packaging materials', category: 'Inventory', type: 'Expense', amount: 7650, date: '2026-09-08', source: 'Supplier', reference: 'KL-2026-00361' },
  { id: 'KL-2026-00352', description: 'Marketplace sale', category: 'Sales', type: 'Income', amount: 28900, date: '2026-08-30', source: 'Connected account', reference: 'KL-2026-00352' },
  { id: 'KL-2026-00348', description: 'Marketing spend', category: 'Marketing', type: 'Expense', amount: 12400, date: '2026-08-27', source: 'Bank transfer', reference: 'KL-2026-00348' },
  { id: 'KL-2026-00339', description: 'Wholesale payment', category: 'Sales', type: 'Income', amount: 47000, date: '2026-08-18', source: 'Payment account', reference: 'KL-2026-00339' },
  { id: 'KL-2026-00332', description: 'Power bill', category: 'Utilities', type: 'Expense', amount: 9800, date: '2026-08-16', source: 'Bank transfer', reference: 'KL-2026-00332' },
  { id: 'KL-2026-00327', description: 'Boutique sale', category: 'Fashion Sales', type: 'Income', amount: 31000, date: '2026-08-12', source: 'Cash', reference: 'KL-2026-00327' },
  { id: 'KL-2026-00319', description: 'Customer payment', category: 'Sales', type: 'Income', amount: 19700, date: '2026-08-07', source: 'Connected account', reference: 'KL-2026-00319' },
  { id: 'KL-2026-00313', description: 'New stock purchase', category: 'Inventory', type: 'Expense', amount: 23800, date: '2026-07-30', source: 'Supplier', reference: 'KL-2026-00313' },
  { id: 'KL-2026-00308', description: 'Instagram sale', category: 'Fashion Sales', type: 'Income', amount: 15000, date: '2026-07-22', source: 'Payment account', reference: 'KL-2026-00308' },
  { id: 'KL-2026-00302', description: 'Repair cost', category: 'Operations', type: 'Expense', amount: 9600, date: '2026-07-14', source: 'Cash', reference: 'KL-2026-00302' }
];

export const insights = [
  {
    type: 'Business insight',
    title: 'Average monthly revenue increased by 23% over the last three months.',
    note: 'This reflects stronger sales, higher order values, and more consistent payments from repeat customers.'
  },
  {
    type: 'Activity insight',
    title: 'Your business recorded activity in 8 of the last 9 months.',
    note: 'The pattern shows sustained demand rather than isolated peaks, which strengthens your operational history.'
  },
  {
    type: 'Business insight',
    title: 'Revenue is strongest during the second half of the month.',
    note: 'Most sales flow in the latter part of the month, aligned with weekend demand and end-of-cycle customer purchases.'
  }
];

export const sharePermissions = {
  businessIdentity: true,
  businessActivity: true,
  revenueTrends: true,
  transactionDetails: false
};

export const settings = {
  businessVisibility: true,
  financialActivityVisibility: true,
  transactionDetailVisibility: false,
  notifications: true,
  language: 'English'
};
