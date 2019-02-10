import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  Typography,
  IconButton,
  Button,
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
import { Localizer } from 'src/domains/common/location/localizer';
import { DashboardMonthPicker } from 'src/domains/models/home/dashboard-model';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { DashboardSelectors } from 'src/infrastructures/stores/dashboard/selectors';

const styles = createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  btn: {
    minWidth: 130,
  },
});
interface Props {
  monthPicker?: DashboardMonthPicker;
  resources: Resources;
  localizer: Localizer;
  history: History;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts, dashboard }, { history }) => {
  const { monthPicker } = new DashboardSelectors(dashboard);
  const { localizer } = new AccountsSelectors(accounts);
  return {
    localizer,
    history,
    monthPicker,
  };
};
interface Events {
  getModelAsync: (month?: string) => Promise<void>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { getModelAsync } = resolve(symbols.dashboardUseCase);
  return {
    getModelAsync,
  };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    localizer,
    classes,
    monthPicker,
    getModelAsync,
  } = createPropagationProps(props);
  if (!monthPicker) {
    return null;
  }
  const { selectedMonth, selectableMonths } = monthPicker;
  const month = new Date(selectedMonth);
  const index = selectableMonths.indexOf(selectedMonth);
  const beforeDisabled = index <= 0;
  const nextDisabled = index >= selectableMonths.length - 1;
  const { root, btn } = classes;
  return (
    <div className={root}>
      <IconButton
        disabled={beforeDisabled}
        onClick={() => getModelAsync(selectableMonths[index - 1])}
      >
        <NavigateBefore />
      </IconButton>
      <Button className={btn} onClick={() => getModelAsync()}>
        <Typography variant="h6">{localizer.formatMonth(month)}</Typography>
      </Button>
      <IconButton
        disabled={nextDisabled}
        onClick={() => getModelAsync(selectableMonths[index + 1])}
      >
        <NavigateNext />
      </IconButton>
    </div>
  );
};
const StyledInner = decorate(styles)(Inner);
export const MonthPicker = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(StyledInner);
