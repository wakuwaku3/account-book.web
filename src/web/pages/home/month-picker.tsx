import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/location/resources';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { Localizer } from 'src/enterprise/location/localizer';
import { resolve } from 'src/application/use-cases/di/di-container';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { DashboardSelectors } from 'src/infrastructures/stores/dashboard/selectors';
import { MonthPicker } from 'src/web/components/forms-controls/month-picker';
import { MonthPickerModel } from 'src/enterprise/components/month-picker-model';

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
  };
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
export const DashboardMonthPicker = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(MonthPicker);
