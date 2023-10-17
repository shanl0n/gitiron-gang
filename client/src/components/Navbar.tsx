import { Link } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Wrapper=styled.nav`
  background-color: white;
  display: flex;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.24);
  margin-bottom: 4px;
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
