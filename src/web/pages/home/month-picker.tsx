import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/models/location/resources';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/enterprise/stores/accounts/selectors';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { Localizer } from 'src/enterprise/models/location/localizer';
import { resolve } from 'src/application/use-cases/di/container';
import { symbols } from 'src/application/use-cases/di/symbols';
import { DashboardSelectors } from 'src/enterprise/stores/dashboard/selectors';
import { MonthPicker, MonthPickerModel } from 'src/web/components/forms-controls/month-picker';
import { connect } from 'react-redux';

interface Props {
  monthPicker?: MonthPickerModel;
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
  const { selectedMonth } = new DashboardSelectors(dashboard);
  const { localizer, selectableMonths } = new AccountsSelectors(accounts);
  return {
    localizer,
    history,
    monthPicker: { selectedMonth, selectableMonths },
  } as Props;
};
interface Events {
  onChange: (month?: Date) => void;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { getModelAsync } = resolve(symbols.dashboardUseCase);
  return {
    onChange: async month => await getModelAsync(month),
  };
};
export const DashboardMonthPicker = withRouter(
  connect(mapStateToProps, mapEventToProps)(MonthPicker),
);
