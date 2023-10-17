import { Link } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Wrapper=styled.nav`
  background-color: white;
  color: black;
  display: flex;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.24);
  margin-bottom: 4px;
  gap: 1rem;
  text-decoration: none;
`

const Navbar = () => {
  return (
  <Wrapper>
    <div>League</div>
    <Link href="/myteam">My Team</Link>
    <Link href="/players">Players</Link>
    <Link href="/gamecentre">Game Center</Link>
  </Wrapper>)
};

export default Navbar;
