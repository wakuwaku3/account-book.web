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
import { MonthPicker } from 'src/web/components/forms-controls/month-picker';
import { MonthPickerModel } from 'src/enterprise/components/month-picker-model';
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
  const { selectedMonth } = new TransactionSelectors(transaction);
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
  const { loadAsync } = resolve(symbols.transactionUseCase);
  return {
    onChange: async month => await loadAsync(month),
  };
};
export const TransactionMonthPicker = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(MonthPicker);
