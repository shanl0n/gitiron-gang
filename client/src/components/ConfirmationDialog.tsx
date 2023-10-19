import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  content: ReactNode;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
}

const ConfirmationDialog = ({title, content, confirmText, onCancel, onConfirm, open}:Props) => {
  return (
    <Dialog maxWidth='lg' component={Paper} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
