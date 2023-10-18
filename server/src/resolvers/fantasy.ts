import { ApolloError } from "apollo-server-express";
import { RequestContext } from "../context";
import {
  PlayerGameStatsModel,
  PlayerModel,
  PlayerTradeModel,
  TradeStatus,
} from "../datasource/models";
import { playerStatsSummary } from "./stats";
import { Player } from "../schema/types";

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
    tradePlayer: async (parent, args, ctx: RequestContext, info) => {
      const sellerTeamPlayer = await ctx.dataSources.fantasyTeamPlayers.findOne({
        playerId: args.sellPlayerId,
      })

      const buyerTeamPlayer = await ctx.dataSources.fantasyTeamPlayers.findOne({
        playerId: args.buyPlayerId
      });

      if (sellerTeamPlayer.fantasyTeamId !== ctx.jwtPayload!.fantasyTeamId) {
        throw new ApolloError("Cannot trade player you do not manage", "BAD_USER_INPUT");
      }
      if (buyerTeamPlayer.fantasyTeamId === ctx.jwtPayload!.fantasyTeamId) {
        throw new ApolloError("Already managing player", "BAD_USER_INPUT");
      }

      const trade = await ctx.dataSources.playerTrades.insertOne({
        sellPlayerId: sellerTeamPlayer.playerId,
        sellFantasyTeamId: sellerTeamPlayer.fantasyTeamId,
        buyPlayerId: buyerTeamPlayer.playerId,
        buyFantasyTeamId: buyerTeamPlayer.fantasyTeamId,
        status: TradeStatus.Pending
      });

      return trade.acknowledged;
    }
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
    playerTrades: async (parent, args, ctx: RequestContext, info) => {
      return await ctx.dataSources.playerTrades.find({
        $or: [
          {
            sellFantasyTeamId: ctx.jwtPayload!.fantasyTeamId,
          },
          {
            buyFantasyTeamId: ctx.jwtPayload!.fantasyTeamId,
          }
        ]
      }).toArray();
    }
  },
  PlayerTrade: {
    sellPlayer: async (parent: PlayerTradeModel, args, ctx: RequestContext, info) => {
      return await playerForTrade(ctx, parent.sellPlayerId, parent.sellFantasyTeamId);
    },
    buyPlayer: async (parent: PlayerTradeModel, args, ctx: RequestContext, info) => {
      return await playerForTrade(ctx, parent.buyPlayerId, parent.buyFantasyTeamId);
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
      parent: PlayerModel | Player,
      args,
      ctx: RequestContext,
      info
    ) => {
      if ("fantasyTeam" in parent && parent.fantasyTeam) {
        return parent.fantasyTeam
      }
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

const playerForTrade = async (ctx: RequestContext, playerId: string, fantasyTeamId: string) => {
  const player = await ctx.dataSources.players.findOne({
    id: playerId,
  });
  const fantasyTeam = await ctx.dataSources.fantasyTeams.findOne({
    id: fantasyTeamId,
  });

  return {
    ...player,
    fantasyTeam,
  };
}