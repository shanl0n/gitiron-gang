import { RequestContext } from "../context";

const OFFENCE_POSITIONS = ["RB", "QB", "WR", "TE"];

export const playerResolvers = {
  Mutation: {
    addPlayer: async (parent, args, ctx: RequestContext, info) => {
      const response = await ctx.dataSources.fantasyTeamPlayers.insertOne({
        playerId: args.playerId as string,
        fantasyTeamId: ctx.jwtPayload!.fantasyTeamId,
      });
      return response.acknowledged;
    },
  },
  Query: {
    players: async (parent, args, ctx: RequestContext, info) => {
      return await ctx.dataSources.players
        .find({
          position: {
            $in: OFFENCE_POSITIONS,
          },
        })
        .limit(20)
        .toArray();
    },
  },
};
