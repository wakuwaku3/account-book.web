import { IDashboardService } from 'src/application/interfaces/services/dashboard-service';
import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/di/inversify-helper';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { IFetchService } from 'src/application/interfaces/services/fetch-service';
import { IDashboardOperators } from 'src/infrastructures/stores/dashboard/operators-interface';
import { DashboardModel } from 'src/enterprise/home/dashboard-model';
import { ApiUrl } from 'src/enterprise/routing/url';

@injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.dashboardOperators)
    private dashboardOperators: IDashboardOperators,
  ) {}
  public getModelAsync = async (selectedMonth?: Date) => {
    this.dashboardOperators.setMonth(selectedMonth);
    const {
      hasError,
      result,
    } = await this.fetchService.fetchWithCredentialAsync<DashboardModel>({
      url: ApiUrl.dashboardIndex(selectedMonth),
      method: 'GET',
    });
    if (!hasError && result) {
      result.selectedMonth = result.selectedMonth
        ? new Date(result.selectedMonth)
        : undefined;
      this.dashboardOperators.setModel(result);
    }
  };

  public approveAsync = async (id: string, selectedMonth: Date) => {
    const { hasError } = await this.fetchService.fetchWithCredentialAsync({
      url: ApiUrl.dashboardApprove(id),
      method: 'POST',
      body: { month: selectedMonth },
    });
    if (!hasError) {
      await this.getModelAsync(selectedMonth);
    }
  };
  public cancelApproveAsync = async (id: string, selectedMonth: Date) => {
    const { hasError } = await this.fetchService.fetchWithCredentialAsync({
      url: ApiUrl.dashboardApprove(id),
      method: 'DELETE',
      body: { month: selectedMonth },
    });
    if (!hasError) {
      await this.getModelAsync(selectedMonth);
    }
  };
}
