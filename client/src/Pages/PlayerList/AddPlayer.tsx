import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { useMutation, gql } from "@apollo/client";

const ADD_PLAYER = gql`
  mutation AddPlayer($playerId: ID!) {
    addPlayer(id: $playerId)
  }
`;

interface Props {
  playerId: string;
  onAdd: () => void;
}

const AddPlayer = ({ playerId, onAdd }: Props) => {
  const [addPlayer] = useMutation(ADD_PLAYER, {
    variables: { playerId },
  });
  const handleAddPlayer = async () => {
    console.log(`adding player ${playerId}`);
    const resp = await addPlayer();
    if (resp.errors) {
      alert("Error!");
    } else {
      onAdd();
    }
  };
  return (
    <IconButton color="primary" onClick={() => handleAddPlayer()}>
      <AddCircleIcon />
    </IconButton>
  );
};

export default AddPlayer;
