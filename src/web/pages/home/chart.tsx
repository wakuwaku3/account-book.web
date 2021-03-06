import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles } from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/models/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { AccountsSelectors } from 'src/enterprise/stores/accounts/selectors';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { Localizer } from 'src/enterprise/models/location/localizer';
import { DashboardSelectors } from 'src/enterprise/stores/dashboard/selectors';
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
  Label,
} from 'recharts';
import { defaultThemeOption } from 'src/infrastructures/styles/theme';
import { DashboardDaily } from 'src/enterprise/models/dashboard/dashboard-model';
import { now } from 'src/infrastructures/helpers/date-helper';
import { connect } from 'react-redux';

const styles = createStyles({
  chart: { width: '100%', paddingTop: 20 },
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
> = ({ accounts, dashboard }, _) => {
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
const computeExpenseAverage = (daily: DashboardDaily[]) => {
  const n = now();
  const data = daily
    .filter(({ date }) => new Date(date) <= n)
    .map(({ expense }) => expense);
  const len = data.length;
  if (len === 0) {
    return undefined;
  }
  const sum = data.reduce((p, c) => p + c, 0);
  return Math.ceil(sum / len);
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { localizer, resources, classes, daily } = createPropagationProps(
    props,
  );
  const { chart, container } = classes;
  const data = daily.map(({ date, balance, income, expense }) => ({
    localizeDate: localizer.formatGraphDate(new Date(date)),
    [resources.balance]: balance,
    [resources.income]: income,
    [resources.expense]: expense,
  }));
  const expenseAverage = computeExpenseAverage(daily);

  const today = localizer.formatGraphDate(new Date(Date.now()));
  const {
    balanceColor,
    incomeColor,
    expenseColor,
    todayColor,
    zeroBorderColor,
    gridColor,
    averageBorderColor,
  } = defaultThemeOption.shared.chart;
  return (
    <div className={chart}>
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
            <ReferenceLine x={today} stroke={todayColor}>
              <Label value={resources.today} position="insideTop" />
            </ReferenceLine>
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
            <ReferenceLine x={today} stroke={todayColor}>
              <Label value={resources.today} position="insideTop" />
            </ReferenceLine>
            <ReferenceLine y={0} stroke={zeroBorderColor} />
            {expenseAverage && (
              <ReferenceLine y={expenseAverage} stroke={averageBorderColor}>
                <Label
                  value={resources.expenseAverage(expenseAverage)}
                  position="insideRight"
                />
              </ReferenceLine>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
const StyledInner = decorate(styles)(Inner);
export const Chart = withRouter(
  connect(mapStateToProps, mapEventToProps)(StyledInner),
);
