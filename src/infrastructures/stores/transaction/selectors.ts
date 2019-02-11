import State from './state';

export class TransactionSelectors {
  constructor(private state: State) {}
  public get model() {
    return this.state.model ? this.state.model : undefined;
  }
  public get monthPicker() {
    return this.model ? this.model.monthPicker : undefined;
  }
  public get selectedMonth() {
    return this.monthPicker ? this.monthPicker.selectedMonth : undefined;
  }
}
