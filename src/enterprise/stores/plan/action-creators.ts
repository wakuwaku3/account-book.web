import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('plan')<Action>('setPlans');
export const { setPlans } = actionCreators;
export default actionCreators;
