
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
    { id: 't1', date: '2025-10-17', description: 'Salary Deposit', amount: 4500.00, type: 'credit', status: 'Completed' },
    { id: 't2', date: '2024-08-20', description: 'Grocery Shopping', amount: -124.50, type: 'debit', status: 'Completed' },
    { id: 't3', date: '2023-07-15', description: 'Online Transfer to John Smith', amount: -500.00, type: 'debit', status: 'Completed' },
    { id: 't4', date: '2022-06-05', description: 'ATM Withdrawal', amount: -200.00, type: 'debit', status: 'Completed' },
    { id: 't5', date: '2021-05-01', description: 'Starbucks Coffee', amount: -5.75, type: 'debit', status: 'Completed' },
    { id: 't6', date: '2020-04-22', description: 'Refund from Amazon', amount: 89.99, type: 'credit', status: 'Completed' },
    { id: 't7', date: '2019-03-01', description: 'Gas Station', amount: -45.30, type: 'debit', status: 'Completed' },
    { id: 't8', date: '2018-02-09', description: 'Dinner with friends', amount: -85.00, type: 'debit', status: 'Completed' },
    { id: 't9', date: '2016-03-03', description: 'Client Payment', amount: 9500000.00, type: 'credit', status: 'Completed' },
  ];

export const user = {
    fullName: 'Joseph Phillips',
    email: 'JosephPhillips12@mail.com',
};
