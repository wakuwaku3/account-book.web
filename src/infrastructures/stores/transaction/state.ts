import { TransactionModel } from 'src/domains/models/transaction/transaction-index-model';

export interface TransactionState {
  model?: TransactionModel;
}

export const getDefaultTransactionState: () => TransactionState = () => {
  return {};
};

export default TransactionState;
