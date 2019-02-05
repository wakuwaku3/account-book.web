import * as React from 'react';
import { AppRouter } from './app-router';
import { AppMessages } from './app-message';
import { createStyles } from '@material-ui/core';
import { Theme } from 'src/infrastructures/styles/theme';
import { decorate } from 'src/infrastructures/styles/styles-helper';

const styles = (theme: Theme) =>
  createStyles({
    toolbarDummy: theme.mixins.toolbar,
    container: {
      height: `calc(100% - ${56}px)`,
      alignSelf: 'center',
      [theme.breakpoints.up('sm')]: {
        height: `calc(100% - ${64}px)`,
      },
    },
  });
export const AppBody = decorate(styles)(({ classes }) => {
  return (
    <React.Fragment>
      <AppMessages />
      <div className={classes.toolbarDummy} />
      <div className={classes.container}>
        <AppRouter />
      </div>
    </React.Fragment>
  );
});
