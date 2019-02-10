import { createRegisterSymbol } from 'src/infrastructures/services/inversify-helper';
import { IAccountsUseCase } from '../interfaces/accounts-use-case';
import { IMessagesUseCase } from '../interfaces/messages-use-case';
import { IHomeIndexUseCase } from '../interfaces/home-index-use-case';

export const useCaseSymbols = {
  accountsUseCase: createRegisterSymbol<IAccountsUseCase>(),
  messagesUseCase: createRegisterSymbol<IMessagesUseCase>(),
  homeIndexUseCase: createRegisterSymbol<IHomeIndexUseCase>(),
};
