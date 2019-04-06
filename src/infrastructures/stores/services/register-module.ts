import {
  Container,
  RegisterSymbol,
} from 'src/infrastructures/di/inversify-helper';
import { serviceSymbols } from './symbols';
import { DispatchProvider } from '../../../infrastructures/stores/services/dispatch-provider';
import { IDispatchProvider } from './interfaces/dispatch-provider';
import { createAccountsOperators } from '../accounts/operators';
import { Dispatch } from 'redux';
import { createMessagesOperators } from '../messages/operators';
import { createThemeOperators } from '../theme/operators';
import { createDashboardOperators } from '../dashboard/operators';
import { createTransactionOperators } from '../transaction/operators';
import { createPlanOperators } from '../plan/operators';
const {
  dispatchProvider,
  accountsOperators,
  messagesOperators,
  themeOperators,
  dashboardOperators,
  transactionOperators,
  planOperators,
} = serviceSymbols;

const registerOperators = <TOperators>(
  container: Container,
  symbol: RegisterSymbol<TOperators>,
  factory: (dispatch: Dispatch) => TOperators,
) => {
  container.register(symbol, binder =>
    binder
      .toDynamicValue(c =>
        factory(
          c.container.get<IDispatchProvider>(dispatchProvider.symbol).dispatch,
        ),
      )
      .inSingletonScope(),
  );
};
export const registerServices = (container: Container) => {
  container.register(dispatchProvider, binder =>
    binder.to(DispatchProvider).inSingletonScope(),
  );
  registerOperators(container, accountsOperators, createAccountsOperators);
  registerOperators(container, messagesOperators, createMessagesOperators);
  registerOperators(container, themeOperators, createThemeOperators);
  registerOperators(container, dashboardOperators, createDashboardOperators);
  registerOperators(
    container,
    transactionOperators,
    createTransactionOperators,
  );
  registerOperators(container, planOperators, createPlanOperators);
};
