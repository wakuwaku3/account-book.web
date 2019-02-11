import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
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
import { DashboardPlan } from 'src/domains/models/home/dashboard-model';
import { Localizer } from 'src/domains/common/location/localizer';
import { Edit } from '@material-ui/icons';
import { Url } from 'src/infrastructures/routing/url';
import { DashboardSelectors } from 'src/infrastructures/stores/dashboard/selectors';

const styles = createStyles({
  root: { width: '100%', overflow: 'auto' },
});
interface Props {
  resources: Resources;
  history: History;
  localizer: Localizer;
  plans: DashboardPlan[];
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
  const { plans, selectedMonth } = new DashboardSelectors(dashboard);
  const { resources, localizer } = new AccountsSelectors(accounts);
  return {
    resources,
    history,
    localizer,
    plans,
    selectedMonth,
  };
};
interface Events {}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  return {};
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    resources,
    classes,
    plans,
    localizer,
    history,
    selectedMonth,
  } = createPropagationProps(props);
  const { root } = classes;
  if (!plans || !selectedMonth) {
    return null;
  }
  return (
    <div className={root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{resources.planName}</TableCell>
            <TableCell align="right">{resources.planAmount}</TableCell>
            <TableCell align="right">{resources.actualAmount}</TableCell>
            <TableCell align="right">{resources.entered}</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.map(plan => (
            <TableRow key={plan.id}>
              <TableCell component="th" scope="row">
                {plan.name}
              </TableCell>
              <TableCell align="right">
                {localizer.formatMoney(plan.planAmount)}
              </TableCell>
              <TableCell align="right">
                {localizer.formatMoney(
                  plan.actualAmount ? plan.actualAmount : 0,
                )}
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  checked={
                    Boolean(plan.actualAmount) || plan.actualAmount === 0
                  }
                  readOnly={true}
                  disableRipple={true}
                  disableTouchRipple={true}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    history.push(Url.getPlanEnterUrl(plan.id, selectedMonth));
                  }}
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
const StyledInner = decorate(styles)(Inner);
export const Plans = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);