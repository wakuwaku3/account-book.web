import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { Theme } from 'src/infrastructures/styles/theme';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { Accordion } from 'src/web/components/layout/accordion';
import { HomeIndexShowState } from 'src/domains/models/home/home-index-show-state';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';

const styles = (theme: Theme) =>
  createStyles({
    root: { padding: 20 },
  });
interface Props extends HomeIndexShowState {
  resources: Resources;
  history: History;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts, homeIndex }, { history }) => {
  const { showGraph, showPlans, showSummary } = homeIndex;
  const { resources } = new AccountsSelectors(accounts);
  return { resources, history, showGraph, showPlans, showSummary };
};
interface Events {
  setShowState: (showState: HomeIndexShowState) => void;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { setShowState } = resolve(symbols.homeIndexUseCase);
  return {
    setShowState,
  };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { resources, classes } = createPropagationProps(props);
  const { root } = classes;
  const { showGraph, showPlans, showSummary, setShowState } = props;
  const handleChange = (showState: HomeIndexShowState) => {
    setShowState({ showGraph, showPlans, showSummary, ...showState });
  };
  return (
    <Container className={root}>
      <Row>
        <Typography variant="h4">{resources.dashboard}</Typography>
      </Row>
      <Row>
        <Accordion
          show={showSummary}
          subject={resources.summary}
          onChange={s => handleChange({ showSummary: s })}
        >
          {resources.change}
        </Accordion>
      </Row>
      <Row>
        <Accordion
          show={showGraph}
          subject={resources.graph}
          onChange={s => handleChange({ showGraph: s })}
        >
          {resources.change}
        </Accordion>
      </Row>
      <Row>
        <Accordion
          show={showPlans}
          subject={resources.plans}
          onChange={s => handleChange({ showPlans: s })}
        >
          {resources.change}
        </Accordion>
      </Row>
    </Container>
  );
};
const StyledInner = decorate(styles)(Inner);
export const HomeIndex = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
