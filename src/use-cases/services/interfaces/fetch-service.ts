import { FetchRequest } from 'src/domains/models/common/fetch-request';
import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { ResetPasswordRequest } from 'src/domains/models/accounts/reset-password-request';

export interface FetchResponse<TResult> {
  hasError: boolean;
  result?: TResult;
}
export interface IFetchService {
  fetchAsync: <TResult extends {}>(
    request: FetchRequest,
    token?: string,
  ) => Promise<TResult>;
  fetch: <TResult extends {}>(
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
}
