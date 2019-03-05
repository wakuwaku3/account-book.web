import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { injectable } from 'inversify';
import { SignInResponse } from 'src/domains/models/accounts/sign-in-response';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IAccountsOperators } from 'src/infrastructures/stores/accounts/operators-interface';
import { IAccountsService } from 'src/use-cases/services/interfaces/accounts-service';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { PasswordResetRequestingRequest } from '../models/accounts/password-reset-requesting-request';
import { IValidateService } from 'src/use-cases/services/interfaces/validate-service';
import { Message } from '../models/common/message';
import { ResetPasswordRequest } from '../models/accounts/reset-password-request';

@injectable()
export class AccountsService implements IAccountsService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.messagesService) private messagesService: IMessagesService,
    @inject(symbols.accountsOperators)
    private accountsOperators: IAccountsOperators,
    @inject(symbols.validateService)
    private validateService: IValidateService,
  ) {}
  public validateSignInModel = (model: SignInRequest) => {
    const { email, password } = model;
    let hasError = false;
    this.messagesService.clear();
    if (!email) {
      this.messagesService.appendMessages(({ messages, resources }) => ({
        level: 'warning',
        text: messages.requiredError(resources.email),
      }));
      hasError = true;
    }
    if (!password) {
      this.messagesService.appendMessages(({ messages, resources }) => ({
        level: 'warning',
        text: messages.requiredError(resources.password),
      }));
      hasError = true;
    }
    return !hasError;
  };
  public validatePasswordResetRequestingModel = (
    model: PasswordResetRequestingRequest,
  ) => {
    const { email } = model;
    let hasError = false;
    this.messagesService.clear();
    if (!email) {
      this.messagesService.appendMessages(({ messages, resources }) => ({
        level: 'warning',
        text: messages.requiredError(resources.email),
      }));
      hasError = true;
    } else if (!this.validateService.validateEmailFormat(email)) {
      this.messagesService.appendMessages(({ messages, resources }) => ({
        level: 'warning',
        text: messages.emailFormatError,
      }));
      hasError = true;
    }
    return !hasError;
  };
  public signInAsync = async (model: SignInRequest) => {
    const { errors, result } = await this.fetchService.fetch<SignInResponse>({
      url: ApiUrl.accountsSignIn,
      method: 'POST',
      body: model,
    });
    if (errors && errors.length > 0) {
      this.messagesService.appendMessages(
        ...errors.map(error => () =>
          ({
            level: 'error',
            text: error,
          } as Message),
        ),
      );
      return { hasError: true };
    }
    if (result) {
      if (result.claim) {
        this.fetchService.setCredential(result.claim.token);
      }
      this.accountsOperators.signIn({ result });
      if (result.claim) {
        const { userName: name } = result.claim;
        this.messagesService.appendMessages(({ messages }) => ({
          level: 'info',
          text: messages.signIn(name),
          showDuration: 5000,
        }));
      }
      return { hasError: false };
    }
    return { hasError: true };
  };
  public requestPasswordResetAsync = async (
    model: PasswordResetRequestingRequest,
  ) => {
    const { errors } = await this.fetchService.fetch({
      url: ApiUrl.accountsPasswordResetRequesting,
      method: 'PUT',
      body: model,
    });
    if (errors && errors.length > 0) {
      this.messagesService.appendMessages(
        ...errors.map(error => () =>
          ({
            level: 'error',
            text: error,
          } as Message),
        ),
      );
      return { hasError: true };
    }
    this.messagesService.appendMessages(({ messages }) => ({
      level: 'info',
      text: messages.sendPasswordResetRequestingMail,
      showDuration: 5000,
    }));
    return { hasError: false };
  };
  public resetPasswordAsync = async (model: ResetPasswordRequest) => {
    const { errors, result } = await this.fetchService.fetchAsync<{
      result: SignInResponse;
      errors: string[];
    }>({
      url: ApiUrl.accountsSignIn,
      method: 'POST',
      body: model,
    });
    if (errors && errors.length > 0) {
      this.messagesService.appendMessages(
        ...errors.map(error => () =>
          ({
            level: 'error',
            text: error,
          } as Message),
        ),
      );
      return { hasError: true };
    }
    this.accountsOperators.signIn({ result });
    if (result.claim && model.passwordResetToken) {
      const { userName: name } = result.claim;
      this.messagesService.appendMessages(({ messages }) => ({
        level: 'info',
        text: messages.signIn(name),
        showDuration: 5000,
      }));
    }
    return { hasError: false };
  };
}
