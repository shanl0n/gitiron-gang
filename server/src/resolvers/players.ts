import { RequestContext } from "../context";
import { PlayersInput } from "../schema/types";
import { paginationQuery } from "./pagination";

const OFFENCE_POSITIONS = ["RB", "QB", "WR", "TE"];

export const playerResolvers = {
  Query: {
    players: async (
      parent,
      { input }: { input?: PlayersInput },
      ctx: RequestContext,
      info
    ) => {
      return await paginationQuery(
        ctx.dataSources.players,
        input,
        {
          position: {
            $in: OFFENCE_POSITIONS
          }
        }
      );
    },
  },
};
