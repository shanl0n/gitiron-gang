import { Db, MongoClient } from "mongodb";
import { Collection } from "mongoose";
import { FantasyGameModel, FantasyTeamModel, FantasyTeamPlayerModel, FantasyTeamRosterModel, GameStatsModel, PlayerGameStatsModel, PlayerModel, UserModel } from "./models";

export interface Datasource {
  users: Collection<UserModel>;
  players: Collection<PlayerModel>;
  teams: Collection;
  seasonSchedule: Collection;
  gameStats: Collection<GameStatsModel>;
  playerGameStats: Collection<PlayerGameStatsModel>;
  fantasyTeams: Collection<FantasyTeamModel>;
  fantasyTeamPlayers: Collection<FantasyTeamPlayerModel>;
  fantasyTeamRoster: Collection<FantasyTeamRosterModel>;
  fantasyGames: Collection<FantasyGameModel>;
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
    fantasyTeamRoster: await createFantasyTeamRosterView(db),
    fantasyGames: db.collection("fantasy_games"),
  } as Datasource;
};

const createFantasyTeamRosterView = async (db: Db) => {
  await db.dropCollection("fantasy_team_rosters");
  return await db.createCollection<FantasyTeamRosterModel>("fantasy_team_rosters", {
    viewOn: "fantasy_teams",
    pipeline: [
      {
        $lookup: {
          from: "fantasy_team_players",
          localField: "id",
          foreignField: "fantasyTeamId",
          as: "players",
        }
      }
    ]
  });
}

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