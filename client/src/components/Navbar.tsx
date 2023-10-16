import { Link } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Wrapper=styled.nav`
  background-color: white;
  display: flex;
`
const Options=styled.div`
  color: black;
  padding-right: 1rem;
`

const Navbar = () => {
  return (
  <Wrapper>
    <Options>League</Options>
    <Options><Link href="/myteam">My Team</Link></Options>
    <Options><Link href="/players">Players</Link></Options>
    <Options><Link href="/gamecentre">Game Center</Link></Options>
  </Wrapper>)
};

export default Navbar;
