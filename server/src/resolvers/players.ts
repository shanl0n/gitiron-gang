import { ResolverContext } from "../context";

const OFFENCE_POSITIONS = ["RB", "QB", "WR", "TE"];

export const playerResolvers = {
  Query: {
    players: async (parent, args, ctx: ResolverContext, info) => {
      return await ctx.dataSources.players.find({
        position: {
          $in: OFFENCE_POSITIONS
        }
      }).limit(20).toArray();
    },
  },
};
