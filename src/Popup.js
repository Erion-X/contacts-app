import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Form from './Form';

export default function Popup(
  openPopup,
  selectedContact,
  handleClosePopup,

  updateContact,
  deleteContact
) {
  return (
    <Dialog open={openPopup} maxWidth="sm">
      <DialogContent>
        {Form(selectedContact, handleClosePopup, updateContact, deleteContact)}
      </DialogContent>
    </Dialog>
  );
}
