import { ITransactionService } from 'src/enterprise/services/transaction/interfaces/transaction-service';
import {
  TransactionEditModel,
  TransactionCreationModel,
} from 'src/enterprise/models/transaction/transaction-model';
import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/di/inversify-helper';
import { infrastructuresSymbols } from 'src/enterprise/infrastructures-interfaces/symbols';
import { IFetchService } from 'src/enterprise/infrastructures-interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject(infrastructuresSymbols.fetchService)
    private fetchService: IFetchService,
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
