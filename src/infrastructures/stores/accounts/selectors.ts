import State from './state';
import { cultureInfos } from 'src/domains/common/location/culture-infos';

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
  public get authenticated() {
    const { claim } = this.state;
    return Boolean(claim && claim.isInitialized);
  }
}
