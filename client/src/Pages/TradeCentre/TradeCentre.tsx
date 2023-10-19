import React, { useState } from "react";

import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { Player, PlayerTrade } from "@types";
import ComparePlayers from "../../components/ComparePlayers";

export const GET_PLAYER_TRADES = gql`
  query GetPlayerTrades {
    fantasyTeam {
      id
    }
    playerTrades {
      id
      sellPlayer {
        ...PlayerFragment
      }
      buyPlayer {
        ...PlayerFragment
      }
      status
    }
  }

  fragment PlayerFragment on Player {
    name
    fantasyTeam {
      id
      name
    }
    gameStatsSummary {
      rushing {
        attempts
        touchdowns
        yards
      }
      receiving {
        receptions
        yards
        touchdowns
      }
      passing {
        completions
        yards
        touchdowns
        interceptions
      }
      fumbles {
        fumbles
      }
      totalPoints
    }
  }
`;

export const UPDATE_TRADE = gql`
  mutation UpdatePlayerTrade($tradeId: ID!, $status: TradeStatus!) {
    updateTrade(id: $tradeId, status: $status)
  }
`;

export interface GetPlayerTradesData {
  fantasyTeam: {
    id: string;
  };
  playerTrades: PlayerTrade[];
}

const renderMenuItem = (text: string, onClick: () => void) => (
  <ListItem key={text} disablePadding>
    <ListItemButton onClick={onClick}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
);

const renderTrade = (mine: Player, other: Player, incoming: boolean) => {
  return (
    <ComparePlayers
      left={{
        title: mine.fantasyTeam!.name,
        subtitle: incoming ? "Buy" : "Sell",
        players: [mine],
      }}
      right={{
        title: other.fantasyTeam!.name,
        subtitle: incoming ? "Sell" : "Buy",
        players: [other],
      }}
    />
  );
};

const TradeCentre = () => {
  const { loading, error, data, refetch } =
    useQuery<GetPlayerTradesData>(GET_PLAYER_TRADES);

  const [updateTrade] = useMutation(UPDATE_TRADE);

  const [section, setSection] = useState("incoming");

  if (error) return <div>Error: ${error.clientErrors.join(", ")}</div>;
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No trades</div>;

  const incoming = data.playerTrades.filter(
    (trade) =>
      trade.buyPlayer.fantasyTeam!.id === data.fantasyTeam.id &&
      trade.status === "PENDING"
  );

  const outgoing = data.playerTrades.filter(
    (trade) =>
      trade.sellPlayer.fantasyTeam!.id === data.fantasyTeam.id &&
      trade.status === "PENDING"
  );

  const handleUpdate = (trade: PlayerTrade, status: string) => async () => {
    await updateTrade({
      variables: {
        tradeId: trade.id,
        status,
      },
    });
    await refetch();
  };

  const accepted = data.playerTrades.filter(
    (trade) => trade.status === "ACCEPTED"
  );
  const rejected = data.playerTrades.filter(
    (trade) => trade.status === "REJECTED"
  );
  const cancelled = data.playerTrades.filter(
    (trade) => trade.status === "CANCELLED"
  );

  const renderSection = () => {
    switch (section) {
      case "incoming":
        return (
          <>
            <Typography align="center" variant="h6" component="div">
              Incoming
            </Typography>
            {incoming.map((trade) => {
              return (
                <>
                  {renderTrade(trade.buyPlayer, trade.sellPlayer, true)}
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleUpdate(trade, "ACCEPTED")}
                  >
                    Accept
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={handleUpdate(trade, "REJECTED")}
                  >
                    Reject
                  </Button>
                </>
              );
            })}
          </>
        );
      case "outgoing":
        return (
          <>
            <Typography align="center" variant="h6" component="div">
              Outgoing
            </Typography>
            {outgoing.map((trade) => {
              return (
                <>
                  {renderTrade(trade.sellPlayer, trade.buyPlayer, false)}
                  <Button
                    color="error"
                    variant="contained"
                    onClick={handleUpdate(trade, "CANCELLED")}
                  >
                    Cancel
                  </Button>
                </>
              );
            })}
          </>
        );
      case "accepted":
        return (
          <>
            <Typography align="center" variant="h6" component="div">
              Accepted
            </Typography>
            {accepted.map((trade) =>
              trade.sellPlayer.fantasyTeam!.id === data.fantasyTeam.id
                ? renderTrade(trade.sellPlayer, trade.buyPlayer, false)
                : renderTrade(trade.buyPlayer, trade.sellPlayer, true)
            )}
          </>
        );
      case "rejected":
        return (
          <>
            <Typography align="center" variant="h6" component="div">
              Rejected
            </Typography>
            {rejected.map((trade) =>
              trade.sellPlayer.fantasyTeam!.id === data.fantasyTeam.id
                ? renderTrade(trade.sellPlayer, trade.buyPlayer, false)
                : renderTrade(trade.buyPlayer, trade.sellPlayer, true)
            )}
          </>
        );
      case "cancelled":
        return (
          <>
            <Typography align="center" variant="h6" component="div">
              Cancelled
            </Typography>
            {cancelled.map((trade) =>
              trade.sellPlayer.fantasyTeam!.id === data.fantasyTeam.id
                ? renderTrade(trade.sellPlayer, trade.buyPlayer, false)
                : renderTrade(trade.buyPlayer, trade.sellPlayer, true)
            )}
          </>
        );

      default:
        return <>Unsupported</>;
    }
  };

  return (
    <>
      <Box component={Paper}>
        <div>
          <Typography padding="15px" variant="h6" noWrap component="div">
            Player Trades
          </Typography>
        </div>
        <Box sx={{ display: "flex" }}>
          <div>
            <List>
              {renderMenuItem("Incoming", () => setSection("incoming"))}
              {renderMenuItem("Outgoing", () => setSection("outgoing"))}
            </List>
            <Divider />
            <List>
              {renderMenuItem("Accepted", () => setSection("accepted"))}
              {renderMenuItem("Rejected", () => setSection("rejected"))}
              {renderMenuItem("Canceled", () => setSection("cancelled"))}
            </List>
          </div>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            {renderSection()}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TradeCentre;
