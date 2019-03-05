import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { ITransactionOperators } from 'src/infrastructures/stores/transaction/operators-interface';
import { IFetchService } from './services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { IMessagesService } from './services/interfaces/messages-service';
import { Message } from 'src/domains/models/common/message';
import { ITransactionUseCase } from './interfaces/transaction-use-case';
import { TransactionModel } from 'src/domains/models/transaction/transaction-index-model';
import { TransactionEditModel } from 'src/domains/models/transaction/transaction-model';
import { ITransactionService } from './services/interfaces/transaction-service';

@injectable()
export class TransactionUseCase implements ITransactionUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.transactionOperators)
    private transactionOperators: ITransactionOperators,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
    @inject(symbols.transactionService)
    private transactionService: ITransactionService,
  ) {}
  public loadAsync = async (selectedMonth?: string) => {
    const { model, errors } = await this.fetchService.fetchAsync<{
      model: TransactionModel;
      errors: string[];
    }>({
      url: ApiUrl.transactionIndex(selectedMonth),
      method: 'GET',
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
  public getTransactionAsync: (
    id: string,
  ) => Promise<TransactionEditModel | undefined> = async id => {
    const { model, errors } = await this.fetchService.fetchAsync<{
      model: TransactionEditModel;
      errors: string[];
    }>({
      url: ApiUrl.transactionEdit(id),
      method: 'GET',
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
      return undefined;
    }
    return model;
  };
  public createTransactionAsync = this.transactionService
    .createTransactionAsync;
  public editTransactionAsync = this.transactionService.editTransactionAsync;
  public deleteTransactionAsync = this.transactionService
    .deleteTransactionAsync;
}
