import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";
import { Player, PlayerConnection } from "@types";
import AddPlayer from "./AddPlayer";
import PlayerTable from "../../components/PlayerTable";
import styled from "styled-components";
import { Button, Pagination, TablePagination } from "@mui/material";

const Container = styled.div`
  width: 985px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

const GET_PLAYERS = gql`
  query GetPlayers($input: PlayersInput) {
    players(input: $input) {
      pageInfo {
        currentPage
        pageCount
        itemCount
      }
      nodes {
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
`;

interface GetPlayersData {
  players: PlayerConnection;
}

const PlayerList = () => {
  const { loading, error, data, refetch } =
    useQuery<GetPlayersData>(GET_PLAYERS);
  const [pageSize, setPageSize] = useState(25);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No players found</p>;

  const pageInfo = data.players.pageInfo;

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

  // todo: what type is event
  const handleRowsPerPageChange = (event: any) => {
    console.log("EVENT");
    event?.preventDefault();
    const newPageSize = event.target.value;
    setPageSize(newPageSize);
    refetch({
      input: {
        pageSize: newPageSize,
        page: 1,
      },
    });
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    event?.preventDefault();
    console.log(`change page to: ${page}`);

    refetch({
      input: {
        page,
        pageSize: pageSize,
      },
    });
  };

  const pagination = <Pagination count={pageInfo.pageCount} page={pageInfo.currentPage} onChange={handleChangePage} />

  return (
    <Container>
      {pagination}
      <PlayerTable players={data.players.nodes} renderAction={renderAction} />
      {pagination}
    </Container>
  );
};
export default PlayerList;
