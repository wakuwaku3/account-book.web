import { ActualService } from 'src/enterprise/services/actual/actual-service';
import { AccountsService } from 'src/enterprise/services/accounts/accounts-service';
import { IdentityService } from 'src/enterprise/services/accounts/identity-service';
import { ValidateService } from 'src/enterprise/services/accounts/validate-service';
import { PlanService } from 'src/enterprise/services/plan/plan-service';
import { TransactionService } from 'src/enterprise/services/transaction/transaction-service';
import { DashboardService } from 'src/enterprise/services/dashboard/dashboard-service';
import { createAccountsOperators } from 'src/enterprise/stores/accounts/operators';
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
import { config as Config } from 'src/infrastructures/env/config';
import { ActualUseCase } from '../actual-use-case';
import { MessagesUseCase } from '../messages-use-case';
import { PlanUseCase } from '../plan-use-case';
import { AccountsUseCase } from '../accounts-use-case';
import { DashboardUseCase } from '../dashboard-use-case';
import { TransactionUseCase } from '../transaction-use-case';
import { Lazy } from 'src/infrastructures/helpers/lazy';

// infrastructures
export const config = new Lazy(() => Config);
export const dispatchProvider = new Lazy(() => new DispatchProvider());
export const guidProvider = new Lazy(() => new GuidProvider());
export const jwtService = new Lazy(() => new JWTService());
export const messagesOperators = new Lazy(() =>
  createMessagesOperators(dispatchProvider.value.dispatch),
);
export const messagesService = new Lazy(
  () => new MessagesService(messagesOperators.value, guidProvider.value),
);
export const accountsOperators = new Lazy(() =>
  createAccountsOperators(dispatchProvider.value.dispatch),
);
export const identityService = new Lazy(
  () => new IdentityService(accountsOperators.value, jwtService.value),
);
export const fetchService = new Lazy(
  () => new FetchService(messagesService.value, identityService.value),
);
export const themeOperators = new Lazy(() =>
  createThemeOperators(dispatchProvider.value.dispatch),
);

// enterprise-models
export const dashboardOperators = new Lazy(() =>
  createDashboardOperators(dispatchProvider.value.dispatch),
);
export const transactionOperators = new Lazy(() =>
  createTransactionOperators(dispatchProvider.value.dispatch),
);
export const planOperators = new Lazy(() =>
  createPlanOperators(dispatchProvider.value.dispatch),
);
export const validateService = new Lazy(() => new ValidateService());
export const accountsService = new Lazy(
  () =>
    new AccountsService(
      fetchService.value,
      messagesService.value,
      validateService.value,
    ),
);
export const actualService = new Lazy(
  () => new ActualService(fetchService.value),
);
export const dashboardService = new Lazy(
  () => new DashboardService(fetchService.value, dashboardOperators.value),
);
export const planService = new Lazy(
  () => new PlanService(fetchService.value, planOperators.value),
);
export const transactionService = new Lazy(
  () => new TransactionService(fetchService.value),
);

// use cases
export const accountsUseCase = new Lazy(
  () =>
    new AccountsUseCase(
      fetchService.value,
      validateService.value,
      accountsOperators.value,
      accountsService.value,
      messagesService.value,
    ),
);
export const actualUseCase = new Lazy(
  () => new ActualUseCase(fetchService.value, actualService.value),
);
export const dashboardUseCase = new Lazy(
  () => new DashboardUseCase(dashboardOperators.value, dashboardService.value),
);
export const messagesUseCase = new Lazy(
  () => new MessagesUseCase(messagesService.value),
);
export const planUseCase = new Lazy(() => new PlanUseCase(planService.value));
export const transactionUseCase = new Lazy(
  () =>
    new TransactionUseCase(
      fetchService.value,
      transactionOperators.value,
      transactionService.value,
    ),
);
