import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Url } from 'src/infrastructures/routing/url';
import { StateMapper } from 'src/infrastructures/stores/types';
import { SignIn } from './accounts/sign-in';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { Dashboard } from 'src/web/pages/home';
import { PasswordResetRequesting } from './accounts/password-reset-requesting';
import { ResetPassword } from './accounts/reset-password';
import { PlanIndex } from '../plan';
import { PlanCreate } from '../plan/create';
import { PlanEdit } from '../plan/edit';
import { PlanEnter } from '../plan/enter';
import { TransactionIndex } from '../transaction';
import { TransactionEdit } from '../transaction/edit';
import { TransactionCreate } from '../transaction/create';

interface Props {
  authenticated: boolean;
}
export const Inner: React.SFC<Props> = ({ authenticated }) => {
  return authenticated ? (
    <Switch>
      <Route path={Url.plan} component={PlanIndex} exact={true} />
      <Route path={Url.planCreate} component={PlanCreate} exact={true} />
      <Route path={Url.planEdit} component={PlanEdit} exact={true} />
      <Route path={Url.planEnter} component={PlanEnter} exact={true} />
      <Route path={Url.transaction} component={TransactionIndex} exact={true} />
      <Route
        path={Url.transactionCreate}
        component={TransactionCreate}
        exact={true}
      />
      <Route
        path={Url.transactionEdit}
        component={TransactionEdit}
        exact={true}
      />
      <Route path={Url.root} component={Dashboard} />
    </Switch>
  ) : (
    <Switch>
      <Route path={Url.resetPassword} component={ResetPassword} exact={true} />
      <Route
        path={Url.passwordResetRequesting}
        component={PasswordResetRequesting}
        exact={true}
      />
      <Route path={Url.root} component={SignIn} />
    </Switch>
  );
};
const mapStateToProps: StateMapper<StoredState, Props> = ({ accounts }) => {
  const { authenticated } = new AccountsSelectors(accounts);
  return { authenticated };
};
export const AppRouter = withConnectedRouter(mapStateToProps)(Inner);
