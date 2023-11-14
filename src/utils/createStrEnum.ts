export const createStrEnum = <T extends string>(o: Array<T>): {[K in T]: K} =>
  o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));

export const chipsLabel = {
  wildcard: 'Wildcard',
  '3xc': 'Triple Captain',
  freehit: 'Free Hit',
  bboost: 'Bench Boost',
};

export const identifiersLabel = {
  goals_scored: 'Goals scored',
  assists: 'Assists',
  own_goals: 'Own goals',
  penalties_saved: 'Penalties saved',
  penalties_missed: 'Penalties missed',
  yellow_cards: 'Yellow cards',
  red_cards: 'Red cards',
  saves: 'Saves',
  bonus: 'Bonus',
  bps: 'Bonus Points System',
};
