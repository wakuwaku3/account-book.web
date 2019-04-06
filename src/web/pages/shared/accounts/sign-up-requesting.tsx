import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography, Button } from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { Form } from 'src/web/components/forms-controls/form';
import { Cell } from 'src/web/components/layout/cell';
import { resolve } from 'src/application/use-cases/di/di-container';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { Url } from 'src/infrastructures/routing/url';
import { TextBox } from 'src/web/components/forms-controls/text-box';
import { SignUpRequestingRequest } from 'src/domains/models/accounts/sign-up-requesting-request';

const styles = createStyles({
  root: {
    padding: 20,
    maxWidth: 550,
    margin: 'auto',
    alignContent: 'center',
    height: '90%',
  },
  form: {
    paddingTop: 20,
  },
  btn: { width: '100%' },
});
interface Props {
  resources: Resources;
  history: History;
  getDefaultEmail: () => string;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history }) => {
  const { resources } = new AccountsSelectors(accounts);
  const { claim } = accounts;
  const getDefaultEmail = () => {
    if (claim) {
      return claim.email;
    }
    return '';
  };
  return { resources, getDefaultEmail, history };
};
interface Events {
  submit: (model: SignUpRequestingRequest, history: History) => void;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { requestSignUpAsync } = resolve(symbols.accountsUseCase);
  return {
    submit: async (model, history) => {
      const { hasError } = await requestSignUpAsync(model);
      if (!hasError) {
        history.push(Url.root);
      }
    },
  };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    resources,
    classes,
    submit,
    history,
    getDefaultEmail,
  } = createPropagationProps(props);
  const [model, setModel] = React.useState<SignUpRequestingRequest>({
    email: getDefaultEmail(),
  });
  const { email } = model;
  const { root, form, btn } = classes;
  const handleChange = (name: keyof SignUpRequestingRequest) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setModel({
      ...model,
      [name]: e.currentTarget.value,
    });
  };
  return (
    <Container className={root}>
      <Row>
        <Typography variant="h4">{resources.entryUser}</Typography>
      </Row>
      <Row>
        <Typography variant="subtitle2">
          {resources.signUpRequesting}
        </Typography>
      </Row>
      <Row>
        <Form onSubmit={() => submit(model, history)} className={form}>
          <Row>
            <TextBox
              variant="outlined"
              value={email}
              type="email"
              onChange={handleChange('email')}
              label={resources.email}
              required={true}
              placeholder={resources.emailPlaceholder}
            />
          </Row>
          <Row>
            <Cell xs={8} />
            <Cell xs={4}>
              <Button
                variant="outlined"
                type="submit"
                color="primary"
                className={btn}
              >
                {resources.submit}
              </Button>
            </Cell>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};
const StyledInner = decorate(styles)(Inner);
export const SignUpRequesting = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(StyledInner);
