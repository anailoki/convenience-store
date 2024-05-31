import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface IModalGuestProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDismiss?: () => void;
  onConfirm?: () => void;
  title: string;
  description: string;
}

const ModalGuest = ({
  open,
  setOpen,
  onConfirm,
  onDismiss,
  title,
  description,
}: IModalGuestProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    handleClose();
  };
  const handleDismiss = () => {
    onDismiss?.();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDismiss}>Seguir como invitado</Button>
          <Button onClick={handleConfirm} autoFocus variant='contained'>
            Registrarse
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalGuest;
