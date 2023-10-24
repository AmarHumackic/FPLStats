import Shirt1 from '@assets/images/shirt_1-110.webp';
import Shirt3 from '@assets/images/shirt_3-110.webp';
import Shirt4 from '@assets/images/shirt_4-110.webp';
import Shirt6 from '@assets/images/shirt_6-110.webp';
import Shirt7 from '@assets/images/shirt_7-110.webp';
import Shirt11 from '@assets/images/shirt_11-110.webp';
import Shirt14 from '@assets/images/shirt_14-110.webp';
import Shirt211 from '@assets/images/shirt_21_1-110.webp';
import Shirt43 from '@assets/images/shirt_43-110.webp';
import Shirt941 from '@assets/images/shirt_94_1-110.webp';
import Shirt102 from '@assets/images/shirt_102-110.webp';

const shirtTeams = {
  1: Shirt1,
  3: Shirt3,
  4: Shirt4,
  6: Shirt6,
  7: Shirt7,
  11: Shirt11,
  14: Shirt14,
  211: Shirt211, // goalkeeper
  43: Shirt43,
  941: Shirt941, // goalkeeper
  102: Shirt102,
};

export const getTeamShirt = (team: number, elementType: number) =>
  shirtTeams?.[
    +`${team}${elementType === 1 ? elementType : ''}` as keyof typeof shirtTeams
  ];
