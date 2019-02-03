import { SignInModel } from 'src/domains/models/accounts/sign-in-model';

export interface IAccountsService {
  validate: (model: SignInModel) => boolean;
  signInAsync: (model: SignInModel) => Promise<{ hasError: boolean }>;
}
