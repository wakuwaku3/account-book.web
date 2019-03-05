import { injectable } from 'inversify';
import { FetchRequest } from 'src/domains/models/common/fetch-request';
import { Config } from 'src/domains/models/common/config';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IAccountsOperators } from 'src/infrastructures/stores/accounts/operators-interface';

@injectable()
export class FetchService implements IFetchService {
  private token: string;
  constructor(
    @inject(symbols.config) private config: Config,
    @inject(symbols.accountsOperators)
    private accountsOperators: IAccountsOperators,
  ) {}
  public setCredential = (token: string) => (this.token = token);
  public fetchAsync = async <TResult>(
    request: FetchRequest,
    token?: string,
  ) => {
    const req = {
      ...request,
      body:
        request.body && !this.config.isMockMode
          ? JSON.stringify(request.body)
          : null,
      headers: new Headers(
        request.method !== 'GET'
          ? { Accept: 'application/json', 'Content-Type': 'application/json' }
          : {},
      ),
    } as Request;
    if (token) {
      req.headers.append('Authorization', `Bearer ${token}`);
    } else if (this.token) {
      req.headers.append('Authorization', `Bearer ${this.token}`);
    }
    const response = await fetch(request.url, req);
    const json = await response.json();
    return json as TResult;
  };
  public fetch = async <TResult>(request: FetchRequest, token?: string) => {
    const req = {
      ...request,
      body: request.body ? JSON.stringify(request.body) : null,
      headers: new Headers(
        request.method !== 'GET'
          ? { Accept: 'application/json', 'Content-Type': 'application/json' }
          : {},
      ),
    } as Request;
    if (token) {
      req.headers.append('Authorization', `Bearer ${token}`);
    } else if (this.token) {
      req.headers.append('Authorization', `Bearer ${this.token}`);
    }
    const response = await fetch(request.url, req);
    if (response.status === 204) {
      return { errors: [] };
    }
    if (response.status === 401) {
      this.accountsOperators.signIn({ result: {} });
      return { errors: [] };
    }
    if (response.status >= 400) {
      const text = await response.text();
      return { errors: [text] };
    }
    const json = await response.json();
    return json as {
      errors: string[];
      result: TResult;
    };
  };
}
