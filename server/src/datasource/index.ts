import { Db, MongoClient } from "mongodb";
import { Collection } from "mongoose";
import { FantasyGameModel, FantasyTeamModel, FantasyTeamPlayerModel, GameStatsModel, PlayerGameStatsModel, PlayerModel, UserModel } from "./models";

export interface Datasource {
  users: Collection<UserModel>;
  players: Collection<PlayerModel>;
  teams: Collection;
  seasonSchedule: Collection;
  gameStats: Collection<GameStatsModel>;
  playerGameStats: Collection<PlayerGameStatsModel>;
  fantasyTeams: Collection<FantasyTeamModel>;
  fantasyTeamPlayers: Collection<FantasyTeamPlayerModel>;
  fantasyGames: Collection<FantasyGameModel>;
  // fantasyGameWeekTeam
}

export const setupDatasource = async (client: MongoClient): Promise<Datasource> => {
  const db = client.db("gitiron_gang");
  return {
    users: db.collection("users"),
    players: db.collection("players"),
    teams: db.collection("teams"),
    seasonSchedule: db.collection("season_schedule"),
    gameStats: await createGameStatsView(db),
    playerGameStats: db.collection("player_game_stats"),
    fantasyTeams: db.collection("fantasy_teams"),
    fantasyTeamPlayers: db.collection("fantasy_team_players"),
    fantasyGames: db.collection("fantasy_games"),
  } as Datasource;
};

const createGameStatsView = async (db: Db) => {
  await db.dropCollection("game_stats");
  return await db.createCollection<GameStatsModel>("game_stats", {
    viewOn: "games",
    pipeline: [
      {
        $lookup: {
          from: "player_game_stats",
          localField: "id",
          foreignField: "gameId",
          as: "playerGameStats",
        },
      },
    ]
  })
}