import { PlanItem } from 'src/enterprise/models/plan/plan-item';

export interface PlanState {
  items?: PlanItem[];
}

export const getDefaultPlanState: () => PlanState = () => {
  return {};
};

export default PlanState;
