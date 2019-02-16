import { createRegisterSymbol } from 'src/infrastructures/services/inversify-helper';
import { Config } from 'src/domains/models/common/config';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IGuidProvider } from 'src/infrastructures/common/services/interfaces/guid-provider';
import { IValidateService } from 'src/use-cases/services/interfaces/validate-service';
import { IAccountsService } from 'src/use-cases/services/interfaces/accounts-service';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { IDashboardService } from 'src/use-cases/services/interfaces/dashboard-service';
import { ITransactionService } from 'src/use-cases/services/interfaces/transaction-service';
import { IPlanService } from 'src/use-cases/services/interfaces/plan-service';
import { IActualService } from 'src/use-cases/services/interfaces/actual-service';

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
};
