import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('transaction')<Action>('setModel');
export const { setModel } = actionCreators;
export default actionCreators;
