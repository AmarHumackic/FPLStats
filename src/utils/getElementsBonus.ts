import {
  FixtureDelegate,
  GWLiveDelegate,
  PlayerIdBonus,
  PlayerIdBps,
} from 'src/types/api';

export const getElementsBonus = (
  fixtureDelegate?: FixtureDelegate[],
  elementsLive?: GWLiveDelegate['elements'],
  event?: number,
) => {
  if (!fixtureDelegate?.length || !elementsLive?.length || !event) {
    return [];
  }

  const elementsBonus: PlayerIdBonus[] = [];

  const eventFixtures = fixtureDelegate.filter(f => f.event === event);

  for (let index = 0; index < eventFixtures.length; index++) {
    const f = eventFixtures[index];

    const fixtureElementsLive = elementsLive.filter(
      el =>
        [...el.explain.map(exp => exp.fixture)].includes(f.id) &&
        el.stats.minutes,
    );

    const [bps1, bps2, bps3] = getTop3Bps(fixtureElementsLive);

    //#region Bonus point ties are resolved as follows:
    // - If there is a tie for first place, Players 1 & 2 will receive 3 points each and Player 3 will receive 1 point.
    // - If there is a tie for second place, Player 1 will receive 3 points and Players 2 and 3 will receive 2 points each.
    // - If there is a tie for third place, Player 1 will receive 3 points, Player 2 will receive 2 points and Players 3 & 4 will receive 1 point each.
    //#endregion

    elementsBonus.push(...bps1.map(b => ({id: b.id, bonus: 3}))); // add players with 3 pts of bonus

    if (bps1.length === 1) {
      elementsBonus.push(...bps2.map(b => ({id: b.id, bonus: 2}))); // add players with 2 pts of bonus
    } else {
      elementsBonus.push(...bps2.map(b => ({id: b.id, bonus: 1}))); // add players with 1 pt of bonus because there is more than 1 player which got 3 pts of bonus
      continue;
    }

    if (bps1.length === 1 && bps2.length === 1) {
      elementsBonus.push(...bps3.map(b => ({id: b.id, bonus: 1}))); // add players with 1 pt of bonus, only in case there is only 1 player which got 3 pts and only 1 player which got 2 pts
    }
  }

  return elementsBonus;
};

const getTop3Bps = (fixtureElementsLive: GWLiveDelegate['elements']) => {
  const bpsArray: PlayerIdBps[] = fixtureElementsLive.map(fel => ({
    id: fel.id,
    bps: fel.stats.bps,
  }));

  let num1 = Number.NEGATIVE_INFINITY;
  let num2 = Number.NEGATIVE_INFINITY;
  let num3 = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < bpsArray.length; i++) {
    if (bpsArray[i].bps > num1) {
      let temp1 = num1;
      let temp2 = num2;
      num1 = bpsArray[i].bps;
      num2 = temp1;
      num3 = temp2;
    } else if (bpsArray[i].bps > num2) {
      let temp2 = num2;
      num2 = bpsArray[i].bps;
      num3 = temp2;
    } else if (bpsArray[i].bps > num3) {
      num3 = bpsArray[i].bps;
    }
  }

  const bps1: PlayerIdBps[] = bpsArray.filter(el => el.bps === num1);
  const bps2: PlayerIdBps[] = bpsArray.filter(el => el.bps === num2);
  const bps3: PlayerIdBps[] = bpsArray.filter(el => el.bps === num3);

  return [bps1, bps2, bps3];
};
