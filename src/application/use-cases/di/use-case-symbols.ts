import { createRegisterSymbol } from 'src/infrastructures/di/inversify-helper';
import { IMessagesUseCase } from 'src/application/interfaces/usecases/messages-use-case';
import { IDashboardUseCase } from 'src/application/interfaces/usecases/dashboard-use-case';
import { IPlanUseCase } from 'src/application/interfaces/usecases/plan-use-case';
import { ITransactionUseCase } from 'src/application/interfaces/usecases/transaction-use-case';
import { IActualUseCase } from 'src/application/interfaces/usecases/actual-use-case';
import { IAccountsUseCase } from 'src/application/interfaces/usecases/accounts-use-case';

export const useCaseSymbols = {
  accountsUseCase: createRegisterSymbol<IAccountsUseCase>(),
  messagesUseCase: createRegisterSymbol<IMessagesUseCase>(),
  dashboardUseCase: createRegisterSymbol<IDashboardUseCase>(),
  transactionUseCase: createRegisterSymbol<ITransactionUseCase>(),
  planUseCase: createRegisterSymbol<IPlanUseCase>(),
  actualUseCase: createRegisterSymbol<IActualUseCase>(),
};
