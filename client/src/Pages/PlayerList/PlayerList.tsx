import React from "react";

import { useQuery, gql } from "@apollo/client";
import { Player } from "@types";
import AddPlayer from "./AddPlayer";
import PlayerTable from "../../components/PlayerTable";
import styled from "styled-components";

const Container = styled.div`
  width: 62rem;
  margin-left: auto;
  margin-right: auto;
`

const GET_PLAYERS = gql`
  query GetPlayers {
    players {
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
`;

interface GetPlayersData {
  players: Player[];
}

const PlayerList = () => {
  const { loading, error, data } = useQuery<GetPlayersData>(GET_PLAYERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No players found</p>;

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

  return <Container><PlayerTable players={data.players} renderAction={renderAction} /></Container>;
};
export default PlayerList;
