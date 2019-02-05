import * as React from 'react';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { createStyles, Typography } from '@material-ui/core';
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
import { PasswordResetRequestingRequest } from 'src/domains/models/accounts/password-reset-requesting-request';
import { Form } from 'src/web/components/forms-controls/form';
import { OutlinedTextBox } from 'src/web/components/forms-controls/text-box';
import { Cell } from 'src/web/components/layout/cell';
import { OutlinedButton } from 'src/web/components/forms-controls/button';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { Url } from 'src/infrastructures/routing/url';

const styles = createStyles({
  root: {
    padding: 20,
    maxWidth: 550,
    margin: 'auto',
    paddingBottom: 200,
    height: '100%',
    alignContent: 'center',
  },
  form: {
    paddingTop: 20,
  },
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
  requestPasswordReset: (
    model: PasswordResetRequestingRequest,
    history: History,
  ) => void;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { requestPasswordResetAsync } = resolve(symbols.accountsUseCase);
  return {
    requestPasswordReset: async (model, history) => {
      const { hasError } = await requestPasswordResetAsync(model);
      if (!hasError) {
        history.push(Url.root);
      }
    },
  };
};
interface State {
  model: PasswordResetRequestingRequest;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    const { getDefaultEmail } = this.props;
    this.state = { model: { email: getDefaultEmail() } };
  }
  public onChange = (name: keyof PasswordResetRequestingRequest) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      model: Object.assign({}, this.state.model, {
        [name]: e.currentTarget.value,
      }),
    });
  };
  public render() {
    const {
      resources,
      classes,
      requestPasswordReset,
      history,
    } = createPropagationProps(this.props);
    const { email } = this.state.model;
    const { root, form } = classes;
    return (
      <Container className={root}>
        <Row>
          <Typography variant="h4">{resources.resetPassword}</Typography>
        </Row>
        <Row>
          <Typography variant="subtitle2">
            {resources.resetPasswordRequesting}
          </Typography>
        </Row>
        <Row>
          <Form
            onSubmit={() => requestPasswordReset(this.state.model, history)}
            className={form}
          >
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
              <Cell xs={8} />
              <Cell xs={4}>
                <OutlinedButton type="submit" color="primary">
                  {resources.submit}
                </OutlinedButton>
              </Cell>
            </Row>
          </Form>
        </Row>
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const PasswordResetRequesting = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(StyledInner);
