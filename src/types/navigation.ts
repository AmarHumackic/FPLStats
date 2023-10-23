export type BottomTabProps = {
  TeamStack: TeamStackProps;
  LiveStack: LiveStackProps;
  StatsStack: StatsStackProps;
  LeaguesStack: LeaguesStackProps;
  ProfileStack: ProfileStackProps;
};

export type TeamStackProps = {
  Team: undefined;
};

export type LiveStackProps = {
  Live: undefined;
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
};

export type ProfileStackProps = {
  Profile: undefined;
};
