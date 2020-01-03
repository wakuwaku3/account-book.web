import { createRegisterSymbol } from 'src/infrastructures/di/inversify-helper';
import { IActualService } from './actual-service';

const symbols = {
  actualService: createRegisterSymbol<IActualService>(),
};
export default symbols;
