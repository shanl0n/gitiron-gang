export const typeDefs = `#graphql

  type Query {
    players: [Player!]!
    fantasyTeam: FantasyTeam!
  }

  type FantasyTeam {
    name: String!
    players: [Player!]!
  }

  type Mutation {
    addPlayer(id: ID!): Boolean!  
  }

  type Player {
    id: ID!
    name: String!
    position: String!
    gameStatsSummary: GameStatsSummary!
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
