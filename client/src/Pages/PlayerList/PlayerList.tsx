import React from "react";

import { useQuery, gql } from "@apollo/client";
import { Player, PlayerConnection } from "@types";
import AddPlayer from "./AddPlayer";
import PlayerTable from "../../components/PlayerTable";
import styled from "styled-components";

const Container = styled.div`
  width: 62rem;
  margin-left: auto;
  margin-right: auto;
  padding-top: 3rem;
`;

const GET_PLAYERS = gql`
  query GetPlayers($input: PlayersInput) {
    players(input: $input) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          name
          position
          fantasyTeam {
            id
            name
          }
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
    }
  }
`;

interface GetPlayersData {
  players: PlayerConnection;
}

const PlayerList = () => {

  const { loading, error, data, refetch } = useQuery<GetPlayersData>(GET_PLAYERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No players found</p>;
  console.log(`---start: ${data.players.pageInfo.startCursor}`)
  console.log(`---end: ${data.players.pageInfo.endCursor}`)

  const handleNextPage = () => {
    if (data.players.pageInfo.hasNextPage) {
      refetch({
        input: {
          afterCursor: data.players.pageInfo.endCursor,
        },
      });
    }
  };
  
  const handlePreviousPage = () => {
    if (data.players.pageInfo.hasPreviousPage) {
      refetch({
        input: {
          beforeCursor: data.players.pageInfo.startCursor,
        },
      });
    }
  };

  const handlePlayerAdded = () => {
    console.log("redirect");
    window.location.href = "/myteam";
  };

  const renderAction = (player: Player) => {
    return player.fantasyTeam ? (
      <p>`In fantasy team ${player.fantasyTeam.name}`</p>
    ) : (
      <AddPlayer onAdd={handlePlayerAdded} playerId={player.id} />
    );
  };

  return (
    <Container>
      <button onClick={handlePreviousPage} disabled={!data.players.pageInfo.hasPreviousPage}>
        Previous Page
      </button>
      <button onClick={handleNextPage} disabled={!data.players.pageInfo.hasNextPage}>
        Next Page
      </button>
      <PlayerTable
        players={data.players.edges.map((edge) => edge.node)}
        renderAction={renderAction}
      />
    </Container>
  );
};
export default PlayerList;
