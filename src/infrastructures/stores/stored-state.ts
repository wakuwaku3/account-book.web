import { getDefaultAccountsState } from './accounts/state';
import { defaultMessagesState } from './messages/state';
import { defaultTheme } from './theme/state';
import { getDefaultHomeIndexState } from './home-index/state';

const defaultState = {
  accounts: getDefaultAccountsState(),
  messages: defaultMessagesState,
  theme: defaultTheme,
  homeIndex: getDefaultHomeIndexState(),
};
export type StoredState = typeof defaultState;
export const getInitialStoredState = (): StoredState => defaultState;
