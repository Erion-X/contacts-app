import React, { useState, useEffect } from 'react';
import { contactsData, emptyContact } from './contactData';

import Container from '@mui/material/Container';
import ContactsTable from './ContactsTable';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Popup from './Popup';

function App() {
  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(emptyContact);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    setContactList(contactsData);
  }, []);

  //Open Form Popup & Sets Contact to Edit or Default New Contact
  function handleOpenForm(targetContact = { ...emptyContact }) {
    setSelectedContact({ ...targetContact });
    setOpenForm(true);
  }

  //Close Form Popup & Resets Selected Contact (New Contact Default)
  function handleCloseForm() {
    setOpenForm(false);
    setSelectedContact(emptyContact);
  }

  //Add & Update Existing Contacts
  function updateContact(formData) {
    if (formData.id === '') {
      formData.id = getUniqueId();
      setContactList([formData, ...contactList]);
    } else {
      setContactList(
        contactList.map((contact) => {
          return contact.id === formData.id ? formData : contact;
        })
      );
    }
    handleCloseForm();
  }

  //Delete Contact
  function deleteContact() {
    setContactList(
      contactList.filter((contact) => contact.id !== selectedContact.id)
    );
    setOpenForm(false);
    setSelectedContact(emptyContact);
  }

  //Simulates DB, Returns Unique Id
  function getUniqueId() {
    let uniqueId = contactList.reduce(
      (max, obj) => (obj.id > max ? obj.id : max),
      1
    );
    uniqueId++;
    return uniqueId;
  }

  return (
    <Container>
      <Box className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
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
              onClick={() => handleOpenForm()}
            >
              Add Contact
            </Button>
          </Toolbar>
        </AppBar>
        <div>{ContactsTable(contactList, handleOpenForm)}</div>
        <div>
          {Popup(
            openForm,
            selectedContact,
            handleCloseForm,
            updateContact,
            deleteContact
          )}
        </div>
      </Box>
    </Container>
  );
}

export default App;
