import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { PasswordResetRequestingRequest } from 'src/domains/models/accounts/password-reset-requesting-request';
import { ResetPasswordRequest } from 'src/domains/models/accounts/reset-password-request';

export interface IAccountsService {
  validateSignInModel: (model: SignInRequest) => boolean;
  validatePasswordResetRequestingModel: (
    model: PasswordResetRequestingRequest,
  ) => boolean;
  signInAsync: (model: SignInRequest) => Promise<{ hasError: boolean }>;
  requestPasswordResetAsync: (
    model: PasswordResetRequestingRequest,
  ) => Promise<{ hasError: boolean }>;
  resetPasswordAsync: (
    request: ResetPasswordRequest,
  ) => Promise<{ hasError: boolean }>;
}
