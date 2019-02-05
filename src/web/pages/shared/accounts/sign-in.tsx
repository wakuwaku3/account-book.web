import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { OutlinedTextBox } from 'src/web/components/forms-controls/text-box';
import { EventMapper } from 'src/infrastructures/stores/types';
import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { resolve } from 'src/use-cases/common/di-container';
import { Resources } from 'src/domains/common/location/resources';
import { Form } from 'src/web/components/forms-controls/form';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { OutlinedButton } from 'src/web/components/forms-controls/button';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { symbols } from 'src/use-cases/common/di-symbols';
import { Link } from 'react-router-dom';
import { Url } from 'src/infrastructures/routing/url';

const styles = createStyles({
  root: {
    padding: 20,
    maxWidth: 350,
    margin: 'auto',
    paddingBottom: 200,
    height: '100%',
    alignContent: 'center',
  },
  btn: {
    marginBottom: 5,
  },
  form: {
    paddingTop: 20,
  },
  fullWidth: {
    width: '100%',
  },
});
interface Props {
  resources: Resources;
  getDefaultEmail: () => string;
}
interface Events {
  signIn: (state: SignInRequest) => void;
}
interface State {
  model: SignInRequest;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    const { getDefaultEmail } = this.props;
    this.state = {
      model: { email: getDefaultEmail(), password: '' },
    };
  }
  public onChange = (name: keyof SignInRequest) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      model: Object.assign({}, this.state.model, {
        [name]: e.currentTarget.value,
      }),
    });
  };
  public render() {
    const { signIn, resources, classes } = this.props;
    const { email, password } = this.state.model;
    const { form, root, btn, fullWidth } = classes;
    return (
      <Container className={root}>
        <Row>
          <Typography variant="h4">{resources.signIn}</Typography>
        </Row>
        <Row>
          <Form onSubmit={() => signIn(this.state.model)} className={form}>
            <Row>
              <OutlinedTextBox
                value={email}
                type="email"
                onChange={this.onChange('email')}
                label={resources.email}
                placeholder={resources.emailPlaceholder}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                label={resources.password}
                value={password}
                type="password"
                onChange={this.onChange('password')}
              />
            </Row>
            <Row>
              <OutlinedButton type="submit" className={btn} color="primary">
                {resources.signIn}
              </OutlinedButton>
            </Row>
            <Row>
              <Link to={Url.passwordResetRequesting} className={fullWidth}>
                <Typography variant="caption" color="inherit" align="right">
                  {resources.forgotPassword}
                </Typography>
              </Link>
            </Row>
          </Form>
        </Row>
      </Container>
    );
  }
}
const mapEventToProps: EventMapper<Events> = () => {
  const { signInAsync } = resolve(symbols.accountsUseCase);
  return {
    signIn: async model => {
      await signInAsync(model);
    },
  };
};
interface Params {
  workspaceUrl: string;
}
const mapStateToProps: StateMapperWithRouter<StoredState, Props, Params> = (
  { accounts },
  { match, history },
) => {
  const { claim } = accounts;
  const { resources } = new AccountsSelectors(accounts);
  const getDefaultEmail = () => {
    if (claim) {
      return claim.email;
    }
    return '';
  };
  return { resources, getDefaultEmail };
};
const StyledInner = decorate(styles)(Inner);
export const SignIn = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
