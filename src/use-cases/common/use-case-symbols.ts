import { createRegisterSymbol } from 'src/infrastructures/services/inversify-helper';
import { IAccountsUseCase } from '../interfaces/accounts-use-case';
import { IMessagesUseCase } from '../interfaces/messages-use-case';

export const useCaseSymbols = {
  accountsUseCase: createRegisterSymbol<IAccountsUseCase>(),
  messagesUseCase: createRegisterSymbol<IMessagesUseCase>(),
};
