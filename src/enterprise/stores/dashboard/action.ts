import { DashboardShowState } from 'src/enterprise/models/dashboard/dashboard-show-state';
import { DashboardModel } from 'src/enterprise/models/dashboard/dashboard-model';

export interface Action {
  setShowState: DashboardShowState;
  setModel: DashboardModel;
  setMonth: Date | undefined;
}
export default Action;
