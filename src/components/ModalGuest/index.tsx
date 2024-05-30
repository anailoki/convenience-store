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
}

const ModalGuest = ({
  open,
  setOpen,
  onConfirm,
  onDismiss,
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
        <DialogTitle id='alert-dialog-title'>
          ¡Regístrate para Guardar Favoritos!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Para añadir productos a tu lista de favoritos, necesitas tener una
            cuenta. ¡Regístrate ahora y disfruta de todas las ventajas de ser un
            usuario registrado!
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
