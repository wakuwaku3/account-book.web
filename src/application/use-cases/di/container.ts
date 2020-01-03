import {
  createContainer,
  RegisterSymbol,
} from 'src/infrastructures/di/inversify-helper';
import { symbols } from './symbols';
import { ActualService } from 'src/enterprise/services/actual/actual-service';
import { AccountsService } from 'src/enterprise/services/accounts/accounts-service';
import { IdentityService } from 'src/enterprise/services/accounts/identity-service';
import { ValidateService } from 'src/enterprise/services/accounts/validate-service';
import { PlanService } from 'src/enterprise/services/plan/plan-service';
import { TransactionService } from 'src/enterprise/services/transaction/transaction-service';
import { DashboardService } from 'src/enterprise/services/dashboard/dashboard-service';
import { createAccountsOperators } from 'src/enterprise/stores/accounts/operators';
import { Dispatch } from 'redux';
import { IDispatchProvider } from 'src/enterprise/infrastructures-interfaces/dispatch-provider';
import { createMessagesOperators } from 'src/enterprise/stores/messages/operators';
import { createThemeOperators } from 'src/enterprise/stores/theme/operators';
import { createDashboardOperators } from 'src/enterprise/stores/dashboard/operators';
import { createTransactionOperators } from 'src/enterprise/stores/transaction/operators';
import { createPlanOperators } from 'src/enterprise/stores/plan/operators';
import { FetchService } from 'src/enterprise/services/accounts/fetch-service';
import { JWTService } from 'src/infrastructures/jwt/jwt-service';
import { DispatchProvider } from 'src/infrastructures/stores/dispatch-provider';
import { GuidProvider } from 'src/infrastructures/helpers/guid-provider';
import { MessagesService } from 'src/infrastructures/messages/messages-service';
import { config } from 'src/infrastructures/env/config';
import { ActualUseCase } from '../actual-use-case';
import { MessagesUseCase } from '../messages-use-case';
import { PlanUseCase } from '../plan-use-case';
import { AccountsUseCase } from '../accounts-use-case';
import { DashboardUseCase } from '../dashboard-use-case';
import { TransactionUseCase } from '../transaction-use-case';

const container = createContainer({ autoBindInjectable: true });
const registerOperators = <TOperators>(
  symbol: RegisterSymbol<TOperators>,
  factory: (dispatch: Dispatch) => TOperators,
) => {
  container.register(symbol, binder =>
    binder
      .toDynamicValue(c =>
        factory(
          c.container.get<IDispatchProvider>(symbols.dispatchProvider.symbol)
            .dispatch,
        ),
      )
      .inSingletonScope(),
  );
};

// enterprise-models
container.register(symbols.accountsService, binder =>
  binder.to(AccountsService).inSingletonScope(),
);
container.register(symbols.identityService, binder =>
  binder.to(IdentityService).inSingletonScope(),
);
container.register(symbols.validateService, binder =>
  binder.to(ValidateService).inSingletonScope(),
);
container.register(symbols.actualService, binder =>
  binder.to(ActualService).inSingletonScope(),
);
container.register(symbols.dashboardService, binder =>
  binder.to(DashboardService).inSingletonScope(),
);
container.register(symbols.planService, binder =>
  binder.to(PlanService).inSingletonScope(),
);
container.register(symbols.transactionService, binder =>
  binder.to(TransactionService).inSingletonScope(),
);
registerOperators(symbols.accountsOperators, createAccountsOperators);
registerOperators(symbols.dashboardOperators, createDashboardOperators);
registerOperators(symbols.transactionOperators, createTransactionOperators);
registerOperators(symbols.planOperators, createPlanOperators);

// infrastructures
container.register(symbols.config, binder => binder.toConstantValue(config));
container.register(symbols.dispatchProvider, binder =>
  binder.to(DispatchProvider).inSingletonScope(),
);
container.register(symbols.guidProvider, binder =>
  binder.to(GuidProvider).inSingletonScope(),
);
container.register(symbols.jwtService, binder =>
  binder.to(JWTService).inSingletonScope(),
);
container.register(symbols.messagesService, binder =>
  binder.to(MessagesService).inSingletonScope(),
);
container.register(symbols.fetchService, binder =>
  binder.to(FetchService).inSingletonScope(),
);
registerOperators(symbols.messagesOperators, createMessagesOperators);
registerOperators(symbols.themeOperators, createThemeOperators);

// use cases
container.register(symbols.accountsUseCase, binder =>
  binder.to(AccountsUseCase).inSingletonScope(),
);
container.register(symbols.actualUseCase, binder =>
  binder.to(ActualUseCase).inSingletonScope(),
);
container.register(symbols.dashboardUseCase, binder =>
  binder.to(DashboardUseCase).inSingletonScope(),
);
container.register(symbols.messagesUseCase, binder =>
  binder.to(MessagesUseCase).inSingletonScope(),
);
container.register(symbols.planUseCase, binder =>
  binder.to(PlanUseCase).inSingletonScope(),
);
container.register(symbols.transactionUseCase, binder =>
  binder.to(TransactionUseCase).inSingletonScope(),
);

const { resolveService } = container;
export const resolve = resolveService;
