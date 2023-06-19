import { forwardRef, Ref, ReactElement, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

interface IDialogProps {
  title: string;
  text: string;
  open: boolean;
  confirmAction: () => void;
  cancelAction: () => void;
  onClose: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ConfirmDialog = ({
  title,
  text,
  open,
  confirmAction,
  cancelAction,
  onClose,
}: IDialogProps) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelAction}>Cancelar</Button>
        <Button onClick={confirmAction}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};
