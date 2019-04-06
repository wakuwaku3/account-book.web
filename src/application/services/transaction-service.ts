import { ITransactionService } from 'src/application/interfaces/services/transaction-service';
import {
  TransactionEditModel,
  TransactionCreationModel,
} from 'src/enterprise/transaction/transaction-model';
import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { IFetchService } from 'src/application/interfaces/services/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
  ) {}
  public createTransactionAsync = async (model: TransactionCreationModel) => {
    const { hasError } = await this.fetchService.fetchWithCredentialAsync<{}>({
      url: ApiUrl.transactionsCreate,
      method: 'POST',
      body: model,
    });
    return !hasError;
  };
  public editTransactionAsync = async (
    id: string,
    model: TransactionEditModel,
  ) => {
    const { hasError } = await this.fetchService.fetchWithCredentialAsync<{}>({
      url: ApiUrl.transactionsEdit(id),
      method: 'PUT',
      body: { ...model },
    });
    return !hasError;
  };
  public deleteTransactionAsync = async (id: string) => {
    const { hasError } = await this.fetchService.fetchWithCredentialAsync<{}>({
      url: ApiUrl.transactionsEdit(id),
      method: 'DELETE',
    });
    return !hasError;
  };
}
