import { IFetchService } from 'src/enterprise/infrastructures-interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { IActualUseCase } from './interfaces/actual-use-case';
import {
  ActualKey,
  ActualModel,
} from 'src/enterprise/models/actual/actual-model';
import { IActualService } from 'src/enterprise/services/actual/interfaces/actual-service';

export class ActualUseCase implements IActualUseCase {
  constructor(
    private fetchService: IFetchService,
    private actualService: IActualService,
  ) {}
  public getActualAsync = async (key: ActualKey) => {
    const { result } = await this.fetchService.fetchWithCredentialAsync<
      ActualModel
    >({
      url: ApiUrl.getActualUrl(key),
      method: 'GET',
    });
    return result;
  };
  public editActualAsync = this.actualService.editActualAsync;
}
