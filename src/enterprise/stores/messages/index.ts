import { createReducers } from 'src/infrastructures/stores/redux-helper';
import actionCreators from './action-creators';
import functions from './functions';

export const messagesReducer = createReducers(actionCreators, functions);
