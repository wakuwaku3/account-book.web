import { createRegisterSymbol } from 'src/infrastructures/di/inversify-helper';
import { IPlanService } from 'src/enterprise/services/plan/interfaces/plan-service';
import { IPlanOperators } from './plan-operators';

const symbols = {
  planService: createRegisterSymbol<IPlanService>(),
  planOperators: createRegisterSymbol<IPlanOperators>(),
};
export default symbols;
