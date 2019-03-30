import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { ITransactionOperators } from 'src/infrastructures/stores/transaction/operators-interface';
import { IFetchService } from './services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { ITransactionUseCase } from './interfaces/transaction-use-case';
import { TransactionModel } from 'src/domains/models/transaction/transaction-index-model';
import { TransactionEditModel } from 'src/domains/models/transaction/transaction-model';
import { ITransactionService } from './services/interfaces/transaction-service';
import { now, getMonthStartDay } from 'src/infrastructures/common/date-helper';

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
    if (selectedMonth) {
      this.transactionOperators.setMonth(selectedMonth);
    }
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
