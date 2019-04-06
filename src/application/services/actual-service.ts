import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { IFetchService } from 'src/application/interfaces/services/fetch-service';
import { IActualService } from 'src/application/interfaces/services/actual-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import {
  ActualEditModel,
  ActualKey,
} from 'src/domains/models/actual/actual-model';

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
