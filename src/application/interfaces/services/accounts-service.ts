import { SignInRequest } from 'src/enterprise/accounts/sign-in-request';
import { PasswordResetRequestingRequest } from 'src/enterprise/accounts/password-reset-requesting-request';
import { SignUpRequestingRequest } from 'src/enterprise/accounts/sign-up-requesting-request';

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
