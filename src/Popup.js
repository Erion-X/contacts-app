import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import Form from './Form';

export default function Popup(
  openPopup,
  selectedContact,
  handleClosePopup,
  setSelectedContact,
  updateContact,
  deleteContact
) {
  return (
    <Dialog open={openPopup}>
      {/* <DialogTitle>
        <Typography>
          {selectedContact.id ? 'Edit Contact' : 'New Contact'}
        </Typography>
      </DialogTitle> */}
      <DialogContent>
        {Form(
          selectedContact,
          setSelectedContact,
          updateContact,
          handleClosePopup,
          deleteContact
        )}
      </DialogContent>
    </Dialog>
  );
}
