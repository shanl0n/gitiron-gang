import React from "react";
import styled from "styled-components";

const Wrapper=styled.nav`
  background-color: white;
  display: flex;
`
const Options=styled.div`
  color: black;
`

const Navbar = () => {
  return (
  <Wrapper>
    <Options>League</Options>
    <Options>My Team</Options>
    <Options>Players</Options>
  </Wrapper>)
};

export default Navbar;
