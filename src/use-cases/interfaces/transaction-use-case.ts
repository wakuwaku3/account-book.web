import { TransactionEditModel } from 'src/domains/models/transaction/transaction-model';

export interface ITransactionUseCase {
  loadAsync: (selectedMonth?: string) => Promise<void>;
  createTransactionAsync: (model: TransactionEditModel) => Promise<boolean>;
  editTransactionAsync: (
    id: string,
    model: TransactionEditModel,
  ) => Promise<boolean>;
  getTransactionAsync: (
    id: string,
  ) => Promise<TransactionEditModel | undefined>;
  deleteTransactionAsync: (id: string) => Promise<void>;
}
