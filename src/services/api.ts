import axiosInstance from '@utils/axiosInstance';
import axios from 'axios';
import {
  ClassicLeagueDelegate,
  FixturesRespDelegate,
  GWLiveDelegate,
  GWPicksDelegate,
  H2HStandingDelegate,
  PlayerSummaryDelegate,
  StaticDelegate,
  TransferDelegate,
  UserDelegate,
  UserHistoryDelegate,
} from 'src/types/api';

export const fetchBootstrapStatic = async () =>
  (await axiosInstance.get('/bootstrap-static/')).data as StaticDelegate;

export const fetchFixtures = async () =>
  (await axiosInstance.get('/fixtures/')).data as FixturesRespDelegate;

// elementId === playerId
export const fetchElementSummary = async (elementId: number) =>
  (await axiosInstance.get(`/element-summary/${elementId}/`))
    .data as PlayerSummaryDelegate;

// eventId === gameweek (1 - 38)
export const fetchEventLive = async (eventId: number) =>
  (await axiosInstance.get(`/event/${eventId}/live/`)).data as GWLiveDelegate;

export const fetchManager = async (teamId: number) =>
  (await axiosInstance.get(`/entry/${teamId}/`)).data as UserDelegate;

export const fetchManagerTransfers = async (teamId: number) =>
  (await axiosInstance.get(`/entry/${teamId}/transfers/`))
    .data as TransferDelegate[];

export const fetchManagerEventPicks = async (teamId: number, eventId: number) =>
  (await axiosInstance.get(`/entry/${teamId}/event/${eventId}/picks/`))
    .data as GWPicksDelegate;

export const fetchManagerHistory = async (teamId: number) =>
  (await axiosInstance.get(`/entry/${teamId}/history/`))
    .data as UserHistoryDelegate;

export const fetchLeagueStandingsC = async (leagueId: number) =>
  (await axiosInstance.get(`/leagues-classic/${leagueId}/standings/`))
    .data as ClassicLeagueDelegate;

export const fetchLeagueMatchesH = async (leagueId: number) =>
  (await axiosInstance.get(`/leagues-h2h-matches/league/${leagueId}/`))
    .data as H2HStandingDelegate;

export const fetchPlayerImage = async (
  playerCode: number,
  resolution: string,
) =>
  (
    await axios.get(
      `https://resources.premierleague.com/premierleague/photos/players/${
        resolution || '110x140'
      }/p${playerCode}.png`,
    )
  ).data;

export const fetchEventDreamTeam = async (eventId: number) =>
  (await axiosInstance.get(`/dream-team/${eventId}/`)).data;

export const fetchPieceNotes = async () =>
  (await axiosInstance.get('/team/set-piece-notes/')).data;

export const searchByTeamName = async (teamName: string) =>
  (
    await axios.get(
      `https://fontendfunctionsnortheuropenew.azurewebsites.net/api/SearchEntryFunction?teamName=${teamName}&teamNameBeginsWith=0&playerName=&playerNameBeginsWith=0`,
      {
        headers: {
          Functionkey: 'YOUR_FUNCTION_KEY',
        },
      },
    )
  ).data;
