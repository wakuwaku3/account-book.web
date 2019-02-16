import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  Typography,
  CircularProgress,
  Button,
} from '@material-ui/core';
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
import { getDefaultCategoryId } from 'src/domains/models/transaction/category';
import { TextBox } from 'src/web/components/forms-controls/text-box';
import { TransactionEditModel } from 'src/domains/models/transaction/transaction-model';
import { Form } from 'src/web/components/forms-controls/form';
import { Url } from 'src/infrastructures/routing/url';
import { CategorySelector } from './category-selector';
import { Localizer } from 'src/domains/common/location/localizer';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { Clear, Save } from '@material-ui/icons';

const styles = createStyles({
  root: { padding: 20, maxWidth: 1024, margin: 'auto' },
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
  createTransactionAsync: (model: TransactionEditModel) => Promise<boolean>;
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
  } = resolve(symbols.transactionUseCase);
  return { createTransactionAsync, editTransactionAsync, getTransactionAsync };
};
const getDefaultState: () => TransactionEditModel = () => {
  return { categoryId: getDefaultCategoryId(), note: '' };
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
  const { root, btnRow, btn, progressContainer } = classes;
  const [model, setModel] = React.useState(getDefaultState());
  const { amount, categoryId, note, date } = model;
  const resetById = async (tid: string) => {
    const newModel = await getTransactionAsync(tid);
    if (newModel) {
      setModel(newModel);
    }
  };
  React.useEffect(() => {
    reset();
  }, [id]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setModel({ ...model, [name]: value });
  };
  const reset = async () => {
    if (id) {
      resetById(id);
      return;
    }
    setModel(getDefaultState());
  };
  const submit = async () => {
    const hasError = id
      ? await editTransactionAsync(id, model)
      : await createTransactionAsync(model);
    if (!hasError) {
      history.push(Url.transaction);
    }
  };
  return id && !date ? (
    <div className={progressContainer}>
      <CircularProgress />
    </div>
  ) : (
    <Container className={root}>
      <Form onSubmit={submit}>
        <Row>
          <Typography variant="h4">
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
            <Button type="submit" color="primary" className={btn}>
              <Save />
              {resources.save}
            </Button>
          </div>
        </Row>
        {date && (
          <Row>
            <Typography variant="h6">
              {localizer.formatDate(new Date(date))}
            </Typography>
          </Row>
        )}
        <Row>
          <TextBox
            value={amount ? amount : amount === 0 ? amount : ''}
            name="amount"
            type="number"
            label={resources.amount}
            onChange={handleChange}
            autoFocus={true}
          />
        </Row>
        <Row>
          <TextBox
            value={note}
            name="note"
            label={resources.note}
            onChange={handleChange}
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
export const TransactionEdit = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(StyledInner);
