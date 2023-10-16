import { RequestContext } from "../context";
import { FantasyTeam, Player } from "../models";

export const fantasyResolvers = {
  Mutation: {
    addPlayer: async (parent, args, ctx: RequestContext, info) => {
      const response = await ctx.dataSources.fantasyTeamPlayers.insertOne({
        playerId: args.id as string,
        fantasyTeamId: ctx.jwtPayload!.fantasyTeamId,
      });
      return response.acknowledged;
    },
  },
  Query: {
    fantasyTeam: async (parent, args, ctx: RequestContext, info) => {
      return await ctx.dataSources.fantasyTeams.findOne({
        id: ctx.jwtPayload!.fantasyTeamId,
      });
    },
  },
  FantasyTeam: {
    players: async (parent: FantasyTeam, args, ctx: RequestContext, info) => {
      const players = await ctx.dataSources.fantasyTeamPlayers
        .find({ fantasyTeamId: parent.id })
        .toArray();
      return await ctx.dataSources.players
        .find({
          id: {
            $in: players.map((player) => player.playerId),
          },
        })
        .toArray();
    },
  },
  Player: {
    fantasyTeam: async (parent: Player, args, ctx: RequestContext, info) => {
      return await ctx.dataSources.fantasyTeamPlayers
        .findOne({ playerId: parent.id })
        .then((fantasyTeamPlayer) => {
          return ctx.dataSources.fantasyTeams.findOne({
            id: fantasyTeamPlayer.fantasyTeamId,
          });
        })
        .catch(() => {
          return null;
        });
    },
  },
};
