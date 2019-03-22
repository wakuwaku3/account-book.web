import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { IDashboardOperators } from 'src/infrastructures/stores/dashboard/operators-interface';
import { IDashboardService } from './services/interfaces/dashboard-service';
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
