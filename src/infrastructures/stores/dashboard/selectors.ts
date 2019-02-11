import State from './state';

export class DashboardSelectors {
  constructor(private state: State) {}
  public get showState() {
    return this.state.showState;
  }
  public get model() {
    return this.state.model;
  }
  public get summary() {
    return this.model ? this.model.summary : undefined;
  }
  public get plans() {
    return this.model ? this.model.plans : [];
  }
  public get monthPicker() {
    return this.model ? this.model.monthPicker : undefined;
  }
  public get selectedMonth() {
    return this.monthPicker ? this.monthPicker.selectedMonth : undefined;
  }
  public get canApprove() {
    return this.model ? this.model.canApprove : false;
  }
  public get canCancelApprove() {
    return this.model ? this.model.canCancelApprove : false;
  }
}
