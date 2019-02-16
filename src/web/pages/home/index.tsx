import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography, Button } from '@material-ui/core';
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
import { Accordion } from 'src/web/components/layout/accordion';
import { DashboardShowState } from 'src/domains/models/home/dashboard-show-state';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { DashboardMonthPicker } from './month-picker';
import { Summary } from './summary';
import { Plans } from './plans';
import { DashboardSelectors } from 'src/infrastructures/stores/dashboard/selectors';

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
  selectedMonth?: string;
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
  } = new DashboardSelectors(dashboard);
  const { resources } = new AccountsSelectors(accounts);
  return {
    resources,
    history,
    showState,
    canApprove,
    canCancelApprove,
    selectedMonth,
  };
};
interface Events {
  setShowState: (showState: DashboardShowState) => void;
  getModelAsync: () => Promise<void>;
  approve: (selectedMonth: string) => void;
  cancelApprove: (selectedMonth: string) => void;
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
    approve: async selectedMonth => await approveAsync(selectedMonth),
    cancelApprove: async selectedMonth =>
      await cancelApproveAsync(selectedMonth),
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
              canApprove ? approve(selectedMonth) : cancelApprove(selectedMonth)
            }
            color="secondary"
          >
            {resources.approve}
          </Button>
        )}
        <DashboardMonthPicker />
      </Row>
      <Row>
        <Summary />
      </Row>
      {false && (
        <Row>
          <Accordion
            show={showGraph}
            subject={resources.graph}
            onChange={s => handleChange({ showGraph: s })}
          >
            {resources.change}
          </Accordion>
        </Row>
      )}
      <Row>
        <Accordion
          show={showPlans}
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
