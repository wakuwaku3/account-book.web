import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  Typography,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/location/resources';
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
} from 'src/enterprise/plan/plan-model';
import { Form } from 'src/web/components/forms-controls/form';
import { Url } from 'src/infrastructures/routing/url';
import { Localizer } from 'src/enterprise/location/localizer';
import { resolve } from 'src/application/use-cases/di/di-container';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { Clear, Save } from '@material-ui/icons';
import { Checkbox } from 'src/web/components/forms-controls/checkbox';
import { DatePicker } from 'src/web/components/forms-controls/date-picker';
import { now } from 'src/infrastructures/common/date-helper';

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
    start: now().toISOString(),
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
    localizer,
  } = createPropagationProps(props);
  const { root, btnRow, btn, progressContainer } = classes;
  const [model, setModel] = React.useState(getDefault());
  const { name: planName, isIncome, amount, interval, start, end } = model;
  const resetById = async (tid: string) => {
    const newModel = await getPlanAsync(tid);
    if (newModel) {
      setModel(newModel);
    }
  };
  React.useEffect(() => {
    reset();
  }, [id]);
  const handleChange = <K extends keyof PlanEditModel>(
    key: K,
    valueSelector?: (v: string) => PlanEditModel[K],
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setModel({
      ...model,
      [key]: valueSelector ? valueSelector(value) : (value as PlanEditModel[K]),
    });
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

  const disableSubmit =
    !(amount || amount === 0) ||
    !planName ||
    !(interval || interval > 0) ||
    Boolean(start && end && new Date(start) > new Date(end));

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
        <Row>
          <TextBox
            value={planName}
            label={resources.planName}
            onChange={handleChange('name')}
            autoFocus={true}
            required={true}
          />
        </Row>
        <Row>
          <Checkbox
            value={String(isIncome)}
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
            onChange={handleChange('amount', v => Number(v))}
            type="number"
            required={true}
          />
        </Row>
        <Row>
          <TextBox
            value={interval}
            name="interval"
            label={resources.intervalPerMonth}
            onChange={handleChange('interval', v => Number(v))}
            type="number"
            required={true}
          />
        </Row>
        <Row>
          <DatePicker
            localizer={localizer}
            value={start ? new Date(start) : null}
            label={resources.applyStartDate}
            onChange={date => {
              setModel({ ...model, start: date });
            }}
          />
        </Row>
        <Row>
          <DatePicker
            localizer={localizer}
            value={end ? new Date(end) : null}
            label={resources.applyEndDate}
            onChange={date => {
              setModel({ ...model, end: date });
            }}
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
