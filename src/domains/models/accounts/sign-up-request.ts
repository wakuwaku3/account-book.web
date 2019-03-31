import { Culture } from 'src/domains/common/location/culture-infos';

export interface SignUpRequest {
  signUpToken: string;
  password: string;
  userName: string;
  culture: Culture;
  agreement: boolean;
}
