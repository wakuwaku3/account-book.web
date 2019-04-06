import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { injectable } from 'inversify';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IAccountsService } from 'src/use-cases/services/interfaces/accounts-service';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { PasswordResetRequestingRequest } from 'src/domains/models/accounts/password-reset-requesting-request';
import { IValidateService } from 'src/use-cases/services/interfaces/validate-service';
import { SignUpRequestingRequest } from 'src/domains/models/accounts/sign-up-requesting-request';

@injectable()
export class AccountsService implements IAccountsService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.messagesService) private messagesService: IMessagesService,
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
  public validateSignUpRequestingModel = (model: SignUpRequestingRequest) => {
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

  public requestPasswordResetAsync = async (
    model: PasswordResetRequestingRequest,
  ) => {
    const { hasError } = await this.fetchService.fetchAsync({
      url: ApiUrl.accountsPasswordResetRequesting,
      method: 'PUT',
      body: model,
    });
    if (!hasError) {
      this.messagesService.appendMessages(({ messages }) => ({
        level: 'info',
        text: messages.sendPasswordResetRequestingMail,
        showDuration: 5000,
      }));
    }
    return { hasError };
  };

  public requestSignUpAsync = async (model: SignUpRequestingRequest) => {
    const { hasError } = await this.fetchService.fetchAsync({
      url: ApiUrl.accountsSignUpRequesting,
      method: 'PUT',
      body: model,
    });
    if (!hasError) {
      this.messagesService.appendMessages(({ messages }) => ({
        level: 'info',
        text: messages.sendSignUpRequestingMail,
        showDuration: 5000,
      }));
    }
    return { hasError };
  };
}
