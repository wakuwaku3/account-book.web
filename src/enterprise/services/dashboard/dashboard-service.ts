import { IDashboardService } from './interfaces/dashboard-service';
import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/di/inversify-helper';
import symbols from './interfaces/symbols';
import { IFetchService } from 'src/enterprise/infrastructures-interfaces/fetch-service';
import { IDashboardOperators } from './interfaces/dashboard-operators';
import { DashboardModel } from 'src/enterprise/models/dashboard/dashboard-model';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { infrastructuresSymbols } from 'src/enterprise/infrastructures-interfaces/symbols';

@injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @inject(infrastructuresSymbols.fetchService)
    private fetchService: IFetchService,
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
