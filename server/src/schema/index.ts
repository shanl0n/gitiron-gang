export const typeDefs = `#graphql

  type Query {
    playerGameStats: [PlayerGameStats!]!
  }

  type PlayerGameStats {
    playerId: ID!
    playerName: String!
    position: String!
    manager: String!
    passYards: Int!
    passTouchdowns: Int!
    interceptions: Int!
    rushAttempts: Int!
    rushYards: Int!
    rushTouchdowns: Int!
    receptions: Int!
    receivingYards: Int!
    receivingTouchdowns: Int!
    returnYards: Int!
    returnTouchdowns: Int!
    fumbleTouchdowns: Int!
    twoPoints: Int!
    lostFumbles: Int!
    totalPoints: Float!
  }
`