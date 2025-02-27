import { FumbleStats, PassingStats, ReceivingStats, RushingStats } from "../schema/types";

export interface GameStatsModel {
  id: string;
  summary: {
    week: {
      id: string;
    };
  };
  playerGameStats: PlayerGameStatsModel[];
}

export interface PlayerGameStatsModel {
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

export interface PlayerTradeModel {
  buyPlayerId: string;
  buyFantasyTeamId: string;
  sellPlayerId: string;
  sellFantasyTeamId: string;
  status: TradeStatus;
}

export enum TradeStatus {
  Pending = "PENDING",
  Accepted = "ACCEPTED",
  Rejected = "REJECTED",
  Cancelled = "CANCELLED"
}