export const typeDefs = `#graphql
  type Query {
    players(input: PlayersInput): PlayerConnection!
    fantasyTeam: FantasyTeam!
    fantasyGame: FantasyGame!
  }

  input PlayersInput {
    first: Int
    last: Int
    afterCursor: String
    beforeCursor: String
  }

  type Mutation {
    addPlayer(id: ID!): Boolean!
    dropPlayer(id: ID!): Boolean!
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
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  interface Connection {
    pageInfo: PageInfo!
    edges: [Edge!]!
  }

  interface Edge {
    cursor: String!
    node: Node!
  }

  interface Node {
    id: ID!
  }

  type PlayerConnection implements Connection {
    pageInfo: PageInfo!
    edges: [PlayerEdge!]!
  }

  type PlayerEdge implements Edge {
    cursor: String!
    node: Player!
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
`;
