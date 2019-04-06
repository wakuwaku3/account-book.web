import { Operators } from 'src/infrastructures/stores/types';
import Action from './action';

export interface ITransactionOperators extends Operators<Action> {}
