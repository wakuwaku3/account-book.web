import { ITransactionService } from 'src/use-cases/services/interfaces/transaction-service';
import {
  TransactionEditModel,
  TransactionCreationModel,
} from '../models/transaction/transaction-model';
import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { Message } from '../models/common/message';
import { TransactionModel } from '../models/transaction/transaction-index-model';
import { ITransactionOperators } from 'src/infrastructures/stores/transaction/operators-interface';

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
    @inject(symbols.transactionOperators)
    private transactionOperators: ITransactionOperators,
  ) {}
  public createTransactionAsync = async (model: TransactionCreationModel) => {
    const { errors } = await this.fetchService.fetchAsync<{
      errors: string[];
    }>({
      url: ApiUrl.transactionCreate,
      method: 'POST',
      body: model,
    });
    if (errors && errors.length > 0) {
      this.messagesService.appendMessages(
        ...errors.map(error => () =>
          ({
            level: 'error',
            text: error,
          } as Message),
        ),
      );
      return false;
    }
    return true;
  };
  public editTransactionAsync = async (
    id: string,
    model: TransactionEditModel,
  ) => {
    const { errors } = await this.fetchService.fetchAsync<{
      errors: string[];
    }>({
      url: ApiUrl.transactionEdit(id),
      method: 'PUT',
      body: { ...model },
    });
    if (errors && errors.length > 0) {
      this.messagesService.appendMessages(
        ...errors.map(error => () =>
          ({
            level: 'error',
            text: error,
          } as Message),
        ),
      );
      return false;
    }
    return true;
  };
  public deleteTransactionAsync = async (id: string) => {
    const { errors, model } = await this.fetchService.fetchAsync<{
      model: TransactionModel;
      errors: string[];
    }>({
      url: ApiUrl.transactionEdit(id),
      method: 'DELETE',
    });
    if (errors && errors.length > 0) {
      this.messagesService.appendMessages(
        ...errors.map(error => () =>
          ({
            level: 'error',
            text: error,
          } as Message),
        ),
      );
      return;
    }
    this.transactionOperators.setModel(model);
  };
}
