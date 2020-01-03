import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/di/inversify-helper';
import { symbols } from './di/symbols';
import { IFetchService } from 'src/enterprise/infrastructures-interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { TransactionModel } from 'src/enterprise/models/transaction/transaction-index-model';
import { TransactionEditModel } from 'src/enterprise/models/transaction/transaction-model';
import { ITransactionUseCase } from './interfaces/transaction-use-case';
import { ITransactionOperators } from 'src/enterprise/services/transaction/interfaces/transaction-operators';
import { ITransactionService } from 'src/enterprise/services/transaction/interfaces/transaction-service';
import { getMonthStartDay, now } from 'src/infrastructures/helpers/date-helper';

@injectable()
export class TransactionUseCase implements ITransactionUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.transactionOperators)
    private transactionOperators: ITransactionOperators,
    @inject(symbols.transactionService)
    private transactionService: ITransactionService,
  ) {}
  public loadAsync = async (selectedMonth?: Date) => {
    this.transactionOperators.setMonth(selectedMonth);
    const { result } = await this.fetchService.fetchWithCredentialAsync<
      TransactionModel
    >({
      url: ApiUrl.transactionsIndex(selectedMonth),
      method: 'GET',
    });
    if (result) {
      result.selectedMonth = selectedMonth
        ? selectedMonth
        : getMonthStartDay(now());
      this.transactionOperators.setModel(result);
    }
  };
  public getTransactionAsync: (
    id: string,
  ) => Promise<TransactionEditModel | undefined> = async id => {
    const { result } = await this.fetchService.fetchWithCredentialAsync<
      TransactionEditModel
    >({
      url: ApiUrl.transactionsEdit(id),
      method: 'GET',
    });
    return result;
  };
  public createTransactionAsync = this.transactionService
    .createTransactionAsync;
  public editTransactionAsync = this.transactionService.editTransactionAsync;
  public deleteTransactionAsync = async (id: string) => {
    const res = await this.transactionService.deleteTransactionAsync(id);
    if (res) {
      await this.loadAsync();
    }
  };
}
