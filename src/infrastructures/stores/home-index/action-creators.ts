import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('home-index')<Action>(
  'setShowState',
);
export const { setShowState } = actionCreators;
export default actionCreators;
