import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { injectable } from 'inversify';
import { Claim } from 'src/domains/models/accounts/claim';
import { IAccountsUseCase } from 'src/use-cases/interfaces/accounts-use-case';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IAccountsOperators } from 'src/infrastructures/stores/accounts/operators-interface';
import { IAccountsService } from './services/interfaces/accounts-service';
import { PasswordResetRequestingRequest } from 'src/domains/models/accounts/password-reset-requesting-request';
import { IValidateService } from './services/interfaces/validate-service';
import { IMessagesService } from './services/interfaces/messages-service';
import { SignUpRequestingRequest } from 'src/domains/models/accounts/sign-up-requesting-request';

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
