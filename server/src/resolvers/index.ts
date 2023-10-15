import _ from "lodash";
import { playerResolvers } from "./players";
import { statsResolvers } from "./stats";

export const resolvers = _.merge(playerResolvers, statsResolvers);
