import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";
import { Player, PlayerConnection } from "@types";
import AddPlayer from "./AddPlayer";
import PlayerTable from "../../components/PlayerTable";
import styled from "styled-components";
import { Button, Pagination, TablePagination, TextField } from "@mui/material";
import TradePlayer from "./TradePlayer";
import DropPlayer from "../MyTeam/DropPlayer";

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
    fantasyTeam {
      id
    }
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
  fantasyTeam: {
    id: string;
  }
}

const PlayerList = () => {
  const { loading, error, data, refetch } =
    useQuery<GetPlayersData>(GET_PLAYERS);
  // TODO: would be nice to be able to change page size
  const [pageSize, setPageSize] = useState(25);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No players found</p>;

  const pageInfo = data.players.pageInfo;

  const handlePlayerAdded = () => {
    window.location.href = "/myteam";
  };

  const refetchDefault = () => {
    refetch({
      input: {
        page: pageInfo.currentPage,
        pageSize,
        searchTerm,
      }
    })
  }

  const renderAction = (player: Player) => {
    if (!player.fantasyTeam) {
      return <AddPlayer onAdd={handlePlayerAdded} playerId={player.id} />;
    }
    if (player.fantasyTeam.id === data.fantasyTeam.id) {
      return <DropPlayer player={player} onDrop={() => refetchDefault()} />;
    }
    
    return  <TradePlayer onTrade={() => {}} buyPlayerId={player.id} />
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(`change to: ${event.target.value}`);
    console.log(event);
    setSearchTerm(event.target.value);
    refetch({
      input: {
        page: pageInfo.currentPage,
        pageSize,
        searchTerm: event.target.value,
      }
    });
  }

  const pagination = <Pagination color="primary" count={pageInfo.pageCount} page={pageInfo.currentPage} onChange={handleChangePage} />

  return (
    <Container>
      <TextField value={searchTerm} id="outlined-search" label="Search field" type="search" onChange={handleSearchChange} />
      {pagination}
      <PlayerTable players={data.players.nodes} renderAction={renderAction} />
      {pagination}
    </Container>
  );
};
export default PlayerList;
