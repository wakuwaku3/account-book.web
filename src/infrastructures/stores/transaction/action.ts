import { TransactionModel } from 'src/domains/models/transaction/transaction-index-model';

export interface Action {
  setModel: TransactionModel;
  setMonth: Date;
}
export default Action;
