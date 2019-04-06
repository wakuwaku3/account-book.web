import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './di/di-symbols';
import { IFetchService } from 'src/application/interfaces/services/fetch-service';
import { IActualService } from 'src/application/interfaces/services/actual-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { ActualModel, ActualKey } from 'src/enterprise/actual/actual-model';
import { IActualUseCase } from 'src/application/interfaces/usecases/actual-use-case';

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
