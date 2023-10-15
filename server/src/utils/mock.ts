import { GameStats, Player, PlayerGameStats } from "../models";

export const emptyPlayerGameStats: PlayerGameStats = {
  playerId: "",
  playerName: "",
  position: "",
  manager: "",
  passYards: 0,
  passTouchdowns: 0,
  interceptions: 0,
  rushAttempts: 0,
  rushYards: 0,
  rushTouchdowns: 0,
  receptions: 0,
  receivingYards: 0,
  receivingTouchdowns: 0,
  returnYards: 0,
  returnTouchdowns: 0,
  fumbleTouchdowns: 0,
  twoPoints: 0,
  lostFumbles: 0,
  totalPoints: 0,
}

export const mockGameStats: PlayerGameStats[] = [
  {
    playerId: "player1",
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
    playerId: "player2",
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

export const mockPlayers: Player[] = [
  {
    id: "player1",
    name: "Patrick Mahomes",
    jersey: "15",
    teamId: "team1",
    position: "QB",
  },
  {
    id: "player2",
    name: "Clyde Edwards-Helaire",
    jersey: "25",
    teamId: "team2",
    position: "WR",
  }
]

export const mockHardGameStats: GameStats[] = [
  {
    gameId: "game1",
    playerId: "player1",
    teamId: "team1",
    homeTeam: true,
    position: "QB",
    statistics: {
      passing: {
        yards: 236,
        touchdowns: 3,
        interceptions: 0,
        completions: 21,
      },
      rushing: {
        attempts: 2,
        yards: 3,
        touchdowns: 1,
      },
      receiving: {
        receptions: 0,
        yards: 0,
        touchdowns: 0,
      },
    }
  },
  {
    gameId: "game1",
    playerId: "player2",
    teamId: "team2",
    homeTeam: false,
    position: "WR",
    statistics: {
      passing: {
        yards: 0,
        touchdowns: 0,
        interceptions: 0,
        completions: 0,
      },
      rushing: {
        attempts: 0,
        yards: 0,
        touchdowns: 0,
      },
      receiving: {
        receptions: 4,
        yards: 35,
        touchdowns: 1,
      },
    }
  },
  {
    gameId: "game2",
    playerId: "player1",
    teamId: "team1",
    homeTeam: false,
    position: "QB",
    statistics: {
      passing: {
        yards: 236,
        touchdowns: 3,
        interceptions: 0,
        completions: 21,
      },
      rushing: {
        attempts: 2,
        yards: 3,
        touchdowns: 1,
      },
      receiving: {
        receptions: 0,
        yards: 0,
        touchdowns: 0,
      },
    }
  },
  {
    gameId: "game2",
    playerId: "player2",
    teamId: "team2",
    homeTeam: true,
    position: "QB",
    statistics: {
      passing: {
        yards: 0,
        touchdowns: 0,
        interceptions: 0,
        completions: 0,
      },
      rushing: {
        attempts: 0,
        yards: 0,
        touchdowns: 0,
      },
      receiving: {
        receptions: 4,
        yards: 35,
        touchdowns: 1,
      },
    }
  }
]