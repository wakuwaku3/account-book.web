import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('transaction')<Action>(
  'setModel',
  'setMonth',
);
export const { setModel, setMonth } = actionCreators;
export default actionCreators;
