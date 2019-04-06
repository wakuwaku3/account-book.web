import { createRegisterSymbol } from 'src/infrastructures/services/inversify-helper';
import { Config } from 'src/domains/models/common/config';
import { IFetchService } from 'src/application/interfaces/services/fetch-service';
import { IGuidProvider } from 'src/infrastructures/common/services/interfaces/guid-provider';
import { IValidateService } from 'src/application/interfaces/services/validate-service';
import { IAccountsService } from 'src/application/interfaces/services/accounts-service';
import { IMessagesService } from 'src/application/interfaces/services/messages-service';
import { IDashboardService } from 'src/application/interfaces/services/dashboard-service';
import { ITransactionService } from 'src/application/interfaces/services/transaction-service';
import { IPlanService } from 'src/application/interfaces/services/plan-service';
import { IActualService } from 'src/application/interfaces/services/actual-service';
import { IJWTService } from 'src/application/interfaces/services/jwt-service';
import { IIdentityService } from 'src/application/interfaces/services/identity-service';

export const serviceSymbols = {
  config: createRegisterSymbol<Config>(),
  fetchService: createRegisterSymbol<IFetchService>(),
  guidProvider: createRegisterSymbol<IGuidProvider>(),
  validateService: createRegisterSymbol<IValidateService>(),
  accountsService: createRegisterSymbol<IAccountsService>(),
  messagesService: createRegisterSymbol<IMessagesService>(),
  dashboardService: createRegisterSymbol<IDashboardService>(),
  transactionService: createRegisterSymbol<ITransactionService>(),
  planService: createRegisterSymbol<IPlanService>(),
  actualService: createRegisterSymbol<IActualService>(),
  jwtService: createRegisterSymbol<IJWTService>(),
  identityService: createRegisterSymbol<IIdentityService>(),
};
