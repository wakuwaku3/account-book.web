import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles } from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/models/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/enterprise/stores/accounts/selectors';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { DashboardSummary } from 'src/enterprise/models/dashboard/dashboard-model';
import { Localizer } from 'src/enterprise/models/location/localizer';
import { Amount } from './amount';
import { DashboardSelectors } from 'src/enterprise/stores/dashboard/selectors';
import { connect } from 'react-redux';

const styles = createStyles({
  summaryRoot: {
    display: 'flex',
    padding: 5,
    flexWrap: 'wrap',
  },
});
interface Props {
  summary?: DashboardSummary;
  localizer: Localizer;
  resources: Resources;
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
  const { summary } = new DashboardSelectors(dashboard);
  const { resources, localizer } = new AccountsSelectors(accounts);
  return {
    resources,
    localizer,
    history,
    summary,
  };
};
interface Events {}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  return {};
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { resources, classes, summary, localizer } = createPropagationProps(
    props,
  );
  if (!summary) {
    return null;
  }
  const { summaryRoot } = classes;
  const { income, expense, previousBalance } = summary;
  const currentBalance = income - expense;
  const balance = currentBalance + (previousBalance ? previousBalance : 0);
  return (
    <div className={summaryRoot}>
      <Amount
        name={resources.income}
        amount={income}
        isIncome={true}
        localizer={localizer}
      />
      <Amount
        name={resources.expense}
        amount={expense}
        isIncome={false}
        localizer={localizer}
      />
      <Amount
        name={resources.currentBalance}
        amount={currentBalance}
        isIncome={true}
        localizer={localizer}
      />
      {(previousBalance || previousBalance === 0) && (
        <Amount
          name={resources.previousBalance}
          amount={previousBalance}
          isIncome={true}
          localizer={localizer}
        />
      )}
      <Amount
        name={resources.balance}
        amount={balance}
        isIncome={true}
        localizer={localizer}
      />
    </div>
  );
};
const StyledInner = decorate(styles)(Inner);
export const Summary = withRouter(
  connect(mapStateToProps, mapEventToProps)(StyledInner),
);
