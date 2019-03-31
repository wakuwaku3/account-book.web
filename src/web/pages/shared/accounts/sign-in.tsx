import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography, Button } from '@material-ui/core';
import * as React from 'react';
import { TextBox } from 'src/web/components/forms-controls/text-box';
import { EventMapper } from 'src/infrastructures/stores/types';
import { SignInRequest } from 'src/domains/models/accounts/sign-in-request';
import { resolve } from 'src/use-cases/common/di-container';
import { Resources } from 'src/domains/common/location/resources';
import { Form } from 'src/web/components/forms-controls/form';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
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
        <Typography variant="h4">{resources.signIn}</Typography>
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
