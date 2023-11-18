export type BottomTabProps = {
  TeamStack: TeamStackProps;
  FixturesStack: FixturesStackProps;
  StatsStack: StatsStackProps;
  LeaguesStack: LeaguesStackProps;
  ProfileStack: ProfileStackProps;
};

export type TeamStackProps = {
  Team: undefined;
  DreamTeam: undefined;
  Transfers: {
    teamId: number;
    teamName?: string;
  };
};

export type FixturesStackProps = {
  Fixtures: undefined;
};

export type StatsStackProps = {
  Stats: undefined;
};

export type LeaguesStackProps = {
  Leagues: undefined;
  LeagueDetails: {
    leagueId: number;
    leagueName: string;
    type: 'classic' | 'h2h';
  };
  Team: {
    teamId?: number;
  };
  DreamTeam: undefined;
  Transfers: {
    teamId: number;
    teamName?: string;
  };
};

export type ProfileStackProps = {
  Profile: undefined;
};
