export const createStrEnum = <T extends string>(o: Array<T>): {[K in T]: K} =>
  o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));

export const chipsLabel = {
  wildcard: 'WC',
  '3xc': 'TC',
  freehit: 'FH',
  bboost: 'BB',
};
