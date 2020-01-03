import { Claim } from 'src/enterprise/models/accounts/claim';

export interface IAccountsOperators {
  signIn: (payload: { claim: Claim }) => void;
  signOut: (payload: {}) => void;
}
