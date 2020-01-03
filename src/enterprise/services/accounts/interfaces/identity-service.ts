import { ClaimResponse, Claim } from 'src/enterprise/models/accounts/claim';
import { CultureInfo } from 'src/enterprise/models/location/culture-infos';
import { Localizer } from 'src/enterprise/models/location/localizer';
import { Messages } from 'src/enterprise/models/location/messages';
import { Resources } from 'src/enterprise/models/location/resources';

export interface IIdentityService {
  signOut: () => void;
  signIn: (result: ClaimResponse) => Promise<void>;
  getClaim: () => Claim | undefined;
  getCultureInfo: () => CultureInfo;
  getLocalizer: () => Localizer;
  getMessages: () => Messages;
  getResources: () => Resources;
}
