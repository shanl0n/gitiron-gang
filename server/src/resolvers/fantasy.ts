import { RequestContext } from "../context";
import { FantasyTeamModel, PlayerModel } from "../datasource/models";

export const fantasyResolvers = {
  Mutation: {
    addPlayer: async (parent, args, ctx: RequestContext, info) => {
      const response = await ctx.dataSources.fantasyTeamPlayers.insertOne({
        playerId: args.id as string,
        fantasyTeamId: ctx.jwtPayload!.fantasyTeamId,
      });
      return response.acknowledged;
    },
    dropPlayer: async (parent, args, ctx: RequestContext, info) => {
      const response = await ctx.dataSources.fantasyTeamPlayers.deleteOne({
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
    fantasyGame: async (parent, args, ctx: RequestContext, info) => {
      const myTeamId = ctx.jwtPayload!.fantasyTeamId;

      const fantasyGame = await ctx.dataSources.fantasyGames.findOne({
        fantasyTeamIds: myTeamId,
        weekId: currentWeekId()
      });

      const opponentTeamId = fantasyGame.fantasyTeamIds.find(id => id !== myTeamId);

      return {
        myTeam: await ctx.dataSources.fantasyTeams.findOne({ id: myTeamId }),
        opponentsTeam: await ctx.dataSources.fantasyTeams.findOne({id: opponentTeamId}),
      };
    },
  },
  FantasyTeam: {
    players: async (
      parent: FantasyTeamModel,
      args,
      ctx: RequestContext,
      info
    ) => {
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
    fantasyTeam: async (
      parent: PlayerModel,
      args,
      ctx: RequestContext,
      info
    ) => {
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

const currentWeekId = () => {
  // hard coded for now
  return "d0c2a811-2484-4da9-9082-a1f7ee98f96d";
}
