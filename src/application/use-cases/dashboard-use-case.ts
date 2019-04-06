import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './di/di-symbols';
import { IDashboardOperators } from 'src/infrastructures/stores/dashboard/operators-interface';
import { IDashboardService } from 'src/application/interfaces/services/dashboard-service';
import { IDashboardUseCase } from 'src/application/interfaces/usecases/dashboard-use-case';

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
