import Team1 from '@assets/images/teams/t1.png';
import Team3 from '@assets/images/teams/t3.png';
import Team4 from '@assets/images/teams/t4.png';
import Team6 from '@assets/images/teams/t6.png';
import Team7 from '@assets/images/teams/t7.png';
import Team8 from '@assets/images/teams/t8.png';
import Team11 from '@assets/images/teams/t11.png';
import Team14 from '@assets/images/teams/t14.png';
import Team17 from '@assets/images/teams/t17.png';
import Team21 from '@assets/images/teams/t21.png';
import Team31 from '@assets/images/teams/t31.png';
import Team36 from '@assets/images/teams/t36.png';
import Team39 from '@assets/images/teams/t39.png';
import Team43 from '@assets/images/teams/t43.png';
import Team49 from '@assets/images/teams/t49.png';
import Team54 from '@assets/images/teams/t54.png';
import Team90 from '@assets/images/teams/t90.png';
import Team91 from '@assets/images/teams/t91.png';
import Team94 from '@assets/images/teams/t94.png';
import Team102 from '@assets/images/teams/t102.png';

const teamLogos = {
  1: Team1,
  3: Team3,
  4: Team4,
  6: Team6,
  7: Team7,
  8: Team8,
  11: Team11,
  14: Team14,
  17: Team17,
  21: Team21,
  31: Team31,
  36: Team36,
  39: Team39,
  43: Team43,
  49: Team49,
  54: Team54,
  90: Team90,
  91: Team91,
  94: Team94,
  102: Team102,
};

export const getTeamLogo = (team: number) =>
  teamLogos?.[team as keyof typeof teamLogos];
