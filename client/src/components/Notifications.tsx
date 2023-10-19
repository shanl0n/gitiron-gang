import React from "react";

import NotificationIcon from "@mui/icons-material/Notifications";
import { useQuery } from "@apollo/client";
import { Badge, IconButton } from "@mui/material";
import { GET_PLAYER_TRADES, GetPlayerTradesData } from "../Pages/TradeCentre/TradeCentre";


const Notifications = () => {
  const { error, data } = useQuery<GetPlayerTradesData>(GET_PLAYER_TRADES);

  // if (error) alert("Error getting notifications");

  const incoming = data?.playerTrades.filter((trade) => trade.status === "PENDING" && trade.buyPlayer.fantasyTeam!.id === data.fantasyTeam.id);

  return (
    <IconButton color="primary" href="/trades">
      <Badge color="error" badgeContent={incoming?.length}>
        <NotificationIcon />
      </Badge>
    </IconButton>
  );
};

export default Notifications;