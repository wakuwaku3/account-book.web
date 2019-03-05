import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { injectable } from 'inversify';
import { SignInResponse } from 'src/domains/models/accounts/sign-in-response';
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
import { ResetPasswordRequest } from 'src/domains/models/accounts/reset-password-request';
import { Message } from 'src/domains/models/common/message';

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
  public signOut = () => this.accountsOperators.signIn({ result: {} });
  public refreshTokenAsync = async (claim?: Claim) => {
    if (!claim) {
      return;
    }
    const { result } = await this.fetchService.fetch<SignInResponse>(
      {
        url: ApiUrl.accountsRefresh,
        method: 'POST',
        body: claim,
      },
      claim.token,
    );
    if (result) {
      if (result.claim) {
        this.fetchService.setCredential(result.claim.token);
      }
      this.accountsOperators.signIn({ result });
    }
  };
  public signInAsync = async (model: SignInRequest) => {
    if (!(await this.accountsService.validateSignInModel(model))) {
      return { hasError: true };
    }
    return await this.accountsService.signInAsync(model);
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
  public showResetPasswordErrorMessage = () => {
    this.messagesService.appendMessages(({ messages }) => ({
      level: 'warning',
      text: messages.validationError,
      showDuration: 5000,
    }));
  };
  public getEmailAsync = async (passwordResetToken: string) => {
    const { email, errors } = await this.fetchService.fetchAsync<{
      email: string;
      errors: string[];
    }>({
      url: ApiUrl.accountsEmail(passwordResetToken),
      method: 'GET',
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
      return { email: '', hasError: true };
    }
    return { email, hasError: false };
  };
  public checkPreviousPasswordAsync = async (previousPassword: string) => {
    const { same, errors } = await this.fetchService.fetchAsync<{
      same: boolean;
      errors: string[];
    }>({
      url: ApiUrl.accountsPreviousPassword,
      method: 'POST',
      body: { previousPassword },
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
      return false;
    }
    return same;
  };
  public resetPasswordAsync = async (request: ResetPasswordRequest) => {
    return await this.accountsService.resetPasswordAsync(request);
  };
}
