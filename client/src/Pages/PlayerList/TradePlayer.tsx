import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton, Radio } from "@mui/material";
import { useMutation, gql, useQuery } from "@apollo/client";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Avatar } from "@mui/material";
import { SwapHorizontalCircle } from "@mui/icons-material";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { FantasyTeam, Player } from "@types";
import PlayerTable from "../../components/PlayerTable";

const GET_FANTASY_TEAM = gql`
  query GetFantasyTeam {
    fantasyTeam {
      players {
        id
        name
        position
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
    }
  }
`
interface GetFantasyTeamData {
  fantasyTeam: FantasyTeam;
}

const TRADE_PLAYER = gql`
  mutation TradePlayer($sellPlayerId: ID!, $buyPlayerId: ID!) {
    tradePlayer(sellPlayerId: $sellPlayerId, buyPlayerId: $buyPlayerId)
  }
`;

interface Props {
  buyPlayerId: string;
  onTrade: () => void;
}

const TradePlayer = ({ buyPlayerId, onTrade}: Props) => {
  const [sellPlayerId, setSellPlayerId] = useState<string | undefined>(undefined);
  const [showPlayerSelect, setShowPlayerSelect] = useState(false);
  const { loading, error, data } = useQuery<GetFantasyTeamData>(GET_FANTASY_TEAM);

  const [tradePlayer] = useMutation(TRADE_PLAYER);
  const handleTradePlayer = async () => {
    const resp = await tradePlayer({
      variables: {
        buyPlayerId, sellPlayerId
      }
    });
    if (resp.errors) {
      alert("Error!");
    } else {
      onTrade();
    }
  };

  const handleSelectPlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSellPlayerId(event.target.value);
  }

  const renderPlayerSelect = (player: Player) => {
    return <Radio checked={player.id === sellPlayerId} value={player.id} onChange={handleSelectPlayer}/>
  }

  const renderPlayerSelectContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (!data) return <p>No players found</p>;
  
    return <PlayerTable players={data.fantasyTeam.players} renderAction={renderPlayerSelect}/>
  };
  return (
    <IconButton color="warning" onClick={() => setShowPlayerSelect(true)}>
      {showPlayerSelect && (
        <ConfirmationDialog
          open={showPlayerSelect}
          title="Trade Player"
          confirmText="Trade"
          onCancel={() => setShowPlayerSelect(false)}
          onConfirm={handleTradePlayer}
          content={renderPlayerSelectContent()}
        />
      )}
      <SwapHorizontalCircle />
    </IconButton>
  );
};

export default TradePlayer;
