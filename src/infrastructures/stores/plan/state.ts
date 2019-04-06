import { PlanItem } from 'src/enterprise/plan/plan-item';

export interface PlanState {
  items?: PlanItem[];
}

export const getDefaultPlanState: () => PlanState = () => {
  return {};
};

export default PlanState;
