import { TransactionModel } from 'src/domains/models/transaction/transaction-index-model';

export interface Action {
  setModel: TransactionModel;
}
export default Action;
