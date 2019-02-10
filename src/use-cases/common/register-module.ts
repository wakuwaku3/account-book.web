import { Container } from 'src/infrastructures/services/inversify-helper';
import { useCaseSymbols } from './use-case-symbols';
import { MessagesUseCase } from '../messages-use-case';
import { AccountsUseCase } from '../accounts-use-case';
import { HomeIndexUseCase } from '../home-index-use-case';

export const registerUseCases = (container: Container) => {
  container.register(useCaseSymbols.accountsUseCase, binder =>
    binder.to(AccountsUseCase).inSingletonScope(),
  );
  container.register(useCaseSymbols.messagesUseCase, binder =>
    binder.to(MessagesUseCase).inSingletonScope(),
  );
  container.register(useCaseSymbols.homeIndexUseCase, binder =>
    binder.to(HomeIndexUseCase).inSingletonScope(),
  );
};
