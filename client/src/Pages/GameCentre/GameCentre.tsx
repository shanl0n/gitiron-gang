import React from "react";

import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { FantasyGame } from "@types";
import PlayerTable from "../../components/PlayerTable";

const Wrapper = styled.div`
  background-color: white;
  color: black;
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
const NameScoreContainerHome = styled.div`
  color: black;
  font-weight: bold;
  margin: auto;
  margin-right: 2rem;
  text-align: right;
`;

const NameScoreContainerAway = styled.div`
  color: black;
  font-weight: bold;
  margin: auto;
  margin-left: 2rem;
`;

const OppoName = styled.p`
  color: #8f0000;
  font-size: 184%;
  margin: 0;
`;

const MyTeamName = styled.p`
  color: #004792;
  font-size: 184%;
  display: block;
  margin: 0;
  text-align: right;
`;

const VS = styled.div`
  font-weight: bold;
`


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

  return (
    <>
      <Wrapper>
        <NameScoreContainerHome>
          <MyTeamName>{myTeam.name} </MyTeamName>
          {myTeam.totalPoints}
          <PlayerTable players={myTeam.players} />
        </NameScoreContainerHome>
        <VS>VS</VS>
        <NameScoreContainerAway>
          <OppoName>{opponentsTeam.name} </OppoName>
          {opponentsTeam.totalPoints}
          <PlayerTable players={opponentsTeam.players} />
        </NameScoreContainerAway>
      </Wrapper>
    </>
  );
};

export default GameCentre;
