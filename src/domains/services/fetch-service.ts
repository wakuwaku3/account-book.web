import { injectable } from 'inversify';
import { FetchRequest } from 'src/domains/models/common/fetch-request';
import { Config } from 'src/domains/models/common/config';
import { inject } from 'src/infrastructures/services/inversify-helper';
import {
  IFetchService,
  FetchResponse,
} from 'src/use-cases/services/interfaces/fetch-service';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { Message } from '../models/common/message';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { SignInRequest } from '../models/accounts/sign-in-request';
import { ResetPasswordRequest } from '../models/accounts/reset-password-request';
import { ClaimResponse } from '../models/accounts/claim';
import { now } from 'src/infrastructures/common/date-helper';
import { IIdentityService } from 'src/use-cases/services/interfaces/identity-service';

@injectable()
export class FetchService implements IFetchService {
  private get claim() {
    return this.identityService.getClaim();
  }
  constructor(
    @inject(symbols.config) private config: Config,
    @inject(symbols.messagesService) private messagesService: IMessagesService,
    @inject(symbols.identityService) private identityService: IIdentityService,
  ) {}
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
    } else if (this.claim && this.claim.token) {
      req.headers.append('Authorization', `Bearer ${this.claim.token}`);
    }
    const response = await fetch(request.url, req);
    const json = await response.json();
    return json as TResult;
  };

  public fetch = async <TResult>(
    request: FetchRequest,
  ): Promise<FetchResponse<TResult>> => {
    const req = {
      ...request,
      body: request.body ? JSON.stringify(request.body) : null,
      headers: new Headers(
        request.method !== 'GET'
          ? { Accept: 'application/json', 'Content-Type': 'application/json' }
          : {},
      ),
    } as Request;
    const response = await fetch(request.url, req);
    if (response.status >= 500) {
      return this.writeErrors(
        'サーバー側でエラーが発生しました。サポートにお問い合わせください。',
      );
    }
    if (response.status >= 400) {
      const { errors, message } = (await response.json()) as {
        errors: string[];
        message: string;
      };
      if (errors && errors.length > 0) {
        return this.writeErrors(...this.mapErrorMessageByCode(...errors));
      }
      if (message) {
        return this.writeErrors(message);
      }
      const text = await response.text();
      return this.writeErrors(text);
    }
    if (response.status === 204) {
      return { hasError: false };
    }
    const { result } = (await response.json()) as { result: TResult };
    return {
      hasError: false,
      result,
    };
  };

  private mapErrorMessageByCode = (...codes: string[]) => {
    const {
      serverMessages,
      noHandleServerError,
    } = this.identityService.getMessages();
    return codes.map(code => {
      const message = serverMessages[code];
      if (message) {
        return message;
      }
      return noHandleServerError(code);
    });
  };

  public fetchWithCredentialAsync = async <TResult>(
    request: FetchRequest,
  ): Promise<FetchResponse<TResult>> =>
    await this.fetchWithCredentialInnerAsync<TResult>(request, false);

  private fetchWithCredentialInnerAsync = async <TResult>(
    request: FetchRequest,
    refreshed: boolean,
  ): Promise<FetchResponse<TResult>> => {
    if (!this.claim) {
      console.error('fetchWithCredentialAsync required credential.');
      return { hasError: true };
    }
    if (this.claim.tokenExpired <= now()) {
      if (refreshed) {
        return { hasError: true };
      }
      // token期限切れの場合再認証
      const { hasError } = await this.refreshAsync({
        refreshToken: this.claim.refreshToken,
      });
      if (hasError) {
        return { hasError };
      }
      // 成功したらリトライ
      return await this.fetchWithCredentialInnerAsync<TResult>(request, true);
    }
    const req = {
      ...request,
      body: request.body ? JSON.stringify(request.body) : null,
      headers: new Headers(
        request.method !== 'GET'
          ? { Accept: 'application/json', 'Content-Type': 'application/json' }
          : {},
      ),
    } as Request;
    req.headers.append('Authorization', `Bearer ${this.claim.token}`);
    const response = await fetch(request.url, req);
    if (response.status >= 500) {
      return this.writeErrors(
        'サーバー側でエラーが発生しました。サポートにお問い合わせください。',
      );
    }
    if (response.status >= 400) {
      if (response.status === 401) {
        if (!refreshed) {
          // refresh する
          const { hasError } = await this.refreshAsync({
            refreshToken: this.claim.refreshToken,
          });
          if (hasError) {
            return { hasError };
          }
          // 成功したらリトライ
          return await this.fetchWithCredentialInnerAsync<TResult>(
            request,
            true,
          );
        }
        // 認証エラー
        this.identityService.signOut();
        return { hasError: true };
      }
      const { errors, message } = (await response.json()) as {
        errors: string[];
        message: string;
      };
      if (errors && errors.length > 0) {
        return this.writeErrors(...this.mapErrorMessageByCode(...errors));
      }
      if (message) {
        return this.writeErrors(message);
      }
      return this.writeErrors('error');
    }
    if (response.status === 204) {
      return { hasError: false };
    }
    const { result } = (await response.json()) as { result: TResult };
    return {
      hasError: false,
      result,
    };
  };
  private writeErrors = (...errors: string[]) => {
    this.messagesService.appendMessages(
      ...errors.map(error => () =>
        ({
          level: 'error',
          text: error,
        } as Message),
      ),
    );
    return { hasError: true };
  };

  public signInAsync = async (body: SignInRequest) => {
    const response = await fetch(ApiUrl.accountsSignIn, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    if (response.status >= 400) {
      const { errors, message } = (await response.json()) as {
        errors: string[];
        message: string;
      };
      if (errors && errors.length > 0) {
        return this.writeErrors(...this.mapErrorMessageByCode(...errors));
      }
      if (message) {
        return this.writeErrors(message);
      }
      return this.writeErrors('error');
    }
    await this.signInInner(response);
    const claim = this.claim;
    if (claim) {
      this.messagesService.appendMessages(({ messages }) => ({
        level: 'info',
        text: messages.signIn(claim.userName),
        showDuration: 5000,
      }));
      return { hasError: false };
    }
    return { hasError: true };
  };

  public refreshAsync = async (body: { refreshToken: string }) => {
    // refresh する
    const response = await fetch(ApiUrl.accountsRefresh, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    if (response.status === 401) {
      // 認証エラーの場合ログアウト
      this.identityService.signOut();
      return { hasError: true };
    }
    await this.signInInner(response);
    return { hasError: false };
  };

  private signInInner = async (response: Response) => {
    const { result } = (await response.json()) as { result: ClaimResponse };
    this.identityService.signIn(result);
  };

  public resetPasswordAsync = async (body: ResetPasswordRequest) => {
    const response = await fetch(ApiUrl.accountsResetPassword, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    if (response.status >= 400) {
      const { errors, message } = (await response.json()) as {
        errors: string[];
        message: string;
      };
      if (errors && errors.length > 0) {
        return this.writeErrors(...this.mapErrorMessageByCode(...errors));
      }
      if (message) {
        return this.writeErrors(message);
      }
      return this.writeErrors('error');
    }
    await this.signInInner(response);
    const claim = this.claim;
    if (claim) {
      this.messagesService.appendMessages(({ messages }) => ({
        level: 'info',
        text: messages.signIn(claim.userName),
        showDuration: 5000,
      }));
      return { hasError: false };
    }
    return { hasError: true };
  };
}
