import { StoredState } from './stored-state';
import { combineReducers, createStore } from 'redux';
import { accountsReducer } from './accounts';
import { messagesReducer } from './messages';
import { themeReducer } from './theme';
import { ReducerBuilders } from './types';
import { createMappedObject } from 'src/infrastructures/common/object-helper';
import { homeIndexReducer } from './home-index';

const builders: ReducerBuilders<StoredState> = {
  accounts: accountsReducer,
  messages: messagesReducer,
  theme: themeReducer,
  homeIndex: homeIndexReducer,
};
export const createAppStore = (initialState: StoredState) => {
  const reducers = createMappedObject(initialState, builders);
  const combinedReducers = combineReducers(reducers);
  return createStore(combinedReducers);
};
