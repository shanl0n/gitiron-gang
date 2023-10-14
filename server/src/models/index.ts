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

export interface Player {
  id: string;
  name: string;
  jersey: string;
  last_name: string;
  first_name: string;
};

export interface GameStats {
  id: string;
  stastics: {
    home: {
      id: string;
      summary: {
        rushing
      }

    }
  }
};