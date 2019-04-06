import actionCreators from './action-creators';
import functions from './functions';
import { createReducers } from 'src/infrastructures/stores/redux-helper';

export const accountsReducer = createReducers(actionCreators, functions);
