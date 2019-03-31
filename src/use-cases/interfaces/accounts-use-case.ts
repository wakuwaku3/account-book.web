import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { Claim } from 'src/domains/models/accounts/claim';
import { PasswordResetRequestingRequest } from 'src/domains/models/accounts/password-reset-requesting-request';
import { ResetPasswordRequest } from 'src/domains/models/accounts/reset-password-request';
import { SignUpRequestingRequest } from 'src/domains/models/accounts/sign-up-requesting-request';

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
  showResetPasswordErrorMessage: () => void;
  validatePasswordFormat: (password: string) => boolean;
  resetPasswordAsync: (
    request: ResetPasswordRequest,
  ) => Promise<{ hasError: boolean }>;
}
