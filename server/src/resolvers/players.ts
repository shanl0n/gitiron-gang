import { Filter } from "mongodb";
import { RequestContext } from "../context";
import { PlayerModel } from "../datasource/models";
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
      const filter: Filter<PlayerModel> = {
        position: {
          $in: OFFENCE_POSITIONS
        },
      };

      if (input?.searchTerm) {
        filter.name = new RegExp(input.searchTerm, "gi");
      }
      return await paginationQuery(
        ctx.dataSources.players,
        input,
        filter,
      );
    },
  },
};
