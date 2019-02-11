import { DashboardShowState } from 'src/domains/models/home/dashboard-show-state';

export interface IDashboardUseCase {
  setShowState: (showState: DashboardShowState) => void;
  getModelAsync: (selectedMonth?: string) => Promise<void>;
  approveAsync: (selectedMonth: string) => Promise<void>;
  cancelApproveAsync: (selectedMonth: string) => Promise<void>;
}
