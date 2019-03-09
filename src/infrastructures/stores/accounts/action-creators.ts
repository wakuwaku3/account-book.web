import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('accounts')<Action>(
  'signIn',
  'signOut',
);
export const { signIn, signOut } = actionCreators;
export default actionCreators;
