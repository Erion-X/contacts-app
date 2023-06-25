import Popup from './Popup';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';

import { useState } from 'react';

export default function ContactsTable(contacts) {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});

  function handleOpenPopup(contact) {
    setSelectedContact(contact);
    setOpenPopup(true);
  }

  function handleClosePopup() {
    setOpenPopup(false);
    setSelectedContact({});
  }

  return (
    <div>
      {openPopup ? Popup(openPopup, handleClosePopup, selectedContact) : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">City, State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <ButtonBase onClick={() => handleOpenPopup(contact)}>
                    {contact.firstName} {contact.middleName} {contact.lastName}
                  </ButtonBase>
                </TableCell>
                <TableCell align="right">
                  {contact.city}, {contact.state}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
