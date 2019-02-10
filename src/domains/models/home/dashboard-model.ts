export interface DashboardMonthPicker {
  selectedMonth: string;
  selectableMonths: string[];
}
export interface DashboardSummary {
  income: number;
  expense: number;
  previousBalance?: number;
}
export interface DashboardPlan {
  id: string;
  name: string;
  planAmount: number;
  actualAmount?: number;
  isIncome: boolean;
}
export interface DashboardModel {
  monthPicker: DashboardMonthPicker;
  summary: DashboardSummary;
  plans: DashboardPlan[];
}
