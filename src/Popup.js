import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Form from './Form';

export default function Popup(
  openPopup,
  selectedContact,
  handleClosePopup,
  setSelectedContact
) {
  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        {selectedContact ? 'Edit Contact' : 'New Contact'}
      </DialogTitle>
      <DialogContent>{Form(selectedContact, setSelectedContact)}</DialogContent>
      <DialogActions>
        <Button onClick={() => handleClosePopup()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
