import { mockGameStats } from "../utils/mock"

export const resolvers = {
  Query:{
    playerGameStats: () => {
      return mockGameStats
    }
  },
  // Mutation: {
    
  // }
}