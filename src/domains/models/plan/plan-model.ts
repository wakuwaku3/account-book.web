export interface PlanCreationModel {
  name: string;
  isIncome: boolean;
  amount: number;
  interval: number;
  applyStartDate?: string;
  applyEndDate?: string;
}
export interface PlanEditModel extends PlanCreationModel {}
