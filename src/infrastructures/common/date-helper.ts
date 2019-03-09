export const now = () => new Date(Date.now());
export const fromUtc = (utcSeconds: number) => {
  const d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  return d;
};
