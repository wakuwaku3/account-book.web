import { FetchRequest } from 'src/domains/models/common/fetch-request';

export interface Response<T> {
  errors: string[];
  result: T;
}
export interface IFetchService {
  setCredential: (token: string) => void;
  fetchAsync: <TResult extends {}>(
    request: FetchRequest,
    token?: string,
  ) => Promise<TResult>;
  fetch: <TResult extends {}>(
    request: FetchRequest,
    token?: string,
  ) => Promise<{
    errors: string[];
    result?: TResult;
  }>;
}
