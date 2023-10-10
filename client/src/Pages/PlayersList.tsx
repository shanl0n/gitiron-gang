import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  position: string,
  offense: string,
  passyds: number,
  passtd: number,
  int: number,
  rushatt: number,
  rushyds: number,
  rushtd: number,
  recnum: number,
  recyds: number,
  rectd: number,
  retyds: number,
  rettd: number,
  fumtd: number,
  twopt: number,
  lostfum: number,
  points: number
) {
  return {
    position,
    offense,
    passyds,
    passtd,
    int,
    rushatt,
    rushyds,
    rushtd,
    recnum,
    recyds,
    rectd,
    retyds,
    rettd,
    fumtd,
    twopt,
    lostfum,
    points,
  };
}

const rows = [
  createData(
    "QB",
    "Jared Goff",
    236,
    3,
    0,
    2,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    36.0
  ),
  createData(
    "RB",
    "Tony Pollard",
    0,
    0,
    0,
    8,
    29,
    0,
    4,
    35,
    0,
    0,
    0,
    0,
    0,
    1,
    8.2
  ),
];

export default function MyTeam() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">POS</TableCell>
            <TableCell align="right">Offense</TableCell>
            <TableCell align="right">Yds (P)</TableCell>
            <TableCell align="right">TD(P)</TableCell>
            <TableCell align="right">Int(P)</TableCell>
            <TableCell align="right">Att(Ru)</TableCell>
            <TableCell align="right">Yds(Ru)</TableCell>
            <TableCell align="right">TD(Ru)</TableCell>
            <TableCell align="right">Rec(Re)</TableCell>
            <TableCell align="right">Yds(Re)</TableCell>
            <TableCell align="right">TD(Re)</TableCell>
            <TableCell align="right">Yds(ret)</TableCell>
            <TableCell align="right">Td(ret)</TableCell>
            <TableCell align="right">FumTD</TableCell>
            <TableCell align="right">2PT</TableCell>
            <TableCell align="right">Lost(fum)</TableCell>
            <TableCell align="right">Fant. Pts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.position}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.position}
              </TableCell>
              <TableCell align="right">{row.offense}</TableCell>
              <TableCell align="right">{row.passyds}</TableCell>
              <TableCell align="right">{row.passtd}</TableCell>
              <TableCell align="right">{row.int}</TableCell>
              <TableCell align="right">{row.rushatt}</TableCell>
              <TableCell align="right">{row.rushyds}</TableCell>
              <TableCell align="right">{row.rushtd}</TableCell>
              <TableCell align="right">{row.recnum}</TableCell>
              <TableCell align="right">{row.recyds}</TableCell>
              <TableCell align="right">{row.rectd}</TableCell>
              <TableCell align="right">{row.retyds}</TableCell>
              <TableCell align="right">{row.rettd}</TableCell>
              <TableCell align="right">{row.fumtd}</TableCell>
              <TableCell align="right">{row.twopt}</TableCell>
              <TableCell align="right">{row.lostfum}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}