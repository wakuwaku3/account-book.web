import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { PasswordResetRequestingRequest } from 'src/domains/models/accounts/password-reset-requesting-request';

export interface IAccountsService {
  validateSignInModel: (model: SignInRequest) => boolean;
  validatePasswordResetRequestingModel: (
    model: PasswordResetRequestingRequest,
  ) => boolean;
  requestPasswordResetAsync: (
    model: PasswordResetRequestingRequest,
  ) => Promise<{ hasError: boolean }>;
}
