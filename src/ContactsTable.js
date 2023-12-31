import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';

export default function ContactsTable(contactsList, editContact) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead color="gray">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">City, State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactsList.map((contact, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <ButtonBase onClick={() => editContact(contact)}>
                    {contact.firstName} {contact.middleName} {contact.lastName}
                  </ButtonBase>
                </TableCell>
                <TableCell align="right">{contact.phoneNumber}</TableCell>
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
