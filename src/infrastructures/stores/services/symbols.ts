import { createRegisterSymbol } from 'src/infrastructures/services/inversify-helper';
import { IDispatchProvider } from 'src/infrastructures/stores/services/interfaces/dispatch-provider';
import { IAccountsOperators } from '../accounts/operators-interface';
import { IMessagesOperators } from '../messages/operators-interface';
import { IThemeOperators } from '../theme/operators-interface';
import { IDashboardOperators } from '../dashboard/operators-interface';
import { ITransactionOperators } from '../transaction/operators-interface';
import { IPlanOperators } from '../plan/operators-interface';

export const serviceSymbols = {
  dispatchProvider: createRegisterSymbol<IDispatchProvider>(),
  accountsOperators: createRegisterSymbol<IAccountsOperators>(),
  messagesOperators: createRegisterSymbol<IMessagesOperators>(),
  themeOperators: createRegisterSymbol<IThemeOperators>(),
  dashboardOperators: createRegisterSymbol<IDashboardOperators>(),
  transactionOperators: createRegisterSymbol<ITransactionOperators>(),
  planOperators: createRegisterSymbol<IPlanOperators>(),
};
