import React from 'react';
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from '@mui/material';

interface Props {
  onLogout: () => void;
}

const Logout = ({ onLogout }: Props) => {
  return (
    <IconButton color="primary" onClick={onLogout}><LogoutIcon/></IconButton>
  );
};

export default Logout;