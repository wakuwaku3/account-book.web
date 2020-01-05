import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  Typography,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/models/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/enterprise/stores/accounts/selectors';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { getDefaultCategoryId } from 'src/enterprise/models/transaction/category';
import { TextBox } from 'src/web/components/forms-controls/text-box';
import {
  TransactionEditModel,
  TransactionCreationModel,
} from 'src/enterprise/models/transaction/transaction-model';
import { Form } from 'src/web/components/forms-controls/form';
import { Url } from 'src/infrastructures/routing/url';
import { CategorySelector } from './category-selector';
import { Localizer } from 'src/enterprise/models/location/localizer';
import { Clear, Save } from '@material-ui/icons';
import { connect } from 'react-redux';
import { transactionUseCase } from 'src/application/use-cases/di/container';

const styles = createStyles({
  transactionEdit: { padding: 20, maxWidth: 1024, margin: 'auto' },
  btnRow: { justifyContent: 'flex-end', flexGrow: 1, textAlign: 'right' },
  btn: {
    maxWidth: 120,
    marginRight: 10,
    height: '100%',
    '&:last-child': {
      marginRight: 0,
    },
  },
  progressContainer: {
    justifyContent: 'center',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
});
interface Props {
  resources: Resources;
  localizer: Localizer;
  history: History;
  id?: string;
}
interface Param {
  id: string;
}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history, match }) => {
  const { id } = match.params;
  const { resources, localizer } = new AccountsSelectors(accounts);
  return { resources, localizer, history, id };
};
interface Events {
  createTransactionAsync: (model: TransactionCreationModel) => Promise<boolean>;
  editTransactionAsync: (
    id: string,
    model: TransactionEditModel,
  ) => Promise<boolean>;
  getTransactionAsync: (
    id: string,
  ) => Promise<TransactionEditModel | undefined>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const {
    createTransactionAsync,
    editTransactionAsync,
    getTransactionAsync,
  } = transactionUseCase.value;
  return { createTransactionAsync, editTransactionAsync, getTransactionAsync };
};
const getDefaultState: () => TransactionEditModel = () => {
  return { categoryId: getDefaultCategoryId(), notes: '' };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    resources,
    classes,
    localizer,
    id,
    getTransactionAsync,
    editTransactionAsync,
    createTransactionAsync,
    history,
  } = createPropagationProps(props);
  const { transactionEdit, btnRow, btn, progressContainer } = classes;
  const [model, setModel] = React.useState(getDefaultState());
  const { amount, categoryId, notes, date } = model;
  const handleChange = <K extends keyof TransactionEditModel>(
    key: K,
    value: TransactionEditModel[K],
  ) => {
    setModel({ ...model, [key]: value });
  };
  const reset = React.useCallback(async () => {
    const resetById = async (tid: string) => {
      const newModel = await getTransactionAsync(tid);
      if (newModel) {
        setModel(newModel);
      }
    };
    if (id) {
      resetById(id);
      return;
    }
    setModel(getDefaultState());
  }, [getTransactionAsync, id]);
  const disableSubmit =
    !(amount || amount === 0) || !(categoryId || categoryId === '0');
  const submit = async () => {
    if (disableSubmit) {
      return;
    }
    const res = id
      ? await editTransactionAsync(id, model)
      : await createTransactionAsync(model);
    if (res) {
      history.push(Url.transaction);
    }
  };
  React.useEffect(() => {
    reset();
  }, [reset]);
  return id && !date ? (
    <div className={progressContainer}>
      <CircularProgress />
    </div>
  ) : (
    <Container className={transactionEdit}>
      <Form onSubmit={submit}>
        <Row>
          <Typography variant="h4" color="textPrimary">
            {id ? resources.transactionEdit : resources.transactionCreate}
          </Typography>
          <div className={btnRow}>
            <Button
              type="button"
              color="secondary"
              className={btn}
              onClick={reset}
            >
              <Clear />
              {resources.reset}
            </Button>
            <Button
              type="submit"
              color="primary"
              className={btn}
              disabled={disableSubmit}
            >
              <Save />
              {resources.save}
            </Button>
          </div>
        </Row>
        {date && (
          <Row>
            <Typography variant="h6">
              {localizer.formatDateTime(new Date(date))}
            </Typography>
          </Row>
        )}
        <Row>
          <TextBox
            value={amount ? amount : amount === 0 ? amount : ''}
            name="amount"
            type="number"
            label={resources.amount}
            onChange={e =>
              handleChange('amount', Number(e.currentTarget.value))
            }
            autoFocus={true}
            required={true}
          />
        </Row>
        <Row>
          <TextBox
            value={notes}
            name="notes"
            label={resources.notes}
            onChange={e => handleChange('notes', e.currentTarget.value)}
            multiline={true}
          />
        </Row>
        <Row>
          <CategorySelector
            value={categoryId}
            resources={resources}
            onChange={v => setModel({ ...model, categoryId: v })}
          />
        </Row>
      </Form>
    </Container>
  );
};
const StyledInner = decorate(styles)(Inner);
export const TransactionEdit = withRouter(
  connect(mapStateToProps, mapEventToProps)(StyledInner),
);
