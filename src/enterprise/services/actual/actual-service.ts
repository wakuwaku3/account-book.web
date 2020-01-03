import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/di/inversify-helper';
import { IFetchService } from 'src/enterprise/infrastructures-interfaces/fetch-service';
import { IActualService } from './interfaces/actual-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { infrastructuresSymbols } from 'src/enterprise/infrastructures-interfaces/symbols';
import {
  ActualKey,
  ActualEditModel,
} from 'src/enterprise/models/actual/actual-model';

@injectable()
export class ActualService implements IActualService {
  constructor(
    @inject(infrastructuresSymbols.fetchService)
    private fetchService: IFetchService,
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
