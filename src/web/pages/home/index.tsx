import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography, Button } from '@material-ui/core';
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
import { Accordion } from 'src/web/components/layout/accordion';
import { DashboardShowState } from 'src/enterprise/home/dashboard-show-state';
import { resolve } from 'src/application/use-cases/di/di-container';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { DashboardMonthPicker } from './month-picker';
import { Summary } from './summary';
import { Plans } from './plans';
import { DashboardSelectors } from 'src/adapter/stores/dashboard/selectors';
import { Chart } from './chart';

const styles = createStyles({
  root: { padding: 20 },
  subject: { paddingRight: 20 },
});
interface Props {
  resources: Resources;
  history: History;
  showState: DashboardShowState;
  canApprove: boolean;
  canCancelApprove: boolean;
  selectedMonth: Date;
  id: string;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts, dashboard }, { history }) => {
  const {
    showState,
    canApprove,
    canCancelApprove,
    selectedMonth,
    id,
  } = new DashboardSelectors(dashboard);
  const { resources } = new AccountsSelectors(accounts);
  return {
    resources,
    history,
    showState,
    canApprove,
    canCancelApprove,
    selectedMonth,
    id,
  };
};
interface Events {
  setShowState: (showState: DashboardShowState) => void;
  getModelAsync: () => Promise<void>;
  approve: (id: string, selectedMonth: Date) => void;
  cancelApprove: (id: string, selectedMonth: Date) => void;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const {
    setShowState,
    getModelAsync,
    approveAsync,
    cancelApproveAsync,
  } = resolve(symbols.dashboardUseCase);
  return {
    setShowState,
    getModelAsync,
    approve: async (id, selectedMonth) => await approveAsync(id, selectedMonth),
    cancelApprove: async (id, selectedMonth) =>
      await cancelApproveAsync(id, selectedMonth),
  };
};

const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    resources,
    classes,
    showState,
    canApprove,
    canCancelApprove,
    approve,
    cancelApprove,
    selectedMonth,
    setShowState,
    getModelAsync,
    id,
  } = createPropagationProps(props);
  const { showGraph, showPlans } = showState;
  const { root, subject } = classes;
  const handleChange = (newShowState: DashboardShowState) => {
    setShowState({ ...newShowState });
  };
  React.useEffect(() => {
    getModelAsync();
  }, []);
  return (
    <Container className={root}>
      <Row>
        <Typography variant="h4" className={subject}>
          {resources.dashboard}
        </Typography>
        {selectedMonth && (canApprove || canCancelApprove) && (
          <Button
            variant={canApprove ? 'contained' : 'outlined'}
            onClick={() =>
              canApprove
                ? approve(id, selectedMonth)
                : cancelApprove(id, selectedMonth)
            }
            color="secondary"
          >
            {canApprove ? resources.approve : resources.cancelApprove}
          </Button>
        )}
        <DashboardMonthPicker />
      </Row>
      <Row>
        <Summary />
      </Row>
      <Row>
        <Accordion
          defaultShow={showGraph}
          subject={resources.graph}
          onChange={s => handleChange({ showGraph: s })}
        >
          <Chart />
        </Accordion>
      </Row>
      <Row>
        <Accordion
          defaultShow={showPlans}
          subject={resources.plans}
          onChange={s => handleChange({ showPlans: s })}
        >
          <Plans />
        </Accordion>
      </Row>
    </Container>
  );
};

const StyledInner = decorate(styles)(Inner);
export const Dashboard = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
