
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
export interface GameStats {
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

export interface GameStatsSummary{
  rushing: RushingStats;
  receiving: ReceivingStats;
  passing: PassingStats;
  fumbles: FumbleStats;
  totalPoints: number;
}

export interface Player {
  id: string;
  name: string;
  jersey: string;
  team_id: string;
  position: string;
  gameStatsSummary: GameStatsSummary;
};

export interface User {
  id: number;
  name: string;
  email: string;
  fantasy_team_id: number;
};
