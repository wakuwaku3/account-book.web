import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/di/inversify-helper';
import { symbols } from './di/di-symbols';
import { IPlanUseCase } from 'src/application/interfaces/usecases/plan-use-case';
import { IPlanService } from 'src/application/interfaces/services/plan-service';

@injectable()
export class PlanUseCase implements IPlanUseCase {
  constructor(
    @inject(symbols.planService)
    private planService: IPlanService,
  ) {}
  public loadAsync = this.planService.getPlansAsync;
  public getPlanAsync = this.planService.getPlanAsync;
  public createPlanAsync = this.planService.createPlanAsync;
  public editPlanAsync = this.planService.editPlanAsync;
  public deletePlanAsync = this.planService.deletePlanAsync;
}
