import { createRegisterSymbol } from 'src/infrastructures/services/inversify-helper';
import { IAccountsUseCase } from '../interfaces/accounts-use-case';
import { IMessagesUseCase } from '../interfaces/messages-use-case';
import { IDashboardUseCase } from '../interfaces/dashboard-use-case';
import { ITransactionUseCase } from '../interfaces/transaction-use-case';

export const useCaseSymbols = {
  accountsUseCase: createRegisterSymbol<IAccountsUseCase>(),
  messagesUseCase: createRegisterSymbol<IMessagesUseCase>(),
  dashboardUseCase: createRegisterSymbol<IDashboardUseCase>(),
  transactionUseCase: createRegisterSymbol<ITransactionUseCase>(),
};
