import { Culture } from '../location/culture-infos';

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
