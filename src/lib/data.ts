
export type Account = {
  id: string;
  name: string;
  type: 'Checking' | 'Savings';
  accountNumber: string;
  balance: number;
  availableBalance: number;
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  status: 'Completed' | 'Pending' | 'Failed';
};

export const accounts: Account[] = [
  {
    id: 'acc1',
    name: 'Primary Checking',
    type: 'Checking',
    accountNumber: '**** **** **** 1234',
    balance: 28864612.91,
    availableBalance: 28864612.91,
  },
  {
    id: 'acc2',
    name: 'High-Yield Savings',
    type: 'Savings',
    accountNumber: '**** **** **** 5678',
    balance: 85768092.75,
    availableBalance: 85768092.75,
  },
];

export const transactions: Transaction[] = [
  { id: 't1', date: '2024-07-26', description: 'Netflix Subscription', amount: -15.49, type: 'debit', status: 'Completed' },
  { id: 't2', date: '2024-07-25', description: 'Salary Deposit', amount: 3500.00, type: 'credit', status: 'Completed' },
  { id: 't3', date: '2024-07-25', description: 'Whole Foods Market', amount: -124.30, type: 'debit', status: 'Completed' },
  { id: 't4', date: '2024-07-24', description: 'Zelle Transfer to Jane Doe', amount: -50.00, type: 'debit', status: 'Completed' },
  { id: 't5', date: '2024-07-23', description: 'Mobile Check Deposit', amount: 300.00, type: 'credit', status: 'Pending' },
  { id: 't6', date: '2024-07-22', description: 'Starbucks', amount: -5.75, type: 'debit', status: 'Completed' },
  { id: 't7', date: '2024-07-21', description: 'ATM Withdrawal', amount: -100.00, type: 'debit', status: 'Completed' },
  { id: 't8', date: '2024-07-20', description: 'Amazon.com Purchase', amount: -89.99, type: 'debit', status: 'Completed' },
  { id: 't9', date: '2024-07-19', description: 'Refund from Target', amount: 25.00, type: 'credit', status: 'Completed' },
  { id: 't10', date: '2024-07-18', description: 'Gas Station', amount: -45.50, type: 'debit', status: 'Completed' },
];

export const user = {
    fullName: 'Joseph Phillips',
    email: 'JosephPhillips12@mail.com',
};
