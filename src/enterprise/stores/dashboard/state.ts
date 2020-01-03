import { DashboardShowState } from 'src/enterprise/models/dashboard/dashboard-show-state';
import { DashboardModel } from 'src/enterprise/models/dashboard/dashboard-model';

export interface DashboardState {
  showState: DashboardShowState;
  model?: DashboardModel;
}

export const getDefaultDashboardState: () => DashboardState = () => {
  const byLocalStorage = (() => {
    if (localStorage) {
      const value = localStorage.getItem('dashboard-show-state');
      if (value) {
        const showState = JSON.parse(value) as DashboardShowState;
        if (showState) {
          return { showState };
        }
      }
    }
    return { showState: {} };
  })();
  return { ...byLocalStorage };
};

export default DashboardState;
