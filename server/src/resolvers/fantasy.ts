import { RequestContext } from "../context";
import {
  FantasyTeamModel,
  PlayerGameStatsModel,
  PlayerModel,
} from "../datasource/models";
import { playerStatsSummary } from "./stats";

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
      const weekId = currentWeekId();

      const fantasyGame = await ctx.dataSources.fantasyGames.findOne({
        fantasyTeamIds: myTeamId,
        weekId,
      });

      const opponentsTeamId = fantasyGame.fantasyTeamIds.find(
        (id) => id !== myTeamId
      );

      return {
        myTeamId,
        opponentsTeamId,
        weekId,
      };
    },
  },
  FantasyTeam: {
    players: async (
      parent,
      args,
      ctx: RequestContext,
      info
    ) => {
      // TODO: wouldn't need this if fantasy teams only existed by week
      if (parent.players) {
        return parent.players;
      }

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
};

const fantasyTeamForWeek = async (
  ctx: RequestContext,
  fantasyTeamId: string,
  weekId: string
) => {
  const fantasyTeam = await ctx.dataSources.fantasyTeams.findOne({
    id: fantasyTeamId,
  });

  const teamPlayers = await ctx.dataSources.fantasyTeamPlayers
    .find({
      fantasyTeamId: fantasyTeam.id,
      // TODO: have players be for a certain week on the fantasy team
    })
    .toArray();
  const playerIds = teamPlayers.map((player) => player.playerId);

  const gameStats = await ctx.dataSources.gameStats
    .find({
      "summary.week.id": weekId,
      playerGameStats: {
        $elemMatch: {
          playerId: {
            $in: playerIds,
          },
        },
      },
    })
    .toArray();

  const gameStatsByPlayer: { [playerId: string]: PlayerGameStatsModel[] } = {};
  playerIds.forEach((id) => (gameStatsByPlayer[id] = []));

  gameStats.forEach((game) => {
    game.playerGameStats.forEach((stat) => {
      if (stat.playerId in gameStatsByPlayer) {
        gameStatsByPlayer[stat.playerId].push(stat);
      }
    });
  });

  const playersData = await ctx.dataSources.players
    .find({
      id: {
        $in: playerIds,
      },
    })
    .toArray();

  const playersWithSummary = playersData.map((player) => ({
    ...player,
    gameStatsSummary: playerStatsSummary(gameStatsByPlayer[player.id]),
  }));

  let totalPoints = 0;
  playersWithSummary.forEach((player) => {
    totalPoints += player.gameStatsSummary.totalPoints;
  });

  return {
    ...fantasyTeam,
    players: playersWithSummary,
    totalPoints,
  };
};
