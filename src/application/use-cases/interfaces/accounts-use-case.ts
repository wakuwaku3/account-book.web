import { Claim } from 'src/enterprise/models/accounts/claim';
import {
  SignUpRequestingRequest,
  SignInRequest,
  PasswordResetRequestingRequest,
  ResetPasswordRequest,
  SignUpRequest,
} from 'src/enterprise/models/accounts/account';

export interface IAccountsUseCase {
  signOut: () => void;
  refreshTokenAsync: (claim?: Claim) => Promise<void>;
  signInAsync: (model: SignInRequest) => Promise<{ hasError: boolean }>;
  requestPasswordResetAsync: (
    model: PasswordResetRequestingRequest,
  ) => Promise<{ hasError: boolean }>;
  requestSignUpAsync: (
    model: SignUpRequestingRequest,
  ) => Promise<{ hasError: boolean }>;
  getEmailAsync: (
    passwordResetToken: string,
  ) => Promise<{ email: string; hasError: boolean }>;
  showErrorMessage: () => void;
  validatePasswordFormat: (password: string) => boolean;
  resetPasswordAsync: (
    request: ResetPasswordRequest,
  ) => Promise<{ hasError: boolean }>;
  loadSignUpAsync: (
    signUpToken: string,
  ) => Promise<{ result?: { email: string }; hasError: boolean }>;
  signUpAsync: (request: SignUpRequest) => Promise<{ hasError: boolean }>;
}
