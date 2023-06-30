import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
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
