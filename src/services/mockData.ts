export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  date: string;
  status: 'success' | 'failed' | 'pending';
  recipient?: string;
  description: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 2500.00,
    date: '2024-03-15T10:30:00Z',
    status: 'success',
    description: 'Salary Credit',
  },
  {
    id: '2',
    type: 'transfer',
    amount: 120.50,
    date: '2024-03-14T15:45:00Z',
    status: 'success',
    recipient: 'John Doe',
    description: 'Dinner Split',
  },
  {
    id: '3',
    type: 'withdrawal',
    amount: 50.00,
    date: '2024-03-14T09:20:00Z',
    status: 'success',
    description: 'ATM Withdrawal',
  },
  {
    id: '4',
    type: 'transfer',
    amount: 850.00,
    date: '2024-03-13T11:10:00Z',
    status: 'pending',
    recipient: 'Rent Property Mgmt',
    description: 'Monthly Rent',
  },
  {
    id: '5',
    type: 'transfer',
    amount: 45.00,
    date: '2024-03-12T18:30:00Z',
    status: 'failed',
    recipient: 'Netflix',
    description: 'Subscription Renewal',
  },
];

export const CHART_DATA = [
  { name: 'Jan', balance: 4000 },
  { name: 'Feb', balance: 3200 },
  { name: 'Mar', balance: 5400 },
  { name: 'Apr', balance: 4800 },
  { name: 'May', balance: 6100 },
  { name: 'Jun', balance: 5900 },
];

export const USER_DATA = {
  name: 'Rohitha Kollipara',
  email: 'kollipararohitha@gmail.com',
  phone: '+1 (555) 000-0000',
  accountNumber: '8822 4411 0099',
  balance: 12450.75,
  avatar: 'https://picsum.photos/seed/user123/200/200',
};
