import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  BottomNavigation,
  BottomNavigationAction,
  createMuiTheme,
} from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/models/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/enterprise/stores/accounts/selectors';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { List, Atm, CalendarToday } from '@material-ui/icons';
import { Url } from 'src/infrastructures/routing/url';
import { ThemeProvider } from 'src/web/components/styles/theme-provider';
import { ThemeOption } from 'src/infrastructures/styles/theme';
import { connect } from 'react-redux';

const styles = createStyles({
  root: {},
  dummy: { height: 56 },
});
interface Props {
  resources: Resources;
  history: History;
  authenticated: boolean;
  themeOption: ThemeOption;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts, theme }, { history }) => {
  const { resources, authenticated } = new AccountsSelectors(accounts);
  return { resources, authenticated, history, themeOption: theme };
};
interface Events {}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  return {};
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { themeOption } = props;
  const { resources, authenticated, classes, history } = createPropagationProps(
    props,
  );
  const { root, dummy } = classes;
  if (!authenticated) {
    return <div className={dummy} />;
  }
  const opt = { ...themeOption };
  if (themeOption.palette) {
    const type = themeOption.palette.type === 'dark' ? 'light' : 'dark';
    opt.palette = { ...themeOption.palette, type };
  }
  const theme = createMuiTheme(opt);
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};
const StyledInner = decorate(styles)(Inner);
const ConnectedInner = connect(mapStateToProps, mapEventToProps)(StyledInner);
export const AppFooter = withRouter(ConnectedInner);
