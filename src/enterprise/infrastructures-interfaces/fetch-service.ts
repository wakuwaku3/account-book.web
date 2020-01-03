import {
  SignInRequest,
  ResetPasswordRequest,
  SignUpRequest,
} from '../models/accounts/account';
import { FetchResponse, FetchRequest } from '../models/accounts/fetch';

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
