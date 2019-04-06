import { Container } from 'src/infrastructures/services/inversify-helper';
import { useCaseSymbols } from './use-case-symbols';
import { MessagesUseCase } from '../messages-use-case';
import { AccountsUseCase } from '../accounts-use-case';
import { DashboardUseCase } from '../dashboard-use-case';
import { TransactionUseCase } from '../transaction-use-case';
import { PlanUseCase } from '../plan-use-case';
import { ActualUseCase } from '../actual-use-case';

export const registerUseCases = (container: Container) => {
  container.register(useCaseSymbols.accountsUseCase, binder =>
    binder.to(AccountsUseCase).inSingletonScope(),
  );
  container.register(useCaseSymbols.messagesUseCase, binder =>
    binder.to(MessagesUseCase).inSingletonScope(),
  );
  container.register(useCaseSymbols.dashboardUseCase, binder =>
    binder.to(DashboardUseCase).inSingletonScope(),
  );
  container.register(useCaseSymbols.transactionUseCase, binder =>
    binder.to(TransactionUseCase).inSingletonScope(),
  );
  container.register(useCaseSymbols.planUseCase, binder =>
    binder.to(PlanUseCase).inSingletonScope(),
  );
  container.register(useCaseSymbols.actualUseCase, binder =>
    binder.to(ActualUseCase).inSingletonScope(),
  );
};
