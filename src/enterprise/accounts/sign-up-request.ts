import { Culture } from '../location/culture-infos';
export interface SignUpRequest {
  signUpToken: string;
  password: string;
  userName: string;
  culture: Culture;
  agreement: boolean;
}
