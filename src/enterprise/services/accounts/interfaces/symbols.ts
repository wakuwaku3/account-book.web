import { createRegisterSymbol } from 'src/infrastructures/di/inversify-helper';
import { IIdentityService } from './identity-service';
import { IValidateService } from './validate-service';
import { IAccountsService } from './accounts-service';
import { IAccountsOperators } from './account-operators';

const symbols = {
  identityService: createRegisterSymbol<IIdentityService>(),
  accountsService: createRegisterSymbol<IAccountsService>(),
  validateService: createRegisterSymbol<IValidateService>(),
  accountsOperators: createRegisterSymbol<IAccountsOperators>(),
};
export default symbols;
