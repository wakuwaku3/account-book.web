import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Checkbox,
  IconButton,
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
import { DashboardPlan } from 'src/enterprise/models/dashboard/dashboard-model';
import { Localizer } from 'src/enterprise/models/location/localizer';
import { Edit } from '@material-ui/icons';
import { Url } from 'src/infrastructures/routing/url';
import { DashboardSelectors } from 'src/enterprise/stores/dashboard/selectors';
import { TableCell } from 'src/web/components/table/table-cell';
import { connect } from 'react-redux';

const styles = createStyles({
  plansRoot: { width: '100%', overflow: 'auto' },
});
interface Props {
  resources: Resources;
  history: History;
  localizer: Localizer;
  plans: DashboardPlan[];
  selectedMonth?: Date;
  readonly: boolean;
  id?: string;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts, dashboard }, { history }) => {
  const { plans, selectedMonth, readonly, id } = new DashboardSelectors(
    dashboard,
  );
  const { resources, localizer } = new AccountsSelectors(accounts);
  return {
    resources,
    history,
    localizer,
    plans,
    selectedMonth,
    readonly,
    id,
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
    readonly,
    id,
  } = createPropagationProps(props);
  const { plansRoot } = classes;
  if (!plans || !selectedMonth) {
    return null;
  }
  return (
    <div className={plansRoot}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{resources.planName}</TableCell>
            <TableCell align="right">{resources.planAmount}</TableCell>
            <TableCell align="right">{resources.actualAmount}</TableCell>
            <TableCell align="center">{resources.entered}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.map(plan => (
            <TableRow key={plan.id}>
              <TableCell align="left">
                <IconButton
                  disabled={readonly}
                  color="primary"
                  onClick={() => {
                    history.push(
                      Url.getActualUrl({
                        actualId: plan.actualId,
                        dashboardId: id,
                        planId: plan.id,
                        month: selectedMonth,
                      }),
                    );
                  }}
                >
                  <Edit />
                </IconButton>
              </TableCell>
              <TableCell>{plan.name}</TableCell>
              <TableCell align="right">
                {localizer.formatMoney(plan.planAmount)}
              </TableCell>
              <TableCell align="right">
                {localizer.formatMoney(
                  plan.actualAmount ? plan.actualAmount : 0,
                )}
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={Boolean(plan.actualId)}
                  readOnly={true}
                  disableRipple={true}
                  disableTouchRipple={true}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
const StyledInner = decorate(styles)(Inner);
export const Plans = withRouter(
  connect(mapStateToProps, mapEventToProps)(StyledInner),
);
