import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles } from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { Localizer } from 'src/domains/common/location/localizer';
import { DashboardSelectors } from 'src/infrastructures/stores/dashboard/selectors';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  Bar,
  Legend,
  ReferenceLine,
  Area,
} from 'recharts';
import { defaultThemeOption } from 'src/infrastructures/styles/theme';
import { DashboardDaily } from 'src/domains/models/home/dashboard-model';

const styles = createStyles({
  root: { width: '100%', paddingTop: 20 },
  container: { width: '100%', height: 200, paddingTop: 20 },
});
interface Props {
  resources: Resources;
  localizer: Localizer;
  daily: DashboardDaily[];
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts, dashboard }, {}) => {
  const { daily } = new DashboardSelectors(dashboard);
  const { resources, localizer } = new AccountsSelectors(accounts);

  return {
    resources,
    localizer,
    daily,
  };
};
interface Events {}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  return {};
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { localizer, resources, classes, daily } = createPropagationProps(
    props,
  );
  const { root, container } = classes;
  const data = daily.map(({ date, balance, income, expense }) => ({
    localizeDate: localizer.formatGraphDate(new Date(date)),
    [resources.balance]: balance,
    [resources.income]: income,
    [resources.expense]: expense,
  }));
  const today = localizer.formatGraphDate(new Date(Date.now()));
  const {
    balanceColor,
    incomeColor,
    expenseColor,
    todayColor,
    zeroBorderColor,
    gridColor,
  } = defaultThemeOption.shared.chart;
  return (
    <div className={root}>
      <div className={container}>
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <Area
              type="monotone"
              dataKey={resources.balance}
              stroke={balanceColor}
            />
            <CartesianGrid stroke={gridColor} />
            <XAxis dataKey="localizeDate" />
            <YAxis />
            <Legend />
            <Tooltip />
            <ReferenceLine
              x={today}
              stroke={todayColor}
              label={resources.today}
            />
            <ReferenceLine y={0} stroke={zeroBorderColor} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className={container}>
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <Bar dataKey={resources.income} barSize={20} fill={incomeColor} />
            <Bar dataKey={resources.expense} barSize={20} fill={expenseColor} />
            <CartesianGrid stroke={gridColor} />
            <XAxis dataKey="localizeDate" />
            <YAxis />
            <Legend />
            <Tooltip />
            <ReferenceLine
              x={today}
              stroke={todayColor}
              label={resources.today}
            />
            <ReferenceLine y={0} stroke={zeroBorderColor} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
const StyledInner = decorate(styles)(Inner);
export const Chart = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
