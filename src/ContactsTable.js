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
  const [openDialog, setOpenDialog] = useState(false);

  function handleOpenDialog(e, idx) {
    e.preventDefault();
    setOpenDialog(true);
    console.log(idx);
  }

  return (
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
                <ButtonBase onClick={(e) => handleOpenDialog(e, idx)}>
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
  );
}
