import { Claim } from 'src/domains/models/accounts/claim';

export interface Action {
  signOut: {};
  signIn: { claim: Claim };
}
export default Action;
