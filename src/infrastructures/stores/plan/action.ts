import { PlanItem } from 'src/domains/models/plan/plan-item';

export interface Action {
  setPlans: PlanItem[];
}
export default Action;
