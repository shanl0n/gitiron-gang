import React, { useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton } from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { Player } from "@types";

const DROP_PLAYER = gql`
  mutation DropPlayer($playerId: ID!) {
    dropPlayer(id: $playerId)
  }
`;

interface Props {
  player: Player;
  onDrop: () => void;
}

const renderConfirmContent = (player: Player) => (
  <p>Are you sure you wish to drop {player.name}?</p>
);

const DropPlayer = ({ player, onDrop }: Props) => {
  const [confirming, setConfirming] = useState(false);
  const [dropPlayer] = useMutation(DROP_PLAYER, {
    variables: { playerId: player.id },
  });
  const handleDropPlayer = async () => {
    setConfirming(false);
    const resp = await dropPlayer();
    if (resp.errors) {
      alert("Error!");
    } else {
      onDrop();
    }
  };
  return (
    <>
      <ConfirmationDialog
        open={confirming}
        title="Drop Player"
        content={renderConfirmContent(player)}
        confirmText={"Drop"}
        onCancel={() => setConfirming(false)}
        onConfirm={handleDropPlayer}
      />
      <IconButton color="error" onClick={() => setConfirming(true)}>
        <RemoveCircleIcon />
      </IconButton>
    </>
  );
};

export default DropPlayer;
