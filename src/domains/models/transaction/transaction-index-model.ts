import { TransactionItem } from 'src/domains/models/transaction/transaction-item';
export interface TransactionModel {
  selectedMonth: Date;
  transactions: TransactionItem[];
}
