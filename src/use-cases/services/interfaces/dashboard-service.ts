export interface IDashboardService {
  approveAsync: (selectedMonth: string) => Promise<void>;
  cancelApproveAsync: (selectedMonth: string) => Promise<void>;
}
