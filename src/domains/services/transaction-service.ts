import { ITransactionService } from 'src/use-cases/services/interfaces/transaction-service';
import { TransactionEditModel } from '../models/transaction/transaction-model';
import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { Message } from '../models/common/message';

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
  ) {}
  public createTransactionAsync = async (model: TransactionEditModel) => {
    const { errors } = await this.fetchService.fetchAsync<{
      errors: string[];
    }>({
      url: ApiUrl.transactionCreate,
      methodName: 'POST',
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
      url: ApiUrl.transactionEditPost,
      methodName: 'POST',
      body: { ...model, id },
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
}
