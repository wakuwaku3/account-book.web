import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/models/location/resources';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/enterprise/stores/accounts/selectors';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { Localizer } from 'src/enterprise/models/location/localizer';
import {
  MonthPicker,
  MonthPickerModel,
} from 'src/web/components/forms-controls/month-picker';
import { TransactionSelectors } from 'src/enterprise/stores/transaction/selectors';
import { connect } from 'react-redux';
import { transactionUseCase } from 'src/application/use-cases/di/container';

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
  } as Props;
};
interface Events {
  onChange: (month?: Date) => void;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { loadAsync } = transactionUseCase.value;
  return {
    onChange: async month => await loadAsync(month),
  };
};
export const TransactionMonthPicker = withRouter(
  connect(mapStateToProps, mapEventToProps)(MonthPicker),
);
