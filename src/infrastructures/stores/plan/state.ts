import { PlanItem } from 'src/domains/models/plan/plan-item';

export interface PlanState {
  items?: PlanItem[];
}

export const getDefaultPlanState: () => PlanState = () => {
  return {};
};

export default PlanState;
