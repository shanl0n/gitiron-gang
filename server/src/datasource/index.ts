import { MongoClient } from "mongodb";
import { Collection } from "mongoose";
import { FantasyGameModel, FantasyTeamModel, FantasyTeamPlayerModel, GameStatsModel, PlayerModel, UserModel } from "./models";

export interface Datasource {
  users: Collection<UserModel>;
  players: Collection<PlayerModel>;
  teams: Collection;
  seasonSchedule: Collection;
  gameStats: Collection<GameStatsModel>;
  fantasyTeams: Collection<FantasyTeamModel>;
  fantasyTeamPlayers: Collection<FantasyTeamPlayerModel>;
  fantasyGames: Collection<FantasyGameModel>;
}

export const setupDatasource = (client: MongoClient): Datasource => {
  const db = client.db("gitiron_gang");
  return {
    users: db.collection("users"),
    players: db.collection("players"),
    teams: db.collection("teams"),
    seasonSchedule: db.collection("season_schedule"),
    gameStats: db.collection("game_stats"),
    fantasyTeams: db.collection("fantasy_teams"),
    fantasyTeamPlayers: db.collection("fantasy_team_players"),
    fantasyGames: db.collection("fantasy_games"),
  } as Datasource;
};
