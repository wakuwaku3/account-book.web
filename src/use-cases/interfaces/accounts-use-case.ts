import { SignInModel } from 'src/domains/models/accounts/sign-in-model';
import { Claim } from 'src/domains/models/accounts/claim';

export interface IAccountsUseCase {
  signOut: () => void;
  refreshTokenAsync: (claim?: Claim) => Promise<void>;
  signInAsync: (model: SignInModel) => Promise<{ hasError: boolean }>;
}
