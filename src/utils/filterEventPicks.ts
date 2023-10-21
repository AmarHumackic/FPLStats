import {
  GWLiveDelegate,
  PickDelegate,
  PlayerDelegate,
  PlayerEventLiveDelegate,
  PlayerPickEventLiveDelegate,
} from 'src/types/api';

export const filterEventPicks = (
  elements?: PlayerDelegate[],
  picks?: PickDelegate[],
  elementsLive?: GWLiveDelegate['elements'],
) => {
  if (
    !elements ||
    !elements.length ||
    !picks ||
    !picks.length ||
    !elementsLive ||
    !elementsLive.length
  ) {
    return {
      goalKeepersM: [],
      defendersM: [],
      midfieldersM: [],
      forwardersM: [],
      bench: [],
      eventPoints: 0,
    };
  }

  const captain = picks.find(p => p.is_captain);
  const hasCaptainPlayed =
    (
      elementsLive?.find(
        el => el.id === captain?.element,
      ) as GWLiveDelegate['elements'][0]
    )?.stats.minutes > 0;

  const eventPicks: PlayerPickEventLiveDelegate[] = picks.map(p => {
    const _element = elements.find(el => el.id === p.element) as PlayerDelegate;
    const _elementLive = elementsLive?.find(
      el => el.id === p.element,
    ) as GWLiveDelegate['elements'][0];
    _elementLive.stats.total_points = getEventPoints(
      p,
      _elementLive,
      // _element.team_code,
      // elements,
      // elementsLive,
      hasCaptainPlayed,
    );
    return {
      ..._element,
      ...p,
      ..._elementLive,
    };
  });

  const goalKeepersM = eventPicks.filter(
    p => p.element_type === 1 && p.multiplier,
  );
  const defendersM = eventPicks.filter(
    p => p.element_type === 2 && p.multiplier,
  );
  const midfieldersM = eventPicks.filter(
    p => p.element_type === 3 && p.multiplier,
  );
  const forwardersM = eventPicks.filter(
    p => p.element_type === 4 && p.multiplier,
  );
  const bench = eventPicks.filter(p => !p.multiplier);
  const eventPoints = eventPicks.reduce(
    (sum, item) => sum + item.stats.total_points,
    0,
  );

  return {
    goalKeepersM,
    defendersM,
    midfieldersM,
    forwardersM,
    bench,
    eventPoints,
  };
};

const getEventPoints = (
  elementPick: PickDelegate,
  elementLive: GWLiveDelegate['elements'][0],
  // elementTeamCode: number,
  // elements: PlayerDelegate[],
  // elementsLive: GWLiveDelegate['elements'],
  hasCaptainPlayed: boolean,
) => {
  // const bonus = getBonusLive(
  //   elementLive,
  //   elementTeamCode,
  //   elements,
  //   elementsLive,
  // );
  if (
    (elementPick.is_captain && hasCaptainPlayed) ||
    (elementPick.is_vice_captain && !hasCaptainPlayed)
  ) {
    return elementLive.stats.total_points * 2;
  } else {
    return elementLive.stats.total_points;
  }
};

const getBonusLive = (
  elementLive: GWLiveDelegate['elements'][0],
  elementTeamCode: number,
  elements: PlayerDelegate[],
  elementsLive: GWLiveDelegate['elements'],
) => {
  if (!elementLive.stats.bonus && elementLive.stats.bps) {
    const teamPlayers = elements
      .filter(el => el.team_code === elementTeamCode)
      .map(
        e =>
          ({
            ...e,
            ...elementsLive.find(el => el.id === e.id),
          } as PlayerEventLiveDelegate),
      );

    // add condition for if team is winning

    const [num3, num2, num1] = findTop3Bps(teamPlayers);

    let highestBpsPlayers: PlayerEventLiveDelegate[] = [],
      secondBpsPlayers: PlayerEventLiveDelegate[] = [],
      thirdBpsPlayers: PlayerEventLiveDelegate[] = [];
    highestBpsPlayers = teamPlayers.filter(tp => tp.stats.bps === num1);
    if (highestBpsPlayers.length === 2) {
      highestBpsPlayers = [highestBpsPlayers.shift()];
      secondBpsPlayers = highestBpsPlayers[1];
      thirdBpsPlayers = teamPlayers.filter();
    } else {
    }
  } else {
    return 0;
  }
};

const findTop3Bps = (teamPlayers: PlayerEventLiveDelegate[]) => {
  const bpsArray = teamPlayers.map(tp => tp.stats.bps);
  let num1 = Number.NEGATIVE_INFINITY;
  let num2 = Number.NEGATIVE_INFINITY;
  let num3 = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < bpsArray.length; i++) {
    if (bpsArray[i] > num1) {
      let temp1 = num1;
      let temp2 = num2;
      num1 = bpsArray[i];
      num2 = temp1;
      num3 = temp2;
    } else if (bpsArray[i] > num2) {
      let temp2 = num2;
      num2 = bpsArray[i];
      num3 = temp2;
    } else if (bpsArray[i] > num3) {
      num3 = bpsArray[i];
    }
  }

  return [num3, num2, num1];
};
