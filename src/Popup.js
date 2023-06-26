import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Form from './Form';

export default function Popup(openPopup, handleClosePopup, selectedContact) {
  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        {selectedContact ? 'Edit Contact' : 'New Contact'}
      </DialogTitle>
      <DialogContent>{Form(selectedContact)}</DialogContent>
      <DialogActions>
        <Button onClick={() => handleClosePopup()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
