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
      sx={{ maxWidth: 985, borderBlock: 1 }}
      component={Paper}
      className="data-table PlayerTable"
    >
      <Table sx={{ maxWidth: 985 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ height: "1px" }}>
            <TableCell colSpan={renderAction ? 3 : 2} className="Primary" />
            <TableCell className="Primary" colSpan={4} align="center">
              Passing
            </TableCell>
            <TableCell className="Primary" colSpan={3} align="center">
              Rushing
            </TableCell>
            <TableCell className="Primary" colSpan={3} align="center">
              Receiving
            </TableCell>
            <TableCell className="Primary" colSpan={1} align="center">
              Fum
            </TableCell>
            <TableCell className="Primary" colSpan={1} align="center">
              Fantasy
            </TableCell>
          </TableRow>
          <TableRow style={{ maxHeight: 1 }}>
            {renderAction && (
              <TableCell className="Primary" align="center">
                Action
              </TableCell>
            )}
            <TableCell className="Primary" align="center">
              Player
            </TableCell>
            <TableCell className="Primary" align="center">
              Manager
            </TableCell>
            <TableCell className="Secondary" align="center">
              Comp
            </TableCell>
            <TableCell className="Secondary" align="center">
              Yds
            </TableCell>
            <TableCell className="Secondary" align="center">
              TD
            </TableCell>
            <TableCell className="Secondary" align="center">
              Int
            </TableCell>
            <TableCell align="center" className="Secondary">
              Att
            </TableCell>
            <TableCell align="center" className="Secondary">
              Yds
            </TableCell>
            <TableCell align="center" className="Secondary">
              TD
            </TableCell>
            <TableCell align="center" className="Secondary">
              Rec
            </TableCell>
            <TableCell align="center" className="Secondary">
              Yds
            </TableCell>
            <TableCell align="center" className="Secondary">
              TD
            </TableCell>
            <TableCell align="center" className="Secondary">
              Fumbles
            </TableCell>
            <TableCell align="center" className="Primary">
              Points
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => {
            const stats = player.gameStatsSummary;
            return (
              <TableRow
                key={player.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                    maxHeight: "point",
                  },
                }}
              >
                {renderAction && (
                  <TableCell align="center">{renderAction(player)}</TableCell>
                )}
                <TableCell align="right">
                  <div>{player.name}</div>
                  <div className="PositionName">{player.position}</div>
                </TableCell>  
                <TableCell align="right">{player.fantasyTeam?.name}</TableCell>
                <TableCell align="right">
                  {renderStat(stats.passing.completions)}
                </TableCell>
                <TableCell align="right">
                  {renderStat(stats.passing.yards)}
                </TableCell>
                <TableCell align="right">
                  {renderStat(stats.passing.touchdowns)}
                </TableCell>
                <TableCell align="right">
                  {renderStat(stats.passing.interceptions)}
                </TableCell>
                <TableCell align="right">
                  {renderStat(stats.rushing.attempts)}
                </TableCell>
                <TableCell align="right">
                  {renderStat(stats.rushing.yards)}
                </TableCell>
                <TableCell align="right">
                  {renderStat(stats.rushing.touchdowns)}
                </TableCell>
                <TableCell align="right">
                  {renderStat(stats.receiving.receptions)}
                </TableCell>
                <TableCell align="right">
                  {renderStat(stats.receiving.yards)}
                </TableCell>
                <TableCell align="right">
                  {renderStat(stats.receiving.touchdowns)}
                </TableCell>
                <TableCell align="right">
                  {renderStat(stats.fumbles.fumbles)}
                </TableCell>
                <TableCell
                  className="PlayerTable-totalPoints"
                  align="right"
                  sx={{ fontWeight: "bold" }}
                >
                  {renderStat(stats.totalPoints)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const renderStat = (stat: number) => (stat > 0 ? <p>{stat}</p> : <p>-</p>);

export default PlayerTable;
