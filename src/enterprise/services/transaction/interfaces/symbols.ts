import { createRegisterSymbol } from 'src/infrastructures/di/inversify-helper';
import { ITransactionService } from './transaction-service';
import { ITransactionOperators } from './transaction-operators';

const symbols = {
  transactionService: createRegisterSymbol<ITransactionService>(),
  transactionOperators: createRegisterSymbol<ITransactionOperators>(),
};
export default symbols;
