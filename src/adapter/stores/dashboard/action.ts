import { DashboardShowState } from 'src/enterprise/home/dashboard-show-state';
import { DashboardModel } from 'src/enterprise/home/dashboard-model';

export interface Action {
  setShowState: DashboardShowState;
  setModel: DashboardModel;
  setMonth: Date | undefined;
}
export default Action;
