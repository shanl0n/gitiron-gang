import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery, gql } from "@apollo/client";

import { FantasyTeam, Player } from "@types";
import Button from "@mui/material/Button";
import AddPlayer from "../PlayerList/AddPlayer";
import PlayerTable from "../../components/PlayerTable";

const GET_FANTASY_TEAM = gql`
  query GetFantasyTeam {
    fantasyTeam {
      name
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
  }
`;

interface GetFantasyTeamData {
  fantasyTeam: FantasyTeam;
}

const MyTeam = () => {
  const { loading, error, data } =
    useQuery<GetFantasyTeamData>(GET_FANTASY_TEAM);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No players found</p>

  return (
    <>
      <Button href="/players">Add</Button>
      <Button href="/players">Drop</Button>
      <Button href="/players">Trade</Button>
      <PlayerTable players={data.fantasyTeam.players}/>
    </>
  );
};

export default MyTeam;
