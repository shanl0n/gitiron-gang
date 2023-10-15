import { mockGameStats, mockHardGameStats, mockPlayers, emptyPlayerGameStats } from "../utils/mock"
import { ResolverContext } from "../context";
import { PlayerGameStats } from "../models";


export const resolvers = {
  Query:{
    playerGameStats: async (parent, args, ctx : ResolverContext, info) => {
      const players = mockPlayers;
      const gameStats = mockHardGameStats;
      const gameStatsByPlayers: {[playerId: string]: PlayerGameStats} = {};
      players.forEach((player) => {
        gameStatsByPlayers[player.id] = {
          ...emptyPlayerGameStats,
          playerId: player.id,
          playerName: player.name,
          position: player.position,
        }
      });

      gameStats.forEach((stat) => {
        const summary = gameStatsByPlayers[stat.playerId];
        summary["passYards"] += stat.statistics.passing.yards;
        summary["passTouchdowns"] += stat.statistics.passing.touchdowns;
        summary["interceptions"] += stat.statistics.passing.interceptions;
        summary["attempts"] += stat.statistics.rushing.attempts;
        summary["rushYards"] += stat.statistics.rushing.yards;
        summary["rushTouchdowns"] += stat.statistics.rushing.touchdowns;
        summary["receptions"] += stat.statistics.receiving.receptions;
        summary["receivingYards"] += stat.statistics.receiving.yards;
        summary["receivingTouchdowns"] += stat.statistics.receiving.touchdowns;
      });



      console.log(players);
      return Object.keys(gameStatsByPlayers).map((playerId) =>
        gameStatsByPlayers[playerId])
      ;
    }
  },
  // Mutation: {
    
  // }
}