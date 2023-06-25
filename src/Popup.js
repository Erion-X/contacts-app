import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup(openPopup, handleClosePopup, selectedContact) {
  return (
    <Dialog open={openPopup}>
      <DialogTitle>CRUD Form Here!</DialogTitle>
      <DialogContent>
        {selectedContact.firstName} {selectedContact.middleName}{' '}
        {selectedContact.lastName}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClosePopup()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
