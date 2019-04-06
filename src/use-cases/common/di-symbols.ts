import { serviceSymbols } from 'src/application/services/di/symbols';
import { useCaseSymbols } from './use-case-symbols';
import { serviceSymbols as storeSymbols } from 'src/infrastructures/stores/services/symbols';

export const symbols = {
  ...serviceSymbols,
  ...storeSymbols,
  ...useCaseSymbols,
};
