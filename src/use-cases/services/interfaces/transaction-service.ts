import {
  TransactionEditModel,
  TransactionCreationModel,
} from 'src/domains/models/transaction/transaction-model';

export interface ITransactionService {
  createTransactionAsync: (model: TransactionCreationModel) => Promise<boolean>;
  editTransactionAsync: (
    id: string,
    model: TransactionEditModel,
  ) => Promise<boolean>;
  deleteTransactionAsync: (id: string) => Promise<void>;
}
