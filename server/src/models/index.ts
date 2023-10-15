

export interface PlayerGameStats {
  playerId: string;
  playerName: string;
  position: string;
  manager: string;
  passYards: number;
  passTouchdowns: number;
  interceptions: number;
  rushAttempts: number;
  rushYards: number;
  rushTouchdowns: number;
  receptions: number;
  receivingYards: number;
  receivingTouchdowns: number;
  returnYards: number;
  returnTouchdowns: number;
  fumbleTouchdowns: number;
  twoPoints: number;
  lostFumbles: number;
  totalPoints: number;
};

interface RushingStats {
  attempts: number;
  touchdowns: number;
  yards: number;
};

interface ReceivingStats {
  receptions: number;
  yards: number;
  touchdowns: number;
}

interface PassingStats {
  completions: number;
  yards: number;
  touchdowns: number;
  interceptions: number;
}

// interface FumbleStats {
//   fumbles: number;
// }
export interface GameStats {
  gameId: string;
  playerId: string;
  teamId: string;
  homeTeam: boolean;
  position: string;
  statistics: {
    rushing: RushingStats;
    receiving: ReceivingStats;
    passing: PassingStats;
    // fumbles: FumbleStats;
  };
}

export interface Player {
  id: string;
  name: string;
  jersey: string;
  teamId: string;
  position: string;
};
