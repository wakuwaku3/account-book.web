import { Culture } from '../location/culture-infos';

export interface SignUpRequestingRequest {
  email: string;
}
export interface ResetPasswordRequest {
  passwordResetToken?: string;
  password: string;
  previousPassword?: string;
}
export interface SignInRequest {
  email: string;
  password: string;
}
export interface SignUpRequest {
  signUpToken: string;
  password: string;
  userName: string;
  culture: Culture;
  agreement: boolean;
}
export interface PasswordResetRequestingRequest {
  email: string;
}
