import {
  SignInRequest,
  SignUpRequestingRequest,
  PasswordResetRequestingRequest,
} from 'src/enterprise/models/accounts/account';

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
