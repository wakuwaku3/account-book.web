import { createRegisterSymbol } from 'src/infrastructures/di/inversify-helper';
import { IMessagesUseCase } from './messages-use-case';
import { IDashboardUseCase } from './dashboard-use-case';
import { IPlanUseCase } from './plan-use-case';
import { ITransactionUseCase } from './transaction-use-case';
import { IActualUseCase } from './actual-use-case';
import { IAccountsUseCase } from './accounts-use-case';

const symbols = {
  accountsUseCase: createRegisterSymbol<IAccountsUseCase>(),
  messagesUseCase: createRegisterSymbol<IMessagesUseCase>(),
  dashboardUseCase: createRegisterSymbol<IDashboardUseCase>(),
  transactionUseCase: createRegisterSymbol<ITransactionUseCase>(),
  planUseCase: createRegisterSymbol<IPlanUseCase>(),
  actualUseCase: createRegisterSymbol<IActualUseCase>(),
};
export default symbols;
