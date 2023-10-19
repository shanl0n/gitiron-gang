import React from "react";

import { gql, useQuery } from "@apollo/client";
import { FantasyGame } from "@types";
import ComparePlayers from "../../components/ComparePlayers";

const GET_FANTASY_GAME = gql`
  query GetFantasyGame {
    fantasyGame {
      myTeam {
        ...TeamFragment
      }
      opponentsTeam {
        ...TeamFragment
      }
    }
  }
  fragment TeamFragment on FantasyTeam {
    name
    totalPoints
    players {
      id
      name
      position
      gameStatsSummary {
        rushing {
          attempts
          touchdowns
          yards
        }
        receiving {
          receptions
          yards
          touchdowns
        }
        passing {
          completions
          yards
          touchdowns
          interceptions
        }
        fumbles {
          fumbles
        }
        totalPoints
      }
    }
  }
`;


interface GetFantasyGameData {
  fantasyGame: FantasyGame;
}

const GameCentre = () => {
  const { loading, error, data } =
    useQuery<GetFantasyGameData>(GET_FANTASY_GAME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No players found</p>;

  const myTeam = data.fantasyGame.myTeam;
  const opponentsTeam = data.fantasyGame.opponentsTeam;

  const myTeamTotalPoints = myTeam.totalPoints.toFixed(2);
  const opponentsTeamTotalPoints = opponentsTeam.totalPoints.toFixed(2);

  return <ComparePlayers compare={<div>VS</div>} left={{
    title: myTeam.name,
    subtitle: myTeamTotalPoints.toString(),
    players: myTeam.players,
  }} right={{
    title: opponentsTeam.name,
    subtitle: opponentsTeamTotalPoints.toString(),
    players: opponentsTeam.players,
  }} />
};

export default GameCentre;
