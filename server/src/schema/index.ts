export const typeDefs = `#graphql

  type Query {
    players: [Player!]!
    fantasyTeam: FantasyTeam!
  }

  type Mutation {
    addPlayer(id: ID!): Boolean!
    dropPlayer(id: ID!): Boolean!
  }

  type FantasyTeam {
    id: String!
    name: String!
    players: [Player!]!
  }



  type Player {
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
