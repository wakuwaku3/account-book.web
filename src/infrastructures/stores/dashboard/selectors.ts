import State from './state';
import { now, getMonthStartDay } from 'src/infrastructures/common/date-helper';

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
  public get id() {
    return this.model ? this.model.id : undefined;
  }
  public get selectedMonth() {
    return this.model ? this.model.selectedMonth : getMonthStartDay(now());
  }
  public get canApprove() {
    return this.model ? this.model.canApprove : false;
  }
  public get canCancelApprove() {
    return this.model ? this.model.canCancelApprove : false;
  }
  public get readonly() {
    return this.model ? this.model.state === 'closed' : false;
  }
}
