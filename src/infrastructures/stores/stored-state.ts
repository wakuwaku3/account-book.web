import { getDefaultAccountsState } from './accounts/state';
import { defaultMessagesState } from './messages/state';
import { defaultTheme } from './theme/state';

const defaultState = {
  accounts: getDefaultAccountsState(),
  messages: defaultMessagesState,
  theme: defaultTheme,
};
export type StoredState = typeof defaultState;
export const getInitialStoredState = (): StoredState => defaultState;
