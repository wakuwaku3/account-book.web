import {
  PlanEditModel,
  PlanCreationModel,
} from 'src/domains/models/plan/plan-model';

export interface IPlanService {
  createPlanAsync: (model: PlanCreationModel) => Promise<boolean>;
  editPlanAsync: (id: string, model: PlanEditModel) => Promise<boolean>;
  deletePlanAsync: (id: string) => Promise<void>;
}
