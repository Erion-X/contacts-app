import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

export default function ContactsTable(contactsList, editContact) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead color="gray">
            <TableRow>
              <TableCell>
                <Typography variant="body1">Name</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">Phone Number</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">City, State</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactsList.map((contact, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <ButtonBase onClick={() => editContact(contact)}>
                    <Typography variant="body1">
                      {contact.firstName} {contact.middleName}{' '}
                      {contact.lastName}
                    </Typography>
                  </ButtonBase>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">{contact.phoneNumber}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">
                    {contact.city}, {contact.state}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
