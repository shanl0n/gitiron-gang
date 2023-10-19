import { Link } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Logout from "../Logout";

import "./style.css";
import Notifications from "../Notifications";

const Wrapper = styled.nav`
  background-color: white;
  color: black;
  display: flex;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  margin-bottom: 4px;
  gap: 1rem;
  text-decoration: none;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
  padding: 0 0 0 82px;
  min-height: 50px;
  align-items: center;
  width: 100vp;
  display: flex; 
  justify-content: space-between;
`;

const LeftSide = styled.div`
  display: flex;
  width: 20rem;
  justify-content: space-between;
`

const RightSide = styled.div`
  margin-right: 2rem;
`;

interface Props {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: Props) => {
  return (
    <Wrapper className="Navbar">
      <LeftSide>
        <Link sx={{ fontSize: "20px", textDecoration: "none" }}>League</Link>
        <Link sx={{ fontSize: "20px", textDecoration: "none" }} href="/myteam">
          My Team
        </Link>
        <Link sx={{ fontSize: "20px", textDecoration: "none" }} href="/players">
          Players
        </Link>
        <Link
          sx={{ fontSize: "20px", textDecoration: "none" }}
          href="/gamecentre"
        >
          Game Center
        </Link>
      </LeftSide>
      <RightSide className="Navbar-rightAlign">
        <Notifications />
        <Logout onLogout={onLogout} />
      </RightSide>
    </Wrapper>
  );
};

export default Navbar;
