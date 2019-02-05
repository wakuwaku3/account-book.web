import { SignInResponse } from 'src/domains/models/accounts/sign-in-response';

export interface Action {
  init: {};
  signIn: { result: SignInResponse };
}
export default Action;
