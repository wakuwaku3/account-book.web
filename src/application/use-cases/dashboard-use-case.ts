import { IDashboardOperators } from 'src/enterprise/services/dashboard/interfaces/dashboard-operators';
import { IDashboardService } from 'src/enterprise/services/dashboard/interfaces/dashboard-service';
import { IDashboardUseCase } from './interfaces/dashboard-use-case';

export class DashboardUseCase implements IDashboardUseCase {
  constructor(
    private dashboardOperators: IDashboardOperators,
    private dashboardService: IDashboardService,
  ) {}
  public setShowState = this.dashboardOperators.setShowState;
  public getModelAsync = this.dashboardService.getModelAsync;
  public approveAsync = this.dashboardService.approveAsync;
  public cancelApproveAsync = this.dashboardService.cancelApproveAsync;
}
