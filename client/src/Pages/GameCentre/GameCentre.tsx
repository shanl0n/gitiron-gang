import React from "react";

import { gql, useQuery } from "@apollo/client";
import { FantasyGame } from "@types";
import PlayerTable from "../../components/PlayerTable";

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
  
  return (
  <>
    <div>{data.fantasyGame.myTeam.name}</div>
    <PlayerTable players={data.fantasyGame.myTeam.players}/>
    <div>{data.fantasyGame.opponentsTeam.name}</div>
    <PlayerTable players={data.fantasyGame.opponentsTeam.players}/>
  </>
);
};


export default GameCentre;
