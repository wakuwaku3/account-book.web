export interface PlanCreationModel {
  name: string;
  isIncome: boolean;
  amount: number;
  interval: number;
  start?: string;
  end?: string;
}
export interface PlanEditModel extends PlanCreationModel {}
