import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { mockGameStats } from "../../utils/mock";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";


const PlayerList = () => {
  const handleAddPlayer = (playerId: string) => {console.log(`adding player ${playerId}`)}
  return (
    <TableContainer component={Paper} className="data-table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}/>
            <TableCell colSpan={3} align="center">Passing</TableCell>
            <TableCell colSpan={3} align="center">Rushing</TableCell>
            <TableCell colSpan={3} align="center">Receiving</TableCell>
            <TableCell colSpan={2} align="center">Return</TableCell>
            <TableCell colSpan={2} align="center">Misc</TableCell>
            <TableCell colSpan={1} align="center">Fum</TableCell>
            <TableCell colSpan={1} align="center">Fantasy</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Player</TableCell>
            <TableCell align="center">Manager</TableCell>
            <TableCell align="center">Yds</TableCell>
            <TableCell align="center">TD</TableCell>
            <TableCell align="center">Int</TableCell>
            <TableCell align="center">Att</TableCell>
            <TableCell align="center">Yds</TableCell>
            <TableCell align="center">TD</TableCell>
            <TableCell align="center">Rec</TableCell>
            <TableCell align="center">Yds</TableCell>
            <TableCell align="center">TD</TableCell>
            <TableCell align="center">Yds</TableCell>
            <TableCell align="center">Td</TableCell>
            <TableCell align="center">FumTD</TableCell>
            <TableCell align="center">2PT</TableCell>
            <TableCell align="center">Lost</TableCell>
            <TableCell align="center">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockGameStats.map((row) => (
            <TableRow
              key={row.position}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center"><IconButton color="primary" onClick={() => handleAddPlayer(row.playerId)}><AddCircleIcon/></IconButton></TableCell>
              <TableCell align="right">
                <div>{row.playerName}</div>
                <div>{row.position}</div>
              </TableCell>
              <TableCell align="right">{row.manager}</TableCell>
              <TableCell align="right">{row.passYards}</TableCell>
              <TableCell align="right">{row.passTouchdowns}</TableCell>
              <TableCell align="right">{row.interceptions}</TableCell>
              <TableCell align="right">{row.rushAttempts}</TableCell>
              <TableCell align="right">{row.rushYards}</TableCell>
              <TableCell align="right">{row.rushTouchdowns}</TableCell>
              <TableCell align="right">{row.receptions}</TableCell>
              <TableCell align="right">{row.receivingYards}</TableCell>
              <TableCell align="right">{row.receivingTouchdowns}</TableCell>
              <TableCell align="right">{row.returnYards}</TableCell>
              <TableCell align="right">{row.returnTouchdowns}</TableCell>
              <TableCell align="right">{row.fumbleTouchdowns}</TableCell>
              <TableCell align="right">{row.twoPoints}</TableCell>
              <TableCell align="right">{row.lostFumbles}</TableCell>
              <TableCell align="right">{row.totalPoints}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)};
export default PlayerList;
