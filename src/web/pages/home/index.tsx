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
import { Accordion } from 'src/web/components/layout/accordion';
import { DashboardShowState } from 'src/domains/models/home/dashboard-show-state';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { MonthPicker } from './month-picker';
import { Summary } from './summary';
import { Plans } from './plans';

const styles = createStyles({
  root: { padding: 20 },
});
interface Props {
  resources: Resources;
  history: History;
  showState: DashboardShowState;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts, dashboard }, { history }) => {
  const { showState } = dashboard;
  const { resources } = new AccountsSelectors(accounts);
  return { resources, history, showState };
};
interface Events {
  setShowState: (showState: DashboardShowState) => void;
  getModelAsync: () => Promise<void>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { setShowState, getModelAsync } = resolve(symbols.dashboardUseCase);
  return {
    setShowState,
    getModelAsync,
  };
};
interface State {}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
  }
  public async componentDidMount() {
    const { getModelAsync } = this.props;
    await getModelAsync();
  }
  private handleChange = (newShowState: DashboardShowState) => {
    const { setShowState } = this.props;
    setShowState({ ...newShowState });
  };
  public render() {
    const { resources, classes, showState } = createPropagationProps(
      this.props,
    );
    const { showGraph, showPlans } = showState;
    const { root } = classes;
    return (
      <Container className={root}>
        <Row>
          <Typography variant="h4">{resources.dashboard}</Typography>
          <MonthPicker />
        </Row>
        <Row>
          <Summary />
        </Row>
        {false && (
          <Row>
            <Accordion
              show={showGraph}
              subject={resources.graph}
              onChange={s => this.handleChange({ showGraph: s })}
            >
              {resources.change}
            </Accordion>
          </Row>
        )}
        <Row>
          <Accordion
            show={showPlans}
            subject={resources.plans}
            onChange={s => this.handleChange({ showPlans: s })}
          >
            <Plans/>
          </Accordion>
        </Row>
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const Dashboard = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
