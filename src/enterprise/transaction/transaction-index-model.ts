import { TransactionItem } from './transaction-item';
export interface TransactionModel {
  selectedMonth: Date | undefined;
  transactions: TransactionItem[];
}
