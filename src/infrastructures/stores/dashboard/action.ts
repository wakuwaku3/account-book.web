import { DashboardShowState } from 'src/domains/models/home/dashboard-show-state';
import { DashboardModel } from 'src/domains/models/home/dashboard-model';

export interface Action {
  setShowState: DashboardShowState;
  setModel: DashboardModel;
}
export default Action;
