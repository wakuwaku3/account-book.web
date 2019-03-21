import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { IDashboardOperators } from 'src/infrastructures/stores/dashboard/operators-interface';
import { IFetchService } from './services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { DashboardModel } from 'src/domains/models/home/dashboard-model';
import { IDashboardService } from './services/interfaces/dashboard-service';
import { IDashboardUseCase } from './interfaces/dashboard-use-case';

@injectable()
export class DashboardUseCase implements IDashboardUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.dashboardOperators)
    private dashboardOperators: IDashboardOperators,
    @inject(symbols.dashboardService)
    private dashboardService: IDashboardService,
  ) {}
  public setShowState = this.dashboardOperators.setShowState;
  public getModelAsync = async (selectedMonth?: Date) => {
    const {
      hasError,
      result,
    } = await this.fetchService.fetchWithCredentialAsync<DashboardModel>({
      url: ApiUrl.dashboardIndex(selectedMonth),
      method: 'GET',
    });
    if (!hasError && result) {
      result.selectedMonth = new Date(result.selectedMonth);
      this.dashboardOperators.setModel(result);
    }
  };
  public approveAsync = this.dashboardService.approveAsync;
  public cancelApproveAsync = this.dashboardService.cancelApproveAsync;
}
