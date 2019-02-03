import { SignInResult } from 'src/domains/models/accounts/sign-in-result';

export interface Action {
  init: {};
  signIn: { result: SignInResult };
}
export default Action;
