export class Localizer {
  public formatDate = (date: Date) =>
    `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  public formatMonth = (month: Date) =>
    `${month.getFullYear()}年${month.getMonth() + 1}月`;
  public formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
  public formatMoney = (money: number) => {
    return this.formatter.format(money);
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
