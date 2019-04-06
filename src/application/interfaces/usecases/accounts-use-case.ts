import { SignInRequest } from 'src/enterprise/accounts/sign-in-request';
import { Claim } from 'src/enterprise/accounts/claim';
import { PasswordResetRequestingRequest } from 'src/enterprise/accounts/password-reset-requesting-request';
import { ResetPasswordRequest } from 'src/enterprise/accounts/reset-password-request';
import { SignUpRequestingRequest } from 'src/enterprise/accounts/sign-up-requesting-request';
import { SignUpRequest } from 'src/enterprise/accounts/sign-up-request';

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
