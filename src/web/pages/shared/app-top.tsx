import {
  createStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
} from '@material-ui/core';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { AccountCircle, Apps } from '@material-ui/icons';
import * as React from 'react';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { History } from 'history';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { Url } from 'src/infrastructures/routing/url';

const styles = createStyles({
  root: {
    position: 'absolute',
  },
  grow: {},
  subMenuAria: {
    flexGrow: 1,
    textAlign: 'right',
  },
});
interface State {
  anchorEl?: EventTarget & HTMLElement;
}
interface Props {
  resources: Resources;
  authenticated: boolean;
  history: History;
}
interface Events {
  signOut: () => void;
  handleOpenMenu: () => void;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public handleClose = (func?: () => void) => () => {
    if (func) {
      func();
    }
    this.setState({ anchorEl: undefined });
  };
  public render() {
    const {
      authenticated,
      resources,
      signOut,
      classes,
      history,
    } = createPropagationProps(this.props);
    const { anchorEl } = this.state;
    const { root, grow, subMenuAria } = classes;
    const open = Boolean(anchorEl);
    return (
      <AppBar position="static" className={root}>
        <Toolbar>
          <Button color="inherit" onClick={() => history.push(Url.root)}>
            <Apps style={{ marginRight: 5 }} />
            <Typography variant="h6" color="inherit" className={grow}>
              {resources.appName}
            </Typography>
          </Button>
          {authenticated && (
            <div className={subMenuAria}>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose()}
              >
                {/* <MenuItem onClick={this.handleClose()}>
                  {resources.profile}
                </MenuItem> */}
                <MenuItem onClick={this.handleClose(signOut)}>
                  {resources.signOut}
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps: StateMapperWithRouter<StoredState, Props> = (
  { accounts },
  { history },
) => {
  const { resources, authenticated } = new AccountsSelectors(accounts);
  return { resources, authenticated, history };
};
const mapEventToProps: EventMapper<Events> = () => {
  const { signOut } = resolve(symbols.accountsUseCase);
  return {
    signOut,
  };
};
const StyledInner = decorate(styles)(Inner);
export const AppTop = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
