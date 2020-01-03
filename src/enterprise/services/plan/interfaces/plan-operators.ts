import { PlanItem } from 'src/enterprise/models/plan/plan-item';
export interface IPlanOperators {
  setPlans(plans: PlanItem[]): any;
}
