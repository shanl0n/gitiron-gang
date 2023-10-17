import React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Player } from "@types";

import "./style.css";

interface Props {
  players: Player[];
  renderAction?: (player: Player) => React.ReactNode;
}

const PlayerTable = ({ players, renderAction }: Props) => {
  return (
    <TableContainer
      sx={{ maxWidth: 985, borderBlock: 1}}
      component={Paper}
      className="data-table PlayerTable"
    >
      <Table  sx={{ maxWidth: 985 }} aria-label="simple table">
        <TableHead style={{backgroundColor: "whitesmoke" }}>
          <TableRow sx={{height: '1px'}}>
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
          <TableRow style={{maxHeight: 1}}>
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
          {players.map((player) => {
            const stats = player.gameStatsSummary;
            return (
              <TableRow
                key={player.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {renderAction && renderAction(player)}
                </TableCell>
                <TableCell align="right">
                  <div>{player.name}</div>
                  <div className="PositionColumn">{player.position}</div>
                </TableCell>
                <TableCell align="right">Manager</TableCell>
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
                <TableCell className="totalPoints" align="right">{stats.totalPoints}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;
