import { DashboardShowState } from 'src/domains/models/home/dashboard-show-state';

export interface IDashboardUseCase {
  setShowState: (showState: DashboardShowState) => void;
  getModelAsync: (selectedMonth?: Date) => Promise<void>;
  approveAsync: (selectedMonth: Date) => Promise<void>;
  cancelApproveAsync: (selectedMonth: Date) => Promise<void>;
}
