import { createReducers } from '../redux-helper';
import actionCreators from './action-creators';
import functions from './functions';

export const transactionReducer = createReducers(actionCreators, functions);
