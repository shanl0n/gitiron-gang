interface PlayerGameStats {
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
}

export const mockGameStats: PlayerGameStats[] = [
  {
    playerName: "Jared Goff",
    position: "QB",
    manager: "Sean",
    passYards: 236,
    passTouchdowns: 3,
    interceptions: 0,
    rushAttempts: 2,
    rushYards: 0,
    rushTouchdowns: 1,
    receptions: 0,
    receivingYards: 0,
    receivingTouchdowns: 0,
    returnYards: 0,
    returnTouchdowns: 0,
    fumbleTouchdowns: 0,
    twoPoints: 0,
    lostFumbles: 0,
    totalPoints: 36.0,
  },
  {
    playerName: "Tony Pollard",
    position: "RB",
    manager: "Sean",
    passYards: 0,
    passTouchdowns: 0,
    interceptions: 0,
    rushAttempts: 8,
    rushYards: 29,
    rushTouchdowns: 0,
    receptions:4,
    receivingYards: 35,
    receivingTouchdowns: 0,
    returnYards: 0,
    returnTouchdowns: 0,
    fumbleTouchdowns: 0,
    twoPoints: 0,
    lostFumbles: 1,
    totalPoints: 8.2
  },
];
