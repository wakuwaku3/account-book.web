import { IFetchService } from 'src/enterprise/infrastructures-interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { ClaimResponse } from 'src/enterprise/models/accounts/claim';
import { IMessagesService } from 'src/enterprise/infrastructures-interfaces/messages-service';
import { now } from 'src/infrastructures/helpers/date-helper';
import { IIdentityService } from './interfaces/identity-service';
import {
  FetchRequest,
  FetchResponse,
} from 'src/enterprise/models/accounts/fetch';
import { Message } from 'src/enterprise/models/messages/message';
import {
  SignInRequest,
  ResetPasswordRequest,
  SignUpRequest,
} from 'src/enterprise/models/accounts/account';

export class FetchService implements IFetchService {
  private get claim() {
    return this.identityService.getClaim();
  }
  constructor(
    private messagesService: IMessagesService,
    private identityService: IIdentityService,
  ) {}
  public fetchAsync = async <TResult>(
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
  public signUpAsync = async (body: SignUpRequest) => {
    const response = await fetch(ApiUrl.accountsSignUp, {
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
