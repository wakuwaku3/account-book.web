import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('accounts')<Action>(
  'init',
  'signIn',
);
export const { init, signIn } = actionCreators;
export default actionCreators;
