import accounts from '../../../enterprise/services/accounts/interfaces/symbols';
import actual from '../../../enterprise/services/actual/interfaces/symbols';
import dashboard from '../../../enterprise/services/dashboard/interfaces/symbols';
import plan from '../../../enterprise/services/plan/interfaces/symbols';
import transaction from '../../../enterprise/services/transaction/interfaces/symbols';
import { infrastructuresSymbols } from '../../../enterprise/infrastructures-interfaces/symbols';
import useCases from '../interfaces/symbols';

export const symbols = {
  ...accounts,
  ...actual,
  ...dashboard,
  ...plan,
  ...transaction,
  ...infrastructuresSymbols,
  ...useCases,
};
