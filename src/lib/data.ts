
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

export type Notification = {
  id: string;
  date: string;
  title: string;
  description: string;
  read: boolean;
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

export const notifications: Notification[] = [
    {
        id: 'n1',
        date: '2025-10-17T10:00:00Z',
        title: 'Successful Deposit',
        description: 'Your salary of $4,500.00 has been successfully deposited into your Primary Checking account.',
        read: false
    },
    {
        id: 'n2',
        date: '2025-10-16T15:30:00Z',
        title: 'Security Alert: New Device Login',
        description: 'A new device (Chrome on Windows) was used to log in to your account. If this was not you, please secure your account immediately.',
        read: false
    },
    {
        id: 'n3',
        date: '2025-10-15T08:45:00Z',
        title: 'Your monthly statement is ready',
        description: 'Your statement for September 2025 is now available. You can view or download it from the "Statements" page.',
        read: true
    },
    {
        id: 'n4',
        date: '2018-01-17T17:34:00Z',
        title: 'Account Temporarily Locked',
        description: `Dear Mr. Phillips, Your account has been temporarily locked based on your recent request. To have it unlocked, your beneficiary or next of kin will need to submit the necessary documents, along with any other requirements outlined by you and your lawyer. Once everything is received and verified, your account will be promptly unlocked. Warm regards, Teresa J.N Account Manager`,
        read: true
    },
    {
      id: 'n5',
      date: '2016-03-03T11:00:00Z',
      title: 'Large Deposit Received',
      description: 'A large payment of $9,500,000.00 from "Client Payment" has been received and is now available in your account.',
      read: true
    }
];

export const user = {
    fullName: 'Antonio T. Leonardo',
    email: 'Antoniosenior1940s@gmail.com',
};
