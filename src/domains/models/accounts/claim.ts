import { Culture } from 'src/domains/common/location/culture-infos';
export interface ClaimResponse {
  token: string;
  refreshToken: string;
}
export interface Claim extends ClaimResponse {
  tokenExpired: Date;
  userId: string;
  email: string;
  userName: string;
  isInitialized: boolean;
  cultureName: Culture;
  useStartDate: Date;
}
