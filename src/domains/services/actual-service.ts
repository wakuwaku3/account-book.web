import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IActualService } from 'src/use-cases/services/interfaces/actual-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { ActualEditModel, ActualKey } from '../models/actual/actual-model';

@injectable()
export class ActualService implements IActualService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
  ) {}
  public editActualAsync = async (key: ActualKey, model: ActualEditModel) => {
    const { hasError } = await this.fetchService.fetchWithCredentialAsync({
      url: ApiUrl.actualEdit,
      method: 'PUT',
      body: { ...model, ...key },
    });
    return hasError;
  };
}
