export interface IDashboardService {
  getModelAsync: (selectedMonth?: Date) => Promise<void>;
  approveAsync: (id: string, selectedMonth: Date) => Promise<void>;
  cancelApproveAsync: (id: string, selectedMonth: Date) => Promise<void>;
}
