import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PlayerDetail = ({ open, onClose }: Props) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Add Player</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onClose}>Add</Button>
    </DialogActions>
  </Dialog>
);
export default PlayerDetail;
