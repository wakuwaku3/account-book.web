import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { Localizer } from 'src/domains/common/location/localizer';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { MonthPicker } from 'src/web/components/forms-controls/month-picker';
import { MonthPickerModel } from 'src/domains/models/common/month-picker-model';
import { TransactionSelectors } from 'src/infrastructures/stores/transaction/selectors';

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
> = ({ accounts, transaction }, { history }) => {
  const { monthPicker } = new TransactionSelectors(transaction);
  const { localizer } = new AccountsSelectors(accounts);
  return {
    localizer,
    history,
    monthPicker,
  };
};
interface Events {
  onChange: (month?: string) => void;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { getModelAsync } = resolve(symbols.dashboardUseCase);
  return {
    onChange: async month => await getModelAsync(month),
  };
};
export const TransactionMonthPicker = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(MonthPicker);
