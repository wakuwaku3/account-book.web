import { TransactionEditModel } from 'src/domains/models/transaction/transaction-model';

export interface ITransactionService {
  createTransactionAsync: (model: TransactionEditModel) => Promise<boolean>;
  editTransactionAsync: (
    id: string,
    model: TransactionEditModel,
  ) => Promise<boolean>;
}
