import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { IPlanUseCase } from './interfaces/plan-use-case';
import { IPlanService } from './services/interfaces/plan-service';

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
