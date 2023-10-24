import React from 'react';
import ChevronCircleIcon from '@assets/svgs/ChevronCircleIcon';
import {colors} from '@constants/colors';

export const getRankIcon = (
  entryRank?: number | null,
  entryLastRank?: number | null,
) => {
  if (!entryRank || !entryLastRank) {
    return (
      <ChevronCircleIcon
        rotation="up"
        color={colors.transparent}
        arrowColor={colors.transparent}
      />
    );
  } else {
    if (entryRank === entryLastRank) {
      return (
        <ChevronCircleIcon
          rotation="up"
          color={colors.text}
          arrowColor={colors.text}
        />
      );
    } else if (entryRank < entryLastRank) {
      return (
        <ChevronCircleIcon
          rotation="up"
          color={colors.greenAlert}
          arrowColor={colors.textDark2}
        />
      );
    } else if (entryRank > entryLastRank) {
      return (
        <ChevronCircleIcon
          rotation="down"
          color={colors.redAlert}
          arrowColor={colors.purePrimary}
        />
      );
    }
  }
};
