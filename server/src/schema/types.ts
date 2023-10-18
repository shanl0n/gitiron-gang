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

interface Node<T> {
  id: string;
}

interface Edge<T> {
  cursor: string;
  node: Node<T>;
}

export interface Connection<T> {
  pageInfo: PageInfo;
  edges: Edge<T>[];
}

export interface PlayerConnection extends Connection<PlayerModel> {
  edges: PlayerEdge[];
}

interface PlayerEdge extends Edge<PlayerModel> {
  node: Player;
}

export type Player = Omit<PlayerModel, "team_id"> & {
  gameStatsSummary: GameStatsSummary;
  fantasyTeam?: FantasyTeam;
};

export type FantasyTeam = FantasyTeamModel & {
  players: Player[];
  totalPoints: number;
}

export interface FantasyGame {
  myTeam: FantasyTeam;
  opponentsTeam: FantasyTeam;
}