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
import { TextBox } from 'src/web/components/forms-controls/text-box';
import {
  PlanEditModel,
  PlanCreationModel,
} from 'src/domains/models/plan/plan-model';
import { Form } from 'src/web/components/forms-controls/form';
import { Url } from 'src/infrastructures/routing/url';
import { Localizer } from 'src/domains/common/location/localizer';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { Clear, Save } from '@material-ui/icons';
import { Checkbox } from 'src/web/components/forms-controls/checkbox';

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
  createPlanAsync: (model: PlanCreationModel) => Promise<boolean>;
  editPlanAsync: (id: string, model: PlanEditModel) => Promise<boolean>;
  getPlanAsync: (id: string) => Promise<PlanEditModel | undefined>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { createPlanAsync, editPlanAsync, getPlanAsync } = resolve(
    symbols.planUseCase,
  );
  return { createPlanAsync, editPlanAsync, getPlanAsync };
};
const getDefault: () => PlanEditModel = () => {
  return {
    name: '',
    isIncome: false,
    amount: 0,
    interval: 1,
  };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    resources,
    classes,
    id,
    getPlanAsync,
    editPlanAsync,
    createPlanAsync,
    history,
  } = createPropagationProps(props);
  const { root, btnRow, btn, progressContainer } = classes;
  const [model, setModel] = React.useState(getDefault());
  const {
    name: planName,
    isIncome,
    amount,
    interval,
    applyStartDate,
    applyEndDate,
  } = model;
  const resetById = async (tid: string) => {
    const newModel = await getPlanAsync(tid);
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
    setModel(getDefault());
  };
  const submit = async () => {
    const hasError = id
      ? await editPlanAsync(id, model)
      : await createPlanAsync(model);
    if (!hasError) {
      history.push(Url.plan);
    }
  };
  return id && !planName ? (
    <div className={progressContainer}>
      <CircularProgress />
    </div>
  ) : (
    <Container className={root}>
      <Form onSubmit={submit}>
        <Row>
          <Typography variant="h4">
            {id ? resources.planEdit : resources.planCreate}
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
        <Row>
          <TextBox
            value={planName}
            name="planName"
            label={resources.planName}
            onChange={handleChange}
            autoFocus={true}
          />
        </Row>
        <Row>
          <Checkbox
            value={isIncome}
            label={resources.isIncome}
            onChange={(e, v) => {
              setModel({ ...model, isIncome: v });
            }}
          />
        </Row>
        <Row>
          <TextBox
            value={amount}
            name="amount"
            label={resources.amount}
            onChange={handleChange}
            type="number"
          />
        </Row>
        <Row>
          <TextBox
            value={interval}
            name="interval"
            label={resources.intervalPerMonth}
            onChange={handleChange}
            type="number"
          />
        </Row>
        <Row>
          <TextBox
            value={applyStartDate}
            name="applyStartDate"
            label={resources.applyStartDate}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <TextBox
            value={applyEndDate}
            name="applyEndDate"
            label={resources.applyEndDate}
            onChange={handleChange}
          />
        </Row>
      </Form>
    </Container>
  );
};
const StyledInner = decorate(styles)(Inner);
export const PlanEdit = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
