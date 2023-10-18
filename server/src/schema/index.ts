export const typeDefs = `#graphql
  type Query {
    players(input: PlayersInput): PlayerConnection!
    fantasyTeam: FantasyTeam!
    fantasyGame: FantasyGame!
    playerTrades: [PlayerTrade!]!
  }

  type Mutation {
    addPlayer(id: ID!): Boolean!
    dropPlayer(id: ID!): Boolean!
    tradePlayer(sellPlayerId: ID!, buyPlayerId: ID!): Boolean
    updateTrade(id: ID!, status: TradeStatus!): Boolean
  }


  input PlayersInput {
    page: Int
    pageSize: Int
    searchTerm: String
  }

  type FantasyTeam {
    id: String!
    name: String!
    players: [Player!]!
    totalPoints: Float!
  }

  type FantasyGame {
    myTeam: FantasyTeam!
    opponentsTeam: FantasyTeam!
  }

  type PageInfo {
    itemCount: Int!
    pageCount: Int!
    currentPage: Int!
  }

  interface Connection {
    pageInfo: PageInfo!
    nodes: [Node!]!
  }
  interface Node {
    id: ID!
  }

  type PlayerConnection implements Connection {
    pageInfo: PageInfo!
    nodes: [Player!]!
  }

  type Player implements Node {
    id: ID!
    name: String!
    position: String!
    gameStatsSummary: GameStatsSummary!
    fantasyTeam: FantasyTeam
  }

  type GameStatsSummary {
    rushing: RushingStats!
    receiving: ReceivingStats!
    passing: PassingStats!
    fumbles: FumbleStats!
    totalPoints: Float!
  }

  type RushingStats {
    attempts: Int!
    touchdowns: Int! 
    yards: Int!
  }
  
  type ReceivingStats {
    receptions: Int!
    yards: Int!
    touchdowns: Int!
  }
  
  type PassingStats {
    completions: Int!
    yards: Int!
    touchdowns: Int!
    interceptions: Int!
  }
  
  type FumbleStats {
    fumbles: Int!
  }

  enum TradeStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    CANCELLED
  }

  type PlayerTrade {
    id: ID!
    sellPlayer: Player!
    buyPlayer: Player!
    status: TradeStatus
  }
`;
