import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('dashboard')<Action>(
  'setShowState',
  'setModel',
);
export const { setShowState, setModel } = actionCreators;
export default actionCreators;
