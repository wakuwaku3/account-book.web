export interface DashboardSummary {
  income: number;
  expense: number;
  previousBalance?: number;
}
export interface DashboardDaily {
  date: Date;
  income: number;
  expense: number;
  balance: number;
}
export interface DashboardPlan {
  id: string;
  name: string;
  planAmount: number;
  actualAmount?: number;
  isIncome: boolean;
  actualId: string;
}
export interface DashboardModel {
  id?: string;
  selectedMonth: Date;
  summary: DashboardSummary;
  daily: DashboardDaily[];
  plans: DashboardPlan[];
  canApprove: boolean;
  canCancelApprove: boolean;
  state: 'open' | 'closed';
}
