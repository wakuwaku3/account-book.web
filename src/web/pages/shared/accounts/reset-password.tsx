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
import { ResetPasswordRequest } from 'src/domains/models/accounts/reset-password-request';
import { Url } from 'src/infrastructures/routing/url';
import { Form } from 'src/web/components/forms-controls/form';
import { OutlinedTextBox } from 'src/web/components/forms-controls/text-box';
import { Cell } from 'src/web/components/layout/cell';
import { OutlinedButton } from 'src/web/components/forms-controls/button';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import {
  Validator,
  ValidatorInitializer,
  ValidationState,
} from 'src/domains/models/validation/validator';
import { Messages } from 'src/domains/common/location/messages';
import { ValidationPopup } from 'src/web/components/forms-controls/validation-popup';

const styles = createStyles({
  root: {
    padding: 20,
    paddingTop: 50,
    maxWidth: 800,
    margin: 'auto',
  },
  form: {
    paddingTop: 20,
  },
  hidden: {
    position: 'fixed',
    top: '-100px',
    left: '-100px',
    height: 0,
    padding: 0,
    margin: 0,
    border: 0,
  },
});
interface Props {
  resources: Resources;
  history: History;
  passwordResetToken: string;
  email: string;
  messages: Messages;
}
interface Param {
  passwordResetToken: string;
}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history, match }) => {
  const { claim } = accounts;
  const { passwordResetToken } = match.params;
  const email = passwordResetToken
    ? undefined
    : claim
    ? claim.email
    : undefined;
  const { resources, messages } = new AccountsSelectors(accounts);
  return { resources, history, passwordResetToken, email, messages };
};
interface Events {
  getEmailAsync: (
    passwordResetToken: string,
  ) => Promise<{ email: string; hasError: boolean }>;
  showResetPasswordErrorMessage: () => void;
  checkPreviousPasswordAsync: (previousPassword: string) => Promise<boolean>;
  validatePasswordFormat: (password: string) => boolean;
  resetPasswordAsync: (
    request: ResetPasswordRequest,
    history: History,
  ) => Promise<void>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const {
    getEmailAsync,
    validatePasswordFormat,
    showResetPasswordErrorMessage,
    checkPreviousPasswordAsync,
    resetPasswordAsync,
  } = resolve(symbols.accountsUseCase);
  return {
    getEmailAsync,
    validatePasswordFormat,
    showResetPasswordErrorMessage,
    checkPreviousPasswordAsync,
    resetPasswordAsync: async (request, history) => {
      const { hasError } = await resetPasswordAsync(request);
      if (!hasError) {
        history.push(Url.root);
      }
    },
  };
};
interface ResetPasswordModel {
  previousPassword: string;
  password: string;
  confirmPassword: string;
}
interface State {
  email: string;
  model: ResetPasswordModel;
  validationState: ValidationState<ResetPasswordModel>;
  anchor?: null | { key: keyof ResetPasswordModel; el: HTMLInputElement };
}

class ModelValidator extends Validator<ResetPasswordModel> {
  constructor(
    private props: Events & Props,
    initializer: ValidatorInitializer<ResetPasswordModel>,
  ) {
    super(initializer);
  }
  private get messages() {
    return this.props.messages;
  }
  private get resources() {
    return this.props.resources;
  }
  private get validatePasswordFormat() {
    return this.props.validatePasswordFormat;
  }
  private get checkPreviousPassword() {
    return this.props.checkPreviousPasswordAsync;
  }
  protected defaultState: ValidationState<ResetPasswordModel> = {
    previousPassword: this.props.passwordResetToken
      ? []
      : [
          {
            text: this.messages.required(this.resources.previousPassword),
            validate: model => (model.previousPassword ? 'valid' : 'inValid'),
          },
          {
            text: this.messages.notSamePreviousPassword,
            validateAsync: async model => {
              if (!model.previousPassword) {
                return 'valid';
              }
              return (await this.checkPreviousPassword(model.previousPassword))
                ? 'valid'
                : 'inValid';
            },
          },
        ],
    password: [
      {
        text: this.messages.passwordDescription,
        state: 'description',
      },
      {
        text: this.messages.passwordLength,
        validate: model =>
          model.password && model.password.length >= 8 ? 'valid' : 'inValid',
      },
      {
        text: this.messages.passwordFormat,
        validate: model =>
          this.validatePasswordFormat(model.password) ? 'valid' : 'inValid',
      },
    ],
    confirmPassword: [
      {
        text: this.messages.confirmPasswordDescription,
        validationTriggers: ['password'],
        validateAsync: async model =>
          (await this.hasErrorAsync('password', model)) ||
          model.password !== model.confirmPassword
            ? 'inValid'
            : 'valid',
      },
    ],
  };
}

class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  private validator: ModelValidator;
  constructor(props: any) {
    super(props);
    const { email } = this.props;
    this.validator = new ModelValidator(this.props, {
      getModel: () => this.state.model,
      setValidationState: validationState => this.setState({ validationState }),
      interval: 500,
    });
    this.state = {
      email: email ? email : '',
      validationState: this.validator.getDefaultState(),
      model: {
        previousPassword: '',
        password: '',
        confirmPassword: '',
      },
    };
  }
  public async componentDidMount() {
    const { passwordResetToken, getEmailAsync, history } = this.props;
    if (passwordResetToken) {
      const { email, hasError } = await getEmailAsync(passwordResetToken);
      if (hasError) {
        history.push(Url.root);
        return;
      }
      this.setState({ email });
    }
  }
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { model } = this.state;
    const { name, value } = e.currentTarget;
    this.setState({ model: { ...model, [name]: value } });
  };
  private openPopover = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      anchor: {
        key: e.currentTarget.name as keyof ResetPasswordModel,
        el: e.currentTarget,
      },
    });
  };
  private closePopover = () => {
    this.setState({ anchor: null });
  };
  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
  ) {
    if (!prevState) {
      return;
    }
    const prevModel = prevState.model;
    const { model, anchor } = this.state;
    if (!anchor) {
      return;
    }
    const key = anchor.key as keyof ResetPasswordModel;
    if (prevModel[key] !== model[key]) {
      this.validator.validateThrottle(key);
    }
  }
  private submit = async () => {
    const {
      showResetPasswordErrorMessage,
      resetPasswordAsync,
      history,
    } = this.props;
    const { model } = this.state;
    const validationState = await this.validator.validateAll(model);
    if (validationState) {
      showResetPasswordErrorMessage();
      this.setState({ validationState });
      return;
    }
    await resetPasswordAsync(model, history);
  };
  public render() {
    const { resources, classes, passwordResetToken } = createPropagationProps(
      this.props,
    );
    const { root, form, hidden } = classes;
    const { email, model, anchor, validationState } = this.state;
    const { password, previousPassword, confirmPassword } = model;
    const validationMessages =
      anchor && validationState[anchor.key]
        ? validationState[anchor.key]
        : undefined;
    return (
      <Container className={root}>
        <Row>
          <Typography variant="h4">{resources.resetPassword}</Typography>
        </Row>
        <Row>
          <Form onSubmit={this.submit} className={form}>
            <Row>
              <Typography variant="body1">{`${
                resources.email
              }:${email}`}</Typography>
              <input type="text" defaultValue={email} className={hidden} />
            </Row>
            {!passwordResetToken && (
              <Row>
                <OutlinedTextBox
                  value={previousPassword}
                  type="password"
                  name="previousPassword"
                  onChange={this.handleChange}
                  label={resources.previousPassword}
                  onFocus={this.openPopover}
                  onBlur={this.closePopover}
                  error={this.validator.hasError(
                    'previousPassword',
                    validationState,
                  )}
                />
              </Row>
            )}
            <Row>
              <OutlinedTextBox
                value={password}
                type="password"
                name="password"
                onChange={this.handleChange}
                label={resources.password}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
                error={this.validator.hasError('password', validationState)}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                onChange={this.handleChange}
                label={resources.confirmPassword}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
                error={this.validator.hasError(
                  'confirmPassword',
                  validationState,
                )}
              />
            </Row>
            <Row>
              <Cell xs={8} />
              <Cell xs={4}>
                <OutlinedButton type="submit" color="primary">
                  {resources.change}
                </OutlinedButton>
              </Cell>
            </Row>
          </Form>
        </Row>
        {validationMessages && (
          <ValidationPopup
            popupProps={{
              anchorEl: anchor && anchor.el,
              popperProps: { placement: 'top-end' },
            }}
            validationMessages={validationMessages}
          />
        )}
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const ResetPassword = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(StyledInner);
