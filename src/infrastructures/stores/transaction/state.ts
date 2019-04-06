import { TransactionModel } from 'src/enterprise/transaction/transaction-index-model';

export interface TransactionState {
  model?: TransactionModel;
}

export const getDefaultTransactionState: () => TransactionState = () => {
  return {};
};

export default TransactionState;
