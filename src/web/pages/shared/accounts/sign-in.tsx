import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography, Button } from '@material-ui/core';
import * as React from 'react';
import { TextBox } from 'src/web/components/forms-controls/text-box';
import { EventMapper } from 'src/infrastructures/stores/types';
import { SignInRequest } from 'src/enterprise/models/accounts/account';
import { Resources } from 'src/enterprise/models/location/resources';
import { Form } from 'src/web/components/forms-controls/form';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { AccountsSelectors } from 'src/enterprise/stores/accounts/selectors';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { Link } from 'react-router-dom';
import { Url } from 'src/infrastructures/routing/url';
import { connect } from 'react-redux';
import { accountsUseCase } from 'src/application/use-cases/di/container';

const styles = createStyles({
  root: {
    padding: 20,
    maxWidth: 350,
    margin: 'auto',
    height: '90%',
    alignContent: 'center',
  },
  btn: {
    marginBottom: 5,
    width: '100%',
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
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { signIn, resources, classes, getDefaultEmail } = props;
  const [model, setModel] = React.useState({
    email: getDefaultEmail(),
    password: '',
  });
  const { email, password } = model;
  const { form, root, btn, fullWidth } = classes;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setModel({
      ...model,
      [name]: value,
    });
  };
  return (
    <Container className={root}>
      <Row>
        <Typography variant="h4" color="textPrimary">{resources.signIn}</Typography>
      </Row>
      <Row>
        <Form onSubmit={() => signIn(model)} className={form}>
          <Row>
            <TextBox
              variant="outlined"
              value={email}
              type="email"
              name="email"
              onChange={handleChange}
              label={resources.email}
              placeholder={resources.emailPlaceholder}
            />
          </Row>
          <Row>
            <TextBox
              variant="outlined"
              label={resources.password}
              value={password}
              name="password"
              type="password"
              onChange={handleChange}
            />
          </Row>
          <Row>
            <Button
              variant="outlined"
              type="submit"
              className={btn}
              color="primary"
            >
              {resources.signIn}
            </Button>
          </Row>
          <Row>
            <Link to={Url.signUpRequesting} className={fullWidth}>
              <Typography variant="caption" color="inherit" align="right">
                {resources.entryUser}
              </Typography>
            </Link>
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
};
const mapEventToProps: EventMapper<Events> = () => {
  const { signInAsync } = accountsUseCase.value;
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
const ConnectedInner = connect(mapStateToProps, mapEventToProps)(StyledInner);
export const SignIn = withRouter(ConnectedInner);
