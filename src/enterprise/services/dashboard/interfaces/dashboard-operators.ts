import { DashboardModel } from 'src/enterprise/models/dashboard/dashboard-model';
import { DashboardShowState } from 'src/enterprise/models/dashboard/dashboard-show-state';

export interface IDashboardOperators {
  setMonth: (payload: Date | undefined) => void;
  setModel: (payload: DashboardModel) => void;
  setShowState: (payload: DashboardShowState) => void;
}
