import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { PasswordResetRequestingRequest } from 'src/domains/models/accounts/password-reset-requesting-request';
import { SignUpRequestingRequest } from 'src/domains/models/accounts/sign-up-requesting-request';

export interface IAccountsService {
  validateSignInModel: (model: SignInRequest) => boolean;
  validatePasswordResetRequestingModel: (
    model: PasswordResetRequestingRequest,
  ) => boolean;
  requestPasswordResetAsync: (
    model: PasswordResetRequestingRequest,
  ) => Promise<{ hasError: boolean }>;
  validateSignUpRequestingModel: (model: SignUpRequestingRequest) => boolean;
  requestSignUpAsync: (
    model: SignUpRequestingRequest,
  ) => Promise<{ hasError: boolean }>;
}
