import { injectable } from 'inversify';
import { Claim } from 'src/enterprise/models/accounts/claim';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { inject } from 'src/infrastructures/di/inversify-helper';
import { symbols } from 'src/application/use-cases/di/symbols';
import {
  SignUpRequestingRequest,
  SignInRequest,
  PasswordResetRequestingRequest,
} from 'src/enterprise/models/accounts/account';
import { IFetchService } from 'src/enterprise/infrastructures-interfaces/fetch-service';
import { IAccountsUseCase } from './interfaces/accounts-use-case';
import { IMessagesService } from 'src/enterprise/infrastructures-interfaces/messages-service';
import { IValidateService } from 'src/enterprise/services/accounts/interfaces/validate-service';
import { IAccountsOperators } from 'src/enterprise/services/accounts/interfaces/account-operators';
import { IAccountsService } from 'src/enterprise/services/accounts/interfaces/accounts-service';

@injectable()
export class AccountsUseCase implements IAccountsUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.validateService) private validateService: IValidateService,
    @inject(symbols.accountsOperators)
    private accountsOperators: IAccountsOperators,
    @inject(symbols.accountsService)
    private accountsService: IAccountsService,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
  ) {}
  public signOut = () => this.accountsOperators.signOut({});
  public refreshTokenAsync = async (claim?: Claim) => {
    if (!claim) {
      return;
    }
    await this.fetchService.refreshAsync({
      refreshToken: claim.refreshToken,
    });
  };
  public signInAsync = async (model: SignInRequest) => {
    if (!(await this.accountsService.validateSignInModel(model))) {
      return { hasError: true };
    }
    return await this.fetchService.signInAsync(model);
  };
  public requestPasswordResetAsync = async (
    model: PasswordResetRequestingRequest,
  ) => {
    if (
      !(await this.accountsService.validatePasswordResetRequestingModel(model))
    ) {
      return { hasError: true };
    }
    return await this.accountsService.requestPasswordResetAsync(model);
  };
  public validatePasswordFormat = (password: string) =>
    this.validateService.validatePasswordFormat(password);
  public showErrorMessage = () => {
    this.messagesService.appendMessages(({ messages }) => ({
      level: 'warning',
      text: messages.validationError,
      showDuration: 5000,
    }));
  };
  public getEmailAsync = async (passwordResetToken: string) => {
    const response = await this.fetchService.fetchAsync<{
      email: string;
    }>({
      url: ApiUrl.accountsEmail(passwordResetToken),
      method: 'GET',
    });
    return {
      email: response.result ? response.result.email : '',
      hasError: response.hasError,
    };
  };
  public resetPasswordAsync = this.fetchService.resetPasswordAsync;
  public requestSignUpAsync = async (model: SignUpRequestingRequest) => {
    if (!(await this.accountsService.validateSignUpRequestingModel(model))) {
      return { hasError: true };
    }
    return await this.accountsService.requestSignUpAsync(model);
  };
  public loadSignUpAsync = async (signUpToken: string) => {
    return await this.fetchService.fetchAsync<{
      email: string;
    }>({
      url: ApiUrl.accountsGetSignUp(signUpToken),
      method: 'GET',
    });
  };
  public signUpAsync = this.fetchService.signUpAsync;
}
