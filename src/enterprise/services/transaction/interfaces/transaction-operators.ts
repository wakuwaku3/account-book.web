import { TransactionModel } from 'src/enterprise/models/transaction/transaction-index-model';

export interface ITransactionOperators {
  setModel: (payload: TransactionModel) => void;
  setMonth: (payload: Date | undefined) => void;
}
