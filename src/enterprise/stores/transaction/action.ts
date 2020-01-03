import { TransactionModel } from 'src/enterprise/models/transaction/transaction-index-model';

export interface Action {
  setModel: TransactionModel;
  setMonth: Date | undefined;
}
export default Action;
