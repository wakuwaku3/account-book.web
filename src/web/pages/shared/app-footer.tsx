import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { List, Atm, CalendarToday } from '@material-ui/icons';
import { Url } from 'src/infrastructures/routing/url';

const styles = createStyles({
  root: {},
  dummy: { height: 56 },
});
interface Props {
  resources: Resources;
  history: History;
  authenticated: boolean;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history }) => {
  const { resources, authenticated } = new AccountsSelectors(accounts);
  return { resources, authenticated, history };
};
interface Events {}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  return {};
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { resources, authenticated, classes, history } = createPropagationProps(
    props,
  );
  const { root, dummy } = classes;
  if (!authenticated) {
    return <div className={dummy} />;
  }
  return (
    <BottomNavigation showLabels={true} className={root}>
      <BottomNavigationAction
        label={resources.input}
        icon={<Atm />}
        onClick={() => history.push(Url.transactionCreate)}
      />
      <BottomNavigationAction
        label={resources.list}
        icon={<List />}
        onClick={() => history.push(Url.transaction)}
      />
      <BottomNavigationAction
        label={resources.plans}
        icon={<CalendarToday />}
        onClick={() => history.push(Url.plan)}
      />
    </BottomNavigation>
  );
};
const StyledInner = decorate(styles)(Inner);
export const AppFooter = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
