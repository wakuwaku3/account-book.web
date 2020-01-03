import { IPlanUseCase } from './interfaces/plan-use-case';
import { IPlanService } from 'src/enterprise/services/plan/interfaces/plan-service';

export class PlanUseCase implements IPlanUseCase {
  constructor(private planService: IPlanService) {}
  public loadAsync = this.planService.getPlansAsync;
  public getPlanAsync = this.planService.getPlanAsync;
  public createPlanAsync = this.planService.createPlanAsync;
  public editPlanAsync = this.planService.editPlanAsync;
  public deletePlanAsync = this.planService.deletePlanAsync;
}
