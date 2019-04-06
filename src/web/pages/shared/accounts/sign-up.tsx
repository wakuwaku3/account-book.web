import * as React from 'react';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import {
  DialogContent,
  createStyles,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/adapter/stores/accounts/selectors';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/adapter/stores/stored-state';
import { Url } from 'src/enterprise/routing/url';
import { Form } from 'src/web/components/forms-controls/form';
import { Cell } from 'src/web/components/layout/cell';
import { resolve } from 'src/application/use-cases/di/di-container';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import {
  Validator,
  ValidatorInitializer,
  ValidationState,
} from 'src/enterprise/validation/validator';
import { Messages } from 'src/enterprise/location/messages';
import { ValidationPopup } from 'src/web/components/forms-controls/validation-popup';
import { TextBox } from 'src/web/components/forms-controls/text-box';
import { SignUpRequest } from 'src/enterprise/accounts/sign-up-request';
import { Culture } from 'src/enterprise/location/culture-infos';
import { TermsOfService } from './terms-of-service';

const styles = createStyles({
  root: {
    padding: 20,
    paddingTop: 50,
    maxWidth: 800,
    margin: 'auto',
    paddingBottom: 50,
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
  btn: { width: '100%' },
  popover: { top: -25, left: -5, position: 'relative' },
  dialogAction: { margin: 16 },
});
interface Props {
  resources: Resources;
  history: History;
  signUpToken: string;
  messages: Messages;
}
interface Param {
  signUpToken: string;
}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history, match }) => {
  const { signUpToken } = match.params;
  const { resources, messages } = new AccountsSelectors(accounts);
  return { resources, history, signUpToken, messages };
};
interface Events {
  loadSignUpAsync: (
    signUpToken: string,
    history: History,
  ) => Promise<{ email: string } | undefined>;
  showErrorMessage: () => void;
  validatePasswordFormat: (password: string) => boolean;
  signUpAsync: (request: SignUpRequest, history: History) => Promise<void>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const {
    loadSignUpAsync,
    validatePasswordFormat,
    showErrorMessage,
    signUpAsync,
  } = resolve(symbols.accountsUseCase);
  return {
    loadSignUpAsync: async (signUpToken, history) => {
      const { hasError, result } = await loadSignUpAsync(signUpToken);
      if (hasError) {
        history.push(Url.root);
      }
      return result;
    },
    validatePasswordFormat,
    showErrorMessage,
    signUpAsync: async (request, history) => {
      const { hasError } = await signUpAsync(request);
      if (!hasError) {
        history.push(Url.root);
      }
    },
  };
};
interface SignUpModel {
  password: string;
  confirmPassword: string;
  userName: string;
  culture: Culture;
}
interface State {
  email: string;
  model: SignUpModel;
  validationState: ValidationState<SignUpModel>;
  anchor?: null | { key: keyof SignUpModel; el: HTMLInputElement };
  open: boolean;
}

class ModelValidator extends Validator<SignUpModel> {
  constructor(
    private props: Events & Props,
    initializer: ValidatorInitializer<SignUpModel>,
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
  protected defaultState: ValidationState<SignUpModel> = {
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
    userName: [
      {
        text: this.messages.passwordDescription,
        state: 'description',
      },
      {
        text: this.messages.required(this.resources.userName),
        validate: model => (model.userName ? 'valid' : 'inValid'),
      },
    ],
    culture: [
      {
        text: this.messages.required(this.resources.language),
        validate: model => (model.culture ? 'valid' : 'inValid'),
      },
    ],
  };
}

class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  private validator: ModelValidator;
  constructor(props: any) {
    super(props);
    this.validator = new ModelValidator(this.props, {
      getModel: () => this.state.model,
      setValidationState: validationState => this.setState({ validationState }),
      interval: 500,
    });
    this.state = {
      email: '',
      validationState: this.validator.getDefaultState(),
      model: {
        password: '',
        confirmPassword: '',
        userName: '',
        culture: 'ja',
      },
      open: false,
    };
  }
  public async componentDidMount() {
    const { signUpToken, loadSignUpAsync, history } = this.props;
    if (signUpToken) {
      const res = await loadSignUpAsync(signUpToken, history);
      if (res) {
        this.setState({ email: res.email });
      }
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
        key: e.currentTarget.name as keyof SignUpModel,
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
    const key = anchor.key as keyof SignUpModel;
    if (prevModel[key] !== model[key]) {
      this.validator.validateThrottle(key);
    }
  }
  private submit = async () => {
    const { showErrorMessage, signUpAsync, history, signUpToken } = this.props;
    const { model } = this.state;
    const validationState = await this.validator.validateAll(model);
    if (validationState) {
      showErrorMessage();
      this.setState({ validationState, open: false });
      return;
    }
    this.setState({ open: false });
    const { confirmPassword, ...others } = model;
    await signUpAsync({ signUpToken, agreement: true, ...others }, history);
  };
  private handleClickOpen = async () => {
    const { showErrorMessage } = this.props;
    const { model } = this.state;
    const validationState = await this.validator.validateAll(model);
    if (validationState) {
      showErrorMessage();
      this.setState({ validationState, open: false });
      return;
    }
    this.setState({ open: true });
  };

  private handleClose = () => {
    this.setState({ open: false });
  };
  public render() {
    const { resources, classes } = createPropagationProps(this.props);
    const { root, form, hidden, btn, popover, dialogAction } = classes;
    const { email, model, anchor, validationState } = this.state;
    const { password, confirmPassword, userName } = model;
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
          <Form onSubmit={this.handleClickOpen} className={form}>
            <Row>
              <Typography variant="body1">{`${
                resources.email
              }:${email}`}</Typography>
              <input type="text" defaultValue={email} className={hidden} />
            </Row>
            <Row>
              <TextBox
                variant="outlined"
                value={password}
                type="password"
                name="password"
                onChange={this.handleChange}
                label={resources.password}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
                required={true}
                error={this.validator.hasError('password', validationState)}
              />
            </Row>
            <Row>
              <TextBox
                variant="outlined"
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                onChange={this.handleChange}
                label={resources.confirmPassword}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
                required={true}
                error={this.validator.hasError(
                  'confirmPassword',
                  validationState,
                )}
              />
            </Row>
            <Row>
              <TextBox
                variant="outlined"
                value={userName}
                name="userName"
                onChange={this.handleChange}
                label={resources.userName}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
                required={true}
                error={this.validator.hasError('userName', validationState)}
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
                  {resources.next}
                </Button>
              </Cell>
            </Row>
          </Form>
        </Row>
        {validationMessages && (
          <ValidationPopup
            className={popover}
            popupProps={{
              anchorEl: anchor && anchor.el,
              popperProps: { placement: 'top-end' },
            }}
            validationMessages={validationMessages}
          />
        )}
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>{resources.termsOfService}</DialogTitle>
          <DialogContent>
            <TermsOfService />
          </DialogContent>
          <DialogActions className={dialogAction}>
            <Button onClick={this.handleClose} color="primary">
              {resources.cancel}
            </Button>
            <Button
              onClick={this.submit}
              color="primary"
              variant="contained"
              autoFocus={true}
            >
              {resources.submitWithAgreement}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const SignUp = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
