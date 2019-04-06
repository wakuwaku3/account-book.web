import { ClaimResponse, Claim } from 'src/enterprise/accounts/claim';
import { CultureInfo } from 'src/enterprise/location/culture-infos';
import { Localizer } from 'src/enterprise/location/localizer';
import { Messages } from 'src/enterprise/location/messages';
import { Resources } from 'src/enterprise/location/resources';

export interface IIdentityService {
  signOut: () => void;
  signIn: (result: ClaimResponse) => Promise<void>;
  getClaim: () => Claim | undefined;
  getCultureInfo: () => CultureInfo;
  getLocalizer: () => Localizer;
  getMessages: () => Messages;
  getResources: () => Resources;
}
