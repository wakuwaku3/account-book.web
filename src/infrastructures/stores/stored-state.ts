import { getDefaultAccountsState } from './accounts/state';
import { defaultMessagesState } from './messages/state';
import { defaultTheme } from './theme/state';
import { getDefaultDashboardState } from './dashboard/state';
import { getDefaultTransactionState } from './transaction/state';
import { getDefaultPlanState } from './plan/state';

const defaultState = {
  accounts: getDefaultAccountsState(),
  messages: defaultMessagesState,
  theme: defaultTheme,
  dashboard: getDefaultDashboardState(),
  transaction: getDefaultTransactionState(),
  plan: getDefaultPlanState(),
};
export type StoredState = typeof defaultState;
export const getInitialStoredState = (): StoredState => defaultState;
