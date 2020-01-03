import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Url } from 'src/enterprise/routing/url';
import { StateMapper } from 'src/infrastructures/stores/types';
import { SignIn } from './accounts/sign-in';
import { AccountsSelectors } from 'src/adapter/stores/accounts/selectors';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { StoredState } from 'src/adapter/stores/stored-state';
import { Dashboard } from 'src/web/pages/home';
import { PasswordResetRequesting } from './accounts/password-reset-requesting';
import { ResetPassword } from './accounts/reset-password';
import { PlanIndex } from '../plan';
import { PlanEdit } from '../plan/edit';
import { PlanEnter } from '../actual/enter';
import { TransactionIndex } from '../transaction';
import { TransactionEdit } from '../transaction/edit';
import { SignUpRequesting } from './accounts/sign-up-requesting';
import { SignUp } from './accounts/sign-up';
import { connect } from 'react-redux';

interface Props {
  authenticated: boolean;
}
export const Inner: React.SFC<Props> = ({ authenticated }) => {
  return authenticated ? (
    <Switch>
      <Route path={Url.plan} component={PlanIndex} exact={true} />
      <Route path={Url.planCreate} component={PlanEdit} exact={true} />
      <Route path={Url.planEdit} component={PlanEdit} exact={true} />
      <Route path={Url.actualEnter} component={PlanEnter} exact={true} />
      <Route path={Url.transaction} component={TransactionIndex} exact={true} />
      <Route
        path={Url.transactionCreate}
        component={TransactionEdit}
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
      <Route path={Url.signUp} component={SignUp} exact={true} />
      <Route
        path={Url.signUpRequesting}
        component={SignUpRequesting}
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
const ConnectedInner = connect(mapStateToProps)(Inner);
export const AppRouter = withRouter(ConnectedInner);
