import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/di/inversify-helper';
import { symbols } from './di/symbols';
import { IDashboardOperators } from 'src/enterprise/services/dashboard/interfaces/dashboard-operators';
import { IDashboardService } from 'src/enterprise/services/dashboard/interfaces/dashboard-service';
import { IDashboardUseCase } from './interfaces/dashboard-use-case';

@injectable()
export class DashboardUseCase implements IDashboardUseCase {
  constructor(
    @inject(symbols.dashboardOperators)
    private dashboardOperators: IDashboardOperators,
    @inject(symbols.dashboardService)
    private dashboardService: IDashboardService,
  ) {}
  public setShowState = this.dashboardOperators.setShowState;
  public getModelAsync = this.dashboardService.getModelAsync;
  public approveAsync = this.dashboardService.approveAsync;
  public cancelApproveAsync = this.dashboardService.cancelApproveAsync;
}
