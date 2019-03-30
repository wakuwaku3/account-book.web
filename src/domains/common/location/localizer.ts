import { ja } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/esm/format';

class JaLocalizedUtils extends DateFnsUtils {
  public getDatePickerHeaderText(date: Date) {
    return format(date, 'MMM', { locale: this.locale });
  }
  public getCalendarHeaderText(date: Date) {
    return format(date, 'yyyy/MM', { locale: this.locale });
  }
}
const paddingZero = (val: number) => String(val).padStart(2, '0');
export class Localizer {
  public formatDate = (date: Date) =>
    `${date.getFullYear()}/${paddingZero(date.getMonth() + 1)}/${paddingZero(
      date.getDate(),
    )}`;
  public formatDateTime = (date: Date) =>
    `${date.getFullYear()}/${paddingZero(date.getMonth() + 1)}/${paddingZero(
      date.getDate(),
    )} ${paddingZero(date.getHours())}:${paddingZero(
      date.getMinutes(),
    )}:${paddingZero(date.getSeconds())}`;
  public formatMonth = (month: Date) =>
    `${month.getFullYear()}年${month.getMonth() + 1}月`;
  public formatInterval = (month: number) => {
    const year = Math.floor(month / 12);
    const m = month % 12;
    if (year > 0 && m > 0) {
      return `${year}年${m}ヶ月ごと`;
    }
    if (year > 0 && m === 0) {
      return `${year}年ごと`;
    }
    if (year === 0 && m > 0) {
      return `${m}ヶ月ごと`;
    }
    return '';
  };
  public formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
  public formatMoney = (money: number) => {
    return this.formatter.format(money);
  };
  public datePicker = {
    locale: ja,
    localizedUtils: JaLocalizedUtils,
    datePlaceholder: 'yyyy/MM/dd',
    mask: [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/],
  };
  public formatGraphDate = (date: Date) =>
    `${date.getMonth() + 1}/${date.getDate()}(${this.dayMap[date.getDay()]})`;
  private dayMap = {
    0: '日',
    1: '月',
    2: '火',
    3: '水',
    4: '木',
    5: '金',
    6: '土',
  };
}
export class LocalizerEn extends Localizer {
  public formatMonth = (month: Date) =>
    `${month.getMonth() + 1}/${month.getFullYear()}`;
  public formatter = new Intl.NumberFormat('us-EN', {
    style: 'currency',
    currency: 'JPY',
  });
}
