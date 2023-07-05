import Form from './Form';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Popup(
  openForm,
  selectedContact,
  handleCloseForm,
  updateContact,
  deleteContact
) {
  //User Feedback w/ Alert Type
  const [alertNotify, setAlertNotify] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');

  function alertFeedback(type, msg, timeout = 2000) {
    setAlertMsg(msg);
    setAlertType(type);
    setAlertNotify(true);
    setTimeout(() => {
      closeAlertFeedback();
    }, timeout);
  }

  function closeAlertFeedback() {
    setAlertNotify(false);
    setAlertMsg('');
    setAlertType('');
  }

  return (
    <Dialog open={openForm} maxWidth="sm">
      <DialogContent>
        {Form(
          selectedContact,
          handleCloseForm,
          updateContact,
          deleteContact,
          alertFeedback
        )}

        <Snackbar
          open={alertNotify}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ position: 'absolute' }}
        >
          <Alert severity={`${alertType}`} sx={{ width: 'min' }}>
            {`${alertMsg}`}
          </Alert>
        </Snackbar>
      </DialogContent>
    </Dialog>
  );
}
