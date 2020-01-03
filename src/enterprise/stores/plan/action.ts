import { PlanItem } from 'src/enterprise/models/plan/plan-item';

export interface Action {
  setPlans: PlanItem[];
}
export default Action;
