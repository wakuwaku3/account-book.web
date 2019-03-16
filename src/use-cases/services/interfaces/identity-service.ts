import { ClaimResponse, Claim } from 'src/domains/models/accounts/claim';
import { CultureInfo } from 'src/domains/common/location/culture-infos';
import { Localizer } from 'src/domains/common/location/localizer';
import { Messages } from 'src/domains/common/location/messages';
import { Resources } from 'src/domains/common/location/resources';

export interface IIdentityService {
  signOut: () => void;
  signIn: (result: ClaimResponse) => Promise<void>;
  getClaim: () => Claim | undefined;
  getCultureInfo: () => CultureInfo;
  getLocalizer: () => Localizer;
  getMessages: () => Messages;
  getResources: () => Resources;
}
