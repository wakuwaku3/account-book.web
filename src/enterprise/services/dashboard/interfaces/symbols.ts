import { createRegisterSymbol } from 'src/infrastructures/di/inversify-helper';
import { IDashboardService } from 'src/enterprise/services/dashboard/interfaces/dashboard-service';
import { IDashboardOperators } from './dashboard-operators';

const symbols = {
  dashboardService: createRegisterSymbol<IDashboardService>(),
  dashboardOperators: createRegisterSymbol<IDashboardOperators>(),
};
export default symbols;
