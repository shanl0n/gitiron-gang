import { FantasyTeamModel, PlayerModel } from "../datasource/models";

export interface RushingStats {
  attempts: number;
  touchdowns: number;
  yards: number;
};

export interface ReceivingStats {
  receptions: number;
  yards: number;
  touchdowns: number;
}

export interface PassingStats {
  completions: number;
  yards: number;
  touchdowns: number;
  interceptions: number;
}

export interface FumbleStats {
  fumbles: number;
}

export interface GameStatsSummary{
  rushing: RushingStats;
  receiving: ReceivingStats;
  passing: PassingStats;
  fumbles: FumbleStats;
  totalPoints: number;
}

export type Player = Omit<PlayerModel, "team_id"> & {
  gameStatsSummary: GameStatsSummary;
  fantasyTeam?: FantasyTeam;
};

export type FantasyTeam = FantasyTeamModel & {
  players: Player[];
}

