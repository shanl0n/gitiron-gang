import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery, gql } from "@apollo/client";

import { Player } from "@models";
import AddPlayer from "./AddPlayer";
import { redirect } from "react-router-dom";

const GET_PLAYERS = gql`
  query GetPlayers {
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

interface GetPlayersData {
  players: Player[];
}

const PlayerList = ( ) => {
  const { loading, error, data } = useQuery<GetPlayersData>(GET_PLAYERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handlePlayerAdded = () => {
    console.log("redirect")
    window.location.href="/myteam"
  }

  return (
    <TableContainer component={Paper} className="data-table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} />
            <TableCell colSpan={4} align="center">
              Passing
            </TableCell>
            <TableCell colSpan={3} align="center">
              Rushing
            </TableCell>
            <TableCell colSpan={3} align="center">
              Receiving
            </TableCell>
            <TableCell colSpan={1} align="center">
              Fum
            </TableCell>
            <TableCell colSpan={1} align="center">
              Fantasy
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Player</TableCell>
            <TableCell align="center">Manager</TableCell>
            <TableCell align="center">Comp</TableCell>
            <TableCell align="center">Yds</TableCell>
            <TableCell align="center">TD</TableCell>
            <TableCell align="center">Int</TableCell>
            <TableCell align="center">Att</TableCell>
            <TableCell align="center">Yds</TableCell>
            <TableCell align="center">TD</TableCell>
            <TableCell align="center">Rec</TableCell>
            <TableCell align="center">Yds</TableCell>
            <TableCell align="center">TD</TableCell>
            <TableCell align="center">Fumbles</TableCell>
            <TableCell align="center">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.players.map((player) => {
            const stats = player.gameStatsSummary;
            return (
              <TableRow
                key={player.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <AddPlayer onAdd={handlePlayerAdded} playerId={player.id} />
                </TableCell>
                <TableCell align="right">
                  <div>{player.name}</div>
                  <div>{player.position}</div>
                </TableCell>
                <TableCell align="right">TODO</TableCell>
                <TableCell align="right">{stats.passing.completions}</TableCell>
                <TableCell align="right">{stats.passing.yards}</TableCell>
                <TableCell align="right">{stats.passing.touchdowns}</TableCell>
                <TableCell align="right">
                  {stats.passing.interceptions}
                </TableCell>
                <TableCell align="right">{stats.rushing.attempts}</TableCell>
                <TableCell align="right">{stats.rushing.yards}</TableCell>
                <TableCell align="right">{stats.rushing.touchdowns}</TableCell>
                <TableCell align="right">
                  {stats.receiving.receptions}
                </TableCell>
                <TableCell align="right">{stats.receiving.yards}</TableCell>
                <TableCell align="right">
                  {stats.receiving.touchdowns}
                </TableCell>
                <TableCell align="right">{stats.fumbles.fumbles}</TableCell>
                <TableCell align="right">{stats.totalPoints}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default PlayerList;
