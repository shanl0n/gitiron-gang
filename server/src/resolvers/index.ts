import { mockGameStats } from "../utils/mock"
import { ResolverContext } from "../context";

export const resolvers = {
  Query:{
    playerGameStats: async (parent, args, ctx : ResolverContext, info) => {
      const players = await ctx.dataSources.players.find({}).toArray();
      const gameStats = await ctx.dataSources.gameStats.find({}).toArray();
      console.log(players);
      return mockGameStats;
    }
  },
  // Mutation: {
    
  // }
}