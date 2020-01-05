import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  CircularProgress,
  Typography,
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
import { Url } from 'src/infrastructures/routing/url';
import { Form } from 'src/web/components/forms-controls/form';
import { Localizer } from 'src/enterprise/models/location/localizer';
import { Clear, Save, Sync } from '@material-ui/icons';
import { TextBox } from 'src/web/components/forms-controls/text-box';
import {
  ActualModel,
  ActualKey,
  ActualEditModel,
} from 'src/enterprise/models/actual/actual-model';
import { parse } from 'querystring';
import { connect } from 'react-redux';
import { actualUseCase } from 'src/application/use-cases/di/container';

const styles = createStyles({
  enter: { padding: 20, maxWidth: 1024, margin: 'auto' },
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
  qs: ActualKey;
}
interface Param {
  id: string;
  month: string;
}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history, match }) => {
  const qs = parse(
    window.location.search ? window.location.search.substring(1) : '',
  ) as ActualKey;
  if (qs.month) {
    qs.month = new Date(qs.month);
  }
  const { resources, localizer } = new AccountsSelectors(accounts);
  return { resources, localizer, history, qs };
};
interface Events {
  getActualAsync: (key: ActualKey) => Promise<ActualModel | undefined>;
  editActualAsync: (key: ActualKey, model: ActualEditModel) => Promise<boolean>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { getActualAsync, editActualAsync } = actualUseCase.value;
  return { getActualAsync, editActualAsync };
};
const getDefault: () => ActualModel = () => {
  return {
    planName: '',
    planAmount: 0,
  };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    resources,
    classes,
    qs,
    getActualAsync,
    editActualAsync,
    history,
    localizer,
  } = createPropagationProps(props);
  const { actualId, planId, dashboardId, month } = qs;
  const [model, setModel] = React.useState(getDefault());
  const { actualAmount, planAmount, planName: name } = model;
  const [loading, setLoading] = React.useState(true);
  const reset = React.useCallback(async () => {
    setLoading(true);
    try {
      const newModel = await getActualAsync({
        actualId,
        planId,
        dashboardId,
        month,
      });
      if (newModel) {
        setModel(newModel);
      }
    } finally {
      setLoading(false);
    }
  }, [getActualAsync, actualId, planId, dashboardId, month]);
  React.useEffect(() => {
    reset();
  }, [reset]);
  const submit = async () => {
    setLoading(true);
    try {
      const hasError = await editActualAsync(qs, {
        actualAmount: model.actualAmount ? model.actualAmount : 0,
      });
      if (!hasError) {
        history.push(Url.root);
      }
    } finally {
      setLoading(false);
    }
  };
  const copy = () => {
    setModel({ ...model, actualAmount: planAmount });
  };
  const { enter, progressContainer, btnRow, btn } = classes;
  return loading ? (
    <div className={progressContainer}>
      <CircularProgress />
    </div>
  ) : (
    <Container className={enter}>
      <Form onSubmit={submit}>
        <Row>
          <Typography variant="h4" color="textPrimary">
            {month
              ? `${resources.actualEnter} - ${localizer.formatMonth(
                  new Date(month),
                )}`
              : resources.actualEnter}
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
              type="button"
              color="primary"
              className={btn}
              onClick={copy}
            >
              <Sync />
              {resources.copy}
            </Button>
            <Button type="submit" color="primary" className={btn}>
              <Save />
              {resources.save}
            </Button>
          </div>
        </Row>
        <Row>
          <TextBox
            value={name}
            label={resources.planName}
            InputProps={{
              readOnly: true,
            }}
          />
        </Row>
        <Row>
          <TextBox
            value={planAmount}
            label={resources.planAmount}
            InputProps={{
              readOnly: true,
            }}
          />
        </Row>
        <Row>
          <TextBox
            type="number"
            value={
              actualAmount || actualAmount === 0 ? String(actualAmount) : ''
            }
            label={resources.actualAmount}
            onChange={e =>
              setModel({
                ...model,
                actualAmount: Number(e.currentTarget.value),
              })
            }
          />
        </Row>
      </Form>
    </Container>
  );
};
const StyledInner = decorate(styles)(Inner);
const ConnectedInner = connect(mapStateToProps, mapEventToProps)(StyledInner);
export const PlanEnter = withRouter(ConnectedInner);
