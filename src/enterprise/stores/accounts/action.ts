import { Claim } from 'src/enterprise/models/accounts/claim';

export interface Action {
  signOut: {};
  signIn: { claim: Claim };
}
export default Action;
