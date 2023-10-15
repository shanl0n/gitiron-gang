import _ from "lodash";
import { playerResolvers } from "./players";
import { statsResolvers } from "./stats";
import { fantasyResolvers } from "./fantasy";

export const resolvers = _.merge(playerResolvers, statsResolvers, fantasyResolvers);
