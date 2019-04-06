import State from './state';
import { cultureInfos } from 'src/enterprise/location/culture-infos';
import {
  now,
  getMonthStartDay,
  addMonth,
} from 'src/infrastructures/common/date-helper';

export class AccountsSelectors {
  constructor(private state: State) {}
  public get resources() {
    const { resources } = this.cultureInfo;
    return resources;
  }
  public get messages() {
    const { messages } = this.cultureInfo;
    return messages;
  }
  public get localizer() {
    const { localizer } = this.cultureInfo;
    return localizer;
  }
  public get cultureInfo() {
    return cultureInfos[this.cultureName];
  }
  public get cultureName() {
    const { claim } = this.state;
    return claim && claim.cultureName ? claim.cultureName : 'ja';
  }
  public get useStartDate() {
    const { claim } = this.state;
    return claim && claim.useStartDate ? claim.useStartDate : now();
  }
  public get authenticated() {
    const { claim } = this.state;
    return Boolean(claim && claim.isInitialized);
  }
  public get selectableMonths(): Date[] {
    const d = now();
    const start = getMonthStartDay(this.useStartDate);
    const end = addMonth(getMonthStartDay(d), 1);
    const array = [];
    for (let day = start; day <= end; day = addMonth(day, 1)) {
      array.push(day);
    }
    return array;
  }
}
