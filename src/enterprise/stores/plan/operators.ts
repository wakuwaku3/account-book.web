import { createOperators } from 'src/infrastructures/stores/redux-helper';
import actionCreators from './action-creators';

export const createPlanOperators = createOperators(actionCreators);
