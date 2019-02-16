import { createRegisterSymbol } from 'src/infrastructures/services/inversify-helper';
import { IAccountsUseCase } from '../interfaces/accounts-use-case';
import { IMessagesUseCase } from '../interfaces/messages-use-case';
import { IDashboardUseCase } from '../interfaces/dashboard-use-case';
import { IPlanUseCase } from '../interfaces/plan-use-case';
import { ITransactionUseCase } from '../interfaces/transaction-use-case';
import { IActualUseCase } from '../interfaces/actual-use-case';

export const useCaseSymbols = {
  accountsUseCase: createRegisterSymbol<IAccountsUseCase>(),
  messagesUseCase: createRegisterSymbol<IMessagesUseCase>(),
  dashboardUseCase: createRegisterSymbol<IDashboardUseCase>(),
  transactionUseCase: createRegisterSymbol<ITransactionUseCase>(),
  planUseCase: createRegisterSymbol<IPlanUseCase>(),
  actualUseCase: createRegisterSymbol<IActualUseCase>(),
};
