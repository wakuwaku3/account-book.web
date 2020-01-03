import {
  SignInRequest,
  PasswordResetRequestingRequest,
} from 'src/enterprise/models/accounts/account';
import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/di/inversify-helper';
import symbols from './interfaces/symbols';
import { infrastructuresSymbols } from 'src/enterprise/infrastructures-interfaces/symbols';
import { IAccountsService } from 'src/enterprise/services/accounts/interfaces/accounts-service';
import { IValidateService } from 'src/enterprise/services/accounts/interfaces/validate-service';
import { SignUpRequestingRequest } from 'src/enterprise/models/accounts/account';
import { IFetchService } from 'src/enterprise/infrastructures-interfaces/fetch-service';
import { IMessagesService } from 'src/enterprise/infrastructures-interfaces/messages-service';
import { ApiUrl } from 'src/infrastructures/routing/url';

@injectable()
export class AccountsService implements IAccountsService {
  constructor(
    @inject(infrastructuresSymbols.fetchService)
    private fetchService: IFetchService,
    @inject(infrastructuresSymbols.messagesService)
    private messagesService: IMessagesService,
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
