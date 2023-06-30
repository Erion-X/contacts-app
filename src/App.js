import React, { useState, useEffect } from 'react';
import { contactsData } from './contactData';
import ContactsTable from './ContactsTable';
import Popup from './Popup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const emptyContact = {
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    DOB: '',
    phoneNumber: '',
    addressLn1: '',
    addressLn2: '',
    city: '',
    state: '',
    zipCode: '',
  };

  const [contactsList, setContactsList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(emptyContact);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    setContactsList(contactsData);
  }, []);

  //Opens Edit Contact Form
  function editContact(singleContact) {
    setOpenPopup(true);
    setSelectedContact({ ...singleContact });
  }

  //Opens Add Contact Form
  function addContact() {
    setSelectedContact({ ...emptyContact });
    setOpenPopup(true);
  }

  //Closes Edit/New Contact Form
  function handleClosePopup() {
    setSelectedContact(emptyContact);
    setOpenPopup(false);
  }

  //Deletes contact
  function deleteContact() {
    setContactsList(
      contactsList.filter((contact) => contact.id !== selectedContact.id)
    );
    setSelectedContact(emptyContact);
    setOpenPopup(false);
  }

  //Adds & Updates Existing Contacts
  function updateContact() {
    if (selectedContact.id === '') {
      selectedContact.id = findLargestIdNumber() + 1;
      setContactsList([selectedContact, ...contactsList]);
    } else {
      setContactsList(
        contactsList.map((contact) => {
          return contact.id === selectedContact.id ? selectedContact : contact;
        })
      );
    }
    handleClosePopup();
  }

  //Function to find unique ID
  function findLargestIdNumber() {
    let largestId = 0;
    for (let i = 0; i < contactsList.length; i++) {
      const contact = contactsList[i];
      if (contact.id > largestId) {
        largestId = contact.id;
      }
    }
    return largestId;
  }

  return (
    <Container>
      <Box className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              // color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Contacts App
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="secondary"
              onClick={() => addContact()}
            >
              Add Contact
            </Button>
          </Toolbar>
        </AppBar>
        <div>{ContactsTable(contactsList, editContact)}</div>
        <div>
          {Popup(
            openPopup,
            selectedContact,
            handleClosePopup,
            setSelectedContact,
            updateContact,
            deleteContact
          )}
        </div>
      </Box>
    </Container>
  );
}

export default App;
