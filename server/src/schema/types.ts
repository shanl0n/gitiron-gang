import { FantasyTeamModel, PlayerModel } from "../datasource/models";

export interface PaginationInput {
  first: number;
  last: number;
  afterCursor: string;
  beforeCursor: string;
}

export type PlayersInput = PaginationInput;

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
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface Node {
  id: string;
}

export interface Edge<T extends Node> {
  cursor: string;
  node: T;
}

export interface Connection<T extends Node> {
  pageInfo: PageInfo;
  edges: Edge<T>[];
}

export interface PlayerConnection extends Connection<Player> {
  edges: PlayerEdge[];
}

interface PlayerEdge extends Edge<Player> {
  node: Player;
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