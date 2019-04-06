import { StoredState } from './stored-state';
import { combineReducers, createStore } from 'redux';
import { accountsReducer } from './accounts';
import { messagesReducer } from './messages';
import { themeReducer } from './theme';
import { ReducerBuilders } from '../../infrastructures/stores/types';
import { createMappedObject } from 'src/enterprise/interfaces/helpers/object-helper';
import { dashboardReducer } from './dashboard';
import { transactionReducer } from './transaction';
import { planReducer } from './plan';

const builders: ReducerBuilders<StoredState> = {
  accounts: accountsReducer,
  messages: messagesReducer,
  theme: themeReducer,
  dashboard: dashboardReducer,
  transaction: transactionReducer,
  plan: planReducer,
};
export const createAppStore = (initialState: StoredState) => {
  const reducers = createMappedObject(initialState, builders);
  const combinedReducers = combineReducers(reducers);
  return createStore(combinedReducers);
};
