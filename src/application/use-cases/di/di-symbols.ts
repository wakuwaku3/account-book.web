import { serviceSymbols } from 'src/application/services/di/symbols';
import { useCaseSymbols } from './use-case-symbols';
import { operatorsSymbols } from 'src/adapter/stores/di/symbols';

export const symbols = {
  ...serviceSymbols,
  ...operatorsSymbols,
  ...useCaseSymbols,
};
