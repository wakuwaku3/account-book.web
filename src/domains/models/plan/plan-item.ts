export interface PlanItem {
  id: string;
  name: string;
  isIncome: boolean;
  amount: number;
  interval: number;
  start: string | null | undefined;
  end: string | null | undefined;
}
