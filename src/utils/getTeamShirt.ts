import Shirt1p1 from '@assets/images/shirt_1_1-110.webp';
import Shirt1 from '@assets/images/shirt_1-110.webp';
import Shirt3 from '@assets/images/shirt_3-110.webp';
import Shirt4p1 from '@assets/images/shirt_4_1-110.webp';
import Shirt4 from '@assets/images/shirt_4-110.webp';
import Shirt6 from '@assets/images/shirt_6-110.webp';
import Shirt7 from '@assets/images/shirt_7-110.webp';
import Shirt8p1 from '@assets/images/shirt_8_1-110.webp';
import Shirt8 from '@assets/images/shirt_8-110.webp';
import Shirt11 from '@assets/images/shirt_11-110.webp';
import Shirt14 from '@assets/images/shirt_14-110.webp';
import Shirt17p1 from '@assets/images/shirt_17_1-110.webp';
import Shirt17 from '@assets/images/shirt_17-110.webp';
import Shirt21p1 from '@assets/images/shirt_21_1-110.webp';
import Shirt21 from '@assets/images/shirt_21-110.webp';
import Shirt36 from '@assets/images/shirt_36-110.webp';
import Shirt39p1 from '@assets/images/shirt_39_1-110.webp';
import Shirt39 from '@assets/images/shirt_39-110.webp';
import Shirt43p1 from '@assets/images/shirt_43_1-110.webp';
import Shirt43 from '@assets/images/shirt_43-110.webp';
import Shirt49 from '@assets/images/shirt_49-110.webp';
import Shirt54 from '@assets/images/shirt_54-110.webp';
import Shirt90 from '@assets/images/shirt_90-110.webp';
import Shirt94p1 from '@assets/images/shirt_94_1-110.webp';
import Shirt94 from '@assets/images/shirt_94-110.webp';
import Shirt102 from '@assets/images/shirt_102-110.webp';

const shirtTeams = {
  '1p1': Shirt1p1,
  '1': Shirt1,
  '3': Shirt3,
  '4p1': Shirt4p1,
  '4': Shirt4,
  '6': Shirt6,
  '7': Shirt7,
  '8p1': Shirt8p1,
  '8': Shirt8,
  '11': Shirt11,
  '14': Shirt14,
  '17p1': Shirt17p1,
  '17': Shirt17,
  '21p1': Shirt21p1,
  '21': Shirt21,
  '36': Shirt36,
  '39p1': Shirt39p1,
  '39': Shirt39,
  '43p1': Shirt43p1,
  '43': Shirt43,
  '49': Shirt49,
  '54': Shirt54,
  '90': Shirt90,
  '94p1': Shirt94p1,
  '94': Shirt94,
  '102': Shirt102,
};

export const getTeamShirt = (team: number, elementType: number) => {
  const type = elementType === 1 ? `p${elementType}` : ''; // only for goalkeepers (elementType = 1), we add 'p1' to object key because GKPs have different shirts
  return shirtTeams?.[`${team}${type}` as keyof typeof shirtTeams];
};
