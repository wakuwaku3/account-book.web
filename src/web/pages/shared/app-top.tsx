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
import { StyledSFC } from 'src/infrastructures/styles/types';
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
import { resolve } from 'src/application/use-cases/di/di-container';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { Url } from 'src/infrastructures/routing/url';
import { RefElement } from 'src/web/components/types';

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
interface Props {
  resources: Resources;
  authenticated: boolean;
  history: History;
}
interface Events {
  signOut: () => void;
  handleOpenMenu: () => void;
}
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    authenticated,
    resources,
    signOut,
    classes,
    history,
  } = createPropagationProps(props);
  const [anchorEl, setAnchorEl] = React.useState<RefElement>(undefined);
  const { root, grow, subMenuAria } = classes;
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (func?: () => void) => () => {
    if (func) {
      func();
    }
    setAnchorEl(undefined);
  };

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
              onClick={handleMenu}
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
              onClose={handleClose()}
            >
              {/* <MenuItem onClick={handleClose()}>
                  {resources.profile}
                </MenuItem> */}
              <MenuItem onClick={handleClose(signOut)}>
                {resources.signOut}
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

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
