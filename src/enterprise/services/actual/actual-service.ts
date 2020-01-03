import { IFetchService } from 'src/enterprise/infrastructures-interfaces/fetch-service';
import { IActualService } from './interfaces/actual-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import {
  ActualKey,
  ActualEditModel,
} from 'src/enterprise/models/actual/actual-model';

export class ActualService implements IActualService {
  constructor(private fetchService: IFetchService) {}
  public editActualAsync = async (key: ActualKey, model: ActualEditModel) => {
    const { hasError } = await this.fetchService.fetchWithCredentialAsync({
      url: ApiUrl.actualEdit,
      method: 'PUT',
      body: { ...model, ...key },
    });
    return hasError;
  };
}
