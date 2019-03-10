export interface IDashboardService {
  approveAsync: (selectedMonth: Date) => Promise<void>;
  cancelApproveAsync: (selectedMonth: Date) => Promise<void>;
}
