import { FantasyTeamModel, PlayerModel, TradeStatus } from "../datasource/models";

export interface PaginationInput {
  page?: number;
  pageSize?: number;
}

export type PlayersInput = PaginationInput & {
  searchTerm?: string;
};

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

interface PageInfo {
  pageCount: number;
  currentPage: number;
  itemCount: number;
}

export interface Node {
  id: string;
}

export interface Connection<T extends Node> {
  pageInfo: PageInfo;
  nodes: T[];
}

export interface PlayerConnection extends Connection<Player> {
  nodes: Player[];
}

export type Player = Omit<PlayerModel, "team_id"> & {
  gameStatsSummary: GameStatsSummary;
  fantasyTeam?: FantasyTeam;
} & Node;

export type FantasyTeam = FantasyTeamModel & {
  players: Player[];
  totalPoints: number;
}

export interface FantasyGame {
  myTeam: FantasyTeam;
  opponentsTeam: FantasyTeam;
}

export interface PlayerTrade {
  sellPlayer: Player;
  buyPlayer: Player;
  status: TradeStatus;
}