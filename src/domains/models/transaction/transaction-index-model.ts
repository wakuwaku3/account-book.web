import { MonthPickerModel } from 'src/domains/models/common/month-picker-model';
import { TransactionItem } from 'src/domains/models/transaction/transaction-item';
export interface TransactionModel {
  monthPicker: MonthPickerModel;
  editable: boolean;
  items: TransactionItem[];
}
