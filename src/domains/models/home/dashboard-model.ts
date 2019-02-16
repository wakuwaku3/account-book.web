import { MonthPickerModel } from '../common/month-picker-model';

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
  actualId: string;
}
export interface DashboardModel {
  monthPicker: MonthPickerModel;
  summary: DashboardSummary;
  plans: DashboardPlan[];
  canApprove: boolean;
  canCancelApprove: boolean;
}
