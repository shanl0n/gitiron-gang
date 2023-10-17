import { RequestContext } from "../context";
import {
  FantasyTeamModel,
  PlayerModel,
} from "../datasource/models";
import { teamStatsForWeek } from "./stats";

export const fantasyResolvers = {
  Mutation: {
    addPlayer: async (parent, args, ctx: RequestContext, info) => {
      const fantasyTeam = await currentFantasyTeam(ctx);
      const response = await ctx.dataSources.fantasyTeamPlayers.insertOne({
        playerId: args.id as string,
        fantasyTeamId: fantasyTeam.id,
      });
      return response.acknowledged;
    },
    dropPlayer: async (parent, args, ctx: RequestContext, info) => {
      const fantasyTeam = await currentFantasyTeam(ctx);
      const response = await ctx.dataSources.fantasyTeamPlayers.deleteOne({
        playerId: args.id as string,
        fantasyTeamId: fantasyTeam.id,
      });
      return response.acknowledged;
    },
  },
  Query: {
    fantasyTeam: async (parent, args, ctx: RequestContext, info) => {
      const fantasyTeam = await currentFantasyTeam(ctx);
      const teamPlayers = await ctx.dataSources.fantasyTeamPlayers
        .find({ fantasyTeamId: fantasyTeam.id })
        .toArray();

      const players = await ctx.dataSources.players
        .find({
          id: {
            $in: teamPlayers.map((player) => player.playerId),
          },
        })
        .toArray();

      const gameStats = await teamStatsForWeek(ctx, players, fantasyTeam.weekId);

      return {
        ...fantasyTeam,
        players: gameStats.players,
        totalPoints: gameStats.totalPoints,
      };
    },
    fantasyGame: async (parent, args, ctx: RequestContext, info) => {
      const fantasyTeam = await currentFantasyTeam(ctx);
      const myTeamId = fantasyTeam.id;
      
      const fantasyGame = await ctx.dataSources.fantasyGames.findOne({
        fantasyTeamIds: myTeamId,
        weekId: fantasyTeam.weekId,
      });

      const opponentsTeamId = fantasyGame.fantasyTeamIds.find(
        (id) => id !== myTeamId
      );

      return {
        myTeamId,
        opponentsTeamId,
        weekId: fantasyTeam.weekId,
      };
    },
  },
  FantasyGame: {
    myTeam: async (parent, args, ctx: RequestContext, info) =>
      await fantasyTeamForWeek(ctx, parent.myTeamId, parent.weekId),
    opponentsTeam: async (parent, args, ctx: RequestContext, info) =>
      await fantasyTeamForWeek(ctx, parent.opponentsTeamId, parent.weekId),
  },
  Player: {
    fantasyTeam: async (
      parent: PlayerModel,
      args,
      ctx: RequestContext,
      info
    ) => {
      return await ctx.dataSources.fantasyTeamRoster.findOne({
        weekId: currentWeekId(),
        players: {
          $elemMatch: {
            playerId: parent.id,
          },
        },
      }).catch(() => null);
    },
  },
};

const currentWeekId = () => {
  // hard coded for now
  return "d0c2a811-2484-4da9-9082-a1f7ee98f96d";
};

const fantasyTeamForWeek = async (
  ctx: RequestContext,
  fantasyTeamId: string,
  weekId: string
) => {
  const fantasyTeam = await ctx.dataSources.fantasyTeams.findOne({
    id: fantasyTeamId,
    weekId: weekId,
  });

  const teamPlayers = await ctx.dataSources.fantasyTeamPlayers
    .find({
      fantasyTeamId: fantasyTeam.id,
    })
    .toArray();

  const players = await ctx.dataSources.players
    .find({
      id: {
        $in: teamPlayers.map((player) => player.playerId),
      },
    })
    .toArray();

  const gameStats = await teamStatsForWeek(ctx, players, weekId);
  
  return {
    ...fantasyTeam,
    players: gameStats.players,
    totalPoints: gameStats.totalPoints,
  };
};

const currentFantasyTeam = async (ctx: RequestContext): Promise<FantasyTeamModel> => {
  return await ctx.dataSources.fantasyTeams.findOne({
    weekId: currentWeekId(),
    id: ctx.jwtPayload!.fantasyTeamId,
  });
}