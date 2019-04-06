import { FetchRequest } from 'src/enterprise/fetch/fetch-request';
import { SignInRequest } from 'src/enterprise/accounts/sign-in-request';
import { ResetPasswordRequest } from 'src/enterprise/accounts/reset-password-request';
import { SignUpRequest } from 'src/enterprise/accounts/sign-up-request';

export interface FetchResponse<TResult> {
  hasError: boolean;
  result?: TResult;
}
export interface IFetchService {
  fetchAsync: <TResult extends {}>(
    request: FetchRequest,
  ) => Promise<FetchResponse<TResult>>;
  fetchWithCredentialAsync: <TResult extends {}>(
    request: FetchRequest,
  ) => Promise<FetchResponse<TResult>>;
  signInAsync: (body: SignInRequest) => Promise<{ hasError: boolean }>;
  refreshAsync: (body: {
    refreshToken: string;
  }) => Promise<{ hasError: boolean }>;
  resetPasswordAsync: (
    body: ResetPasswordRequest,
  ) => Promise<{ hasError: boolean }>;
  signUpAsync: (request: SignUpRequest) => Promise<{ hasError: boolean }>;
}
