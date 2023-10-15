import { MongoClient } from "mongodb";
import { Collection } from "mongoose";
import { Player, GameStats, User, FantasyTeam } from "../models";

export interface Datasource {
  users: Collection<User>;
  players: Collection<Player>;
  teams: Collection;
  seasonSchedule: Collection;
  gameStats: Collection<GameStats>;
  fantasyTeams: Collection<FantasyTeam>;
}

export const setupDatasource = (client: MongoClient): Datasource => {
  const db = client.db("gitiron_gang");
  return {
    users: db.collection("users"),
    players: db.collection("players"),
    teams: db.collection("teams"),
    seasonSchedule: db.collection("season_schedule"),
    gameStats: db.collection("game_stats"),
    fantasyTeams: db.collection("fantasy_teams")
  } as Datasource;
};
