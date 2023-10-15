import { RequestContext } from "../context";
import { GameStatsSummary, PassingStats, Player, ReceivingStats, RushingStats } from "../models";

const MULTIPLIERS = {
  PASSING: {
    YARDS: 1 / 20,
    TOUCHDOWNS: 6,
    INTERCEPTIONS: -2,
    COMPLETIONS: 1 / 10,
  },
  RUSHING: {
    YARDS: 1 / 10,
    TOUCHDOWNS: 6,
    ATTEMPTS: 1 / 10,
  },
  RECEIVING: {
    RECEPTIONS: 1,
    YARDS: 1 / 10,
    TOUCHDOWNS: 6,
  }
};

export const statsResolvers = {
  Player: {
    gameStatsSummary: async (parent: Player, args, ctx: RequestContext, info) => {
      const summary = {
        rushing: {
          attempts: 0,
          yards: 0,
          touchdowns: 0,
        },
        receiving: {
          receptions: 0,
          yards: 0,
          touchdowns: 0,
        },
        passing: {
          completions: 0,
          yards: 0,
          touchdowns: 0,
          interceptions: 0,
        },
        fumbles: {
          fumbles: 0,
        },
        totalPoints: 0,
      } as GameStatsSummary;
      
      const stats = await ctx.dataSources.gameStats.find({playerId: parent.id}).toArray();
      
      stats.forEach((stat) => {
        summary.rushing.attempts += stat.statistics.rushing?.attempts || 0;
        summary.rushing.yards += stat.statistics.rushing?.yards || 0;
        summary.rushing.touchdowns += stat.statistics.rushing?.touchdowns || 0;
        summary.receiving.receptions += stat.statistics.receiving?.receptions || 0;
        summary.receiving.yards += stat.statistics.receiving?.yards || 0;
        summary.receiving.touchdowns += stat.statistics.receiving?.touchdowns || 0;
        summary.passing.completions += stat.statistics.passing?.completions || 0;
        summary.passing.yards += stat.statistics.passing?.yards || 0;
        summary.passing.touchdowns += stat.statistics.passing?.touchdowns || 0;
        summary.passing.interceptions += stat.statistics.passing?.interceptions || 0;
        summary.fumbles.fumbles += stat.statistics.fumbles?.fumbles || 0;
      });

      summary.totalPoints = Math.round(sumPoints(summary) * 100) / 100;

      return summary;
    },
  },
};

const sumPoints = (stats: GameStatsSummary): number => {
  return sumPassing(stats.passing) + sumRushing(stats.rushing) + sumReceiving(stats.receiving);
};

const sumReceiving = (stats: ReceivingStats): number => {
  return (
    stats.receptions * MULTIPLIERS.RECEIVING.RECEPTIONS +
    stats.touchdowns * MULTIPLIERS.RECEIVING.TOUCHDOWNS +
    stats.yards * MULTIPLIERS.RECEIVING.YARDS
  );
}

const sumRushing = (stats: RushingStats): number => {
  return (
    stats.attempts * MULTIPLIERS.RUSHING.ATTEMPTS +
    stats.touchdowns * MULTIPLIERS.RUSHING.TOUCHDOWNS +
    stats.yards * MULTIPLIERS.RUSHING.YARDS
  );
};

const sumPassing = (stats: PassingStats): number => {
  return (
    stats.yards * MULTIPLIERS.PASSING.YARDS +
    stats.touchdowns * MULTIPLIERS.PASSING.TOUCHDOWNS +
    stats.interceptions * MULTIPLIERS.PASSING.INTERCEPTIONS +
    stats.completions * MULTIPLIERS.PASSING.COMPLETIONS
  );
};
