export const now = () => new Date(Date.now());
export const fromUtc = (utcSeconds: number) => {
  const d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  return d;
};
export const getMonthStartDay = (d: Date) => {
  return new Date(d.getFullYear(), d.getMonth(), 1);
};
export const addMonth = (d: Date, month: number) => {
  const d2 = new Date(d);
  d2.setMonth(d2.getMonth() + month);
  return d2;
};
