import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { IFetchService } from './services/interfaces/fetch-service';
import { IActualUseCase } from './interfaces/actual-use-case';
import { IActualService } from './services/interfaces/actual-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { ActualModel, ActualKey } from 'src/domains/models/actual/actual-model';

@injectable()
export class ActualUseCase implements IActualUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.actualService)
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
