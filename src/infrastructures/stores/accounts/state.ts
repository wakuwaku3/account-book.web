import { Claim } from 'src/domains/models/accounts/claim';

export interface AccountsState {
  claim?: Claim;
}

export const getDefaultAccountsState = () => {
  if (localStorage) {
    const value = localStorage.getItem('accounts');
    if (value) {
      const res = JSON.parse(value) as AccountsState;
      if (res) {
        return res;
      }
    }
  }
  return {};
};

export default AccountsState;
