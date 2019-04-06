import { createRegisterSymbol } from 'src/infrastructures/di/inversify-helper';
import { IAccountsOperators } from '../accounts/operators-interface';
import { IMessagesOperators } from '../messages/operators-interface';
import { IThemeOperators } from '../theme/operators-interface';
import { IDashboardOperators } from '../dashboard/operators-interface';
import { ITransactionOperators } from '../transaction/operators-interface';
import { IPlanOperators } from '../plan/operators-interface';
import { IDispatchProvider } from '../interfaces/dispatch-provider';

export const operatorsSymbols = {
  dispatchProvider: createRegisterSymbol<IDispatchProvider>(),
  accountsOperators: createRegisterSymbol<IAccountsOperators>(),
  messagesOperators: createRegisterSymbol<IMessagesOperators>(),
  themeOperators: createRegisterSymbol<IThemeOperators>(),
  dashboardOperators: createRegisterSymbol<IDashboardOperators>(),
  transactionOperators: createRegisterSymbol<ITransactionOperators>(),
  planOperators: createRegisterSymbol<IPlanOperators>(),
};
