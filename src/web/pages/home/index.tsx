import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography, Button } from '@material-ui/core';
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
import { Accordion } from 'src/web/components/layout/accordion';
import { DashboardShowState } from 'src/enterprise/models/dashboard/dashboard-show-state';
import { DashboardMonthPicker } from './month-picker';
import { Summary } from './summary';
import { Plans } from './plans';
import { DashboardSelectors } from 'src/enterprise/stores/dashboard/selectors';
import { Chart } from './chart';
import { connect } from 'react-redux';
import { dashboardUseCase } from 'src/application/use-cases/di/container';

const styles = createStyles({
  homeIndex: { padding: 20 },
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
  } as Props;
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
  } = dashboardUseCase.value;
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
  const { homeIndex, subject } = classes;
  const handleChange = (newShowState: DashboardShowState) => {
    setShowState({ ...newShowState });
  };
  React.useEffect(() => {
    getModelAsync();
  }, [getModelAsync]);
  return (
    <Container className={homeIndex}>
      <Row>
        <Typography variant="h4" className={subject} color="textPrimary">
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
const ConnectedInner = connect(mapStateToProps, mapEventToProps)(StyledInner);
export const Dashboard = withRouter(ConnectedInner);
