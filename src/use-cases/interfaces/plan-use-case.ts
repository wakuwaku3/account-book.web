import { PlanEditModel } from 'src/domains/models/plan/plan-model';
export interface IPlanUseCase {
  loadAsync: () => Promise<void>;
  createPlanAsync: (model: PlanEditModel) => Promise<boolean>;
  editPlanAsync: (id: string, model: PlanEditModel) => Promise<boolean>;
  getPlanAsync: (id: string) => Promise<PlanEditModel | undefined>;
  deletePlanAsync: (id: string) => Promise<void>;
}
