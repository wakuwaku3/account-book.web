import * as React from 'react';
import { Provider } from 'react-redux';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { createAppStore } from 'src/enterprise/stores/reducer-factory';
import { resolve } from 'src/application/use-cases/di/container';
import { symbols } from 'src/application/use-cases/di/symbols';

export interface StoreProviderProps {
  initialState: StoredState;
}
export const StoreProvider: React.SFC<StoreProviderProps> = props => {
  const { initialState } = props;
  if (initialState.accounts.claim) {
    initialState.accounts.claim.isInitialized = false;
  }
  const store = createAppStore(initialState);
  resolve(symbols.dispatchProvider).dispatch = store.dispatch;
  return <Provider store={store}>{props.children}</Provider>;
};
