import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('dashboard')<Action>(
  'setShowState',
  'setModel',
  'setMonth',
);
export const { setShowState, setModel, setMonth } = actionCreators;
export default actionCreators;
