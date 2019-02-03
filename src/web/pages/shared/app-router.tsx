import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Url } from 'src/infrastructures/routing/url';
import { StateMapper } from 'src/infrastructures/stores/types';
import { SignIn } from './accounts/sign-in';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { HomeIndex } from 'src/web/pages/home';

interface Props {
  authenticated: boolean;
}
export const Inner: React.SFC<Props> = ({ authenticated }) => {
  return authenticated ? (
    <Switch>
      <Route path={Url.root} component={HomeIndex} />
    </Switch>
  ) : (
    <Switch>
      <Route path={Url.root} component={SignIn} />
    </Switch>
  );
};
const mapStateToProps: StateMapper<StoredState, Props> = ({ accounts }) => {
  const { authenticated } = new AccountsSelectors(accounts);
  return { authenticated };
};
export const AppRouter = withConnectedRouter(mapStateToProps)(Inner);
