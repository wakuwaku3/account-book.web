import State from './state';
import { now, getMonthStartDay } from 'src/infrastructures/helpers/date-helper';

export class TransactionSelectors {
  constructor(private state: State) {}
  public get model() {
    return this.state.model ? this.state.model : undefined;
  }
  public get selectedMonth() {
    return this.model ? this.model.selectedMonth : getMonthStartDay(now());
  }
  public get items() {
    return this.model ? this.model.transactions : [];
  }
}
