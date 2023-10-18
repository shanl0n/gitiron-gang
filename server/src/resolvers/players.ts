import { Filter, ObjectId, Sort } from "mongodb";
import { RequestContext } from "../context";
import { PlayersInput } from "../schema/types";
import { paginationInputToMongo } from "./pagination";
import { PlayerModel } from "../datasource/models";

const OFFENCE_POSITIONS = ["RB", "QB", "WR", "TE"];

export const playerResolvers = {
  Query: {
    players: async (
      parent,
      { input }: { input?: PlayersInput },
      ctx: RequestContext,
      info
    ) => {
      const { filter, sort, limit, reverseOrder } =
        paginationInputToMongo<PlayerModel>(input);

      const playerFind = await ctx.dataSources.players
        .find(
          {
            ...filter,
            position: {
              $in: OFFENCE_POSITIONS,
            },
          },
          {
            limit,
            sort,
          }
        )
     
      const players = playerFind.toArray();

      return reverseOrder ? players.reverse() : players;
    },
  },
};
