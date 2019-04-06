import { Claim } from 'src/enterprise/accounts/claim';

export interface Action {
  signOut: {};
  signIn: { claim: Claim };
}
export default Action;
