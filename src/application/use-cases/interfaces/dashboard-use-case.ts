import { DashboardShowState } from 'src/enterprise/models/dashboard/dashboard-show-state';

export interface IDashboardUseCase {
  setShowState: (showState: DashboardShowState) => void;
  getModelAsync: (selectedMonth?: Date) => Promise<void>;
  approveAsync: (id: string, selectedMonth: Date) => Promise<void>;
  cancelApproveAsync: (id: string, selectedMonth: Date) => Promise<void>;
}
