import { FumbleStats, PassingStats, ReceivingStats, RushingStats } from "../schema/types";

export interface GameStatsModel {
  gameId: string;
  playerId: string;
  teamId: string;
  homeTeam: boolean;
  position: string;
  statistics: {
    rushing?: RushingStats;
    receiving?: ReceivingStats;
    passing?: PassingStats;
    fumbles?: FumbleStats;
  };
}

export interface PlayerModel {
  id: string;
  name: string;
  jersey: string;
  team_id: string;
  position: string;
};

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  fantasyTeamId: string;
};

export interface FantasyTeamModel {
  id: string;
  name: string;
}

export interface FantasyTeamPlayerModel {
  playerId: string;
  fantasyTeamId: string;
}

export interface FantasyGameModel {
  id: string;
  seasonId: string;
  weekId: string;
  fantasyTeamIds: string[];
}