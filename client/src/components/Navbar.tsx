import { Link } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Logout from "./Logout";

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
  min-height: 40px;
  align-items: center;
  width: 100%;
`;

interface Props {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: Props) => {
  return (
    <Wrapper>
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
      <div>
        <Logout onLogout={onLogout} />
      </div>
    </Wrapper>
  );
};

export default Navbar;
