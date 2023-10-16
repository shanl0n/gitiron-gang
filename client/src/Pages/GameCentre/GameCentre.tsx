import React from "react";

import { gql, useQuery } from "@apollo/client";
import { FantasyGame } from "@types";

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
    <div>{data.fantasyGame.opponentsTeam.name}</div>
  </>
);
};


export default GameCentre;
