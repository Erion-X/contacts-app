import React, { useState, useEffect } from 'react';
import { contactsData } from './contactData';
import ContactsTable from './ContactsTable';
import Popup from './Popup';

function App() {
  const emptyContact = {
    id: Number,
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

  //Closes Edit/New Contact Form
  function handleClosePopup() {
    setSelectedContact(emptyContact);
    setOpenPopup(false);
  }

  //Updates Existing Contact
  function updateContact(e) {
    e.preventDefault();
    setContactsList(
      contactsList.map((contact) => {
        return contact.id === selectedContact.id ? selectedContact : contact;
      })
    );
    handleClosePopup();
  }

  return (
    <div className="App">
      <div>{ContactsTable(contactsList, editContact)}</div>
      <div>
        {Popup(
          openPopup,
          selectedContact,
          handleClosePopup,
          setSelectedContact,
          updateContact
        )}
      </div>
    </div>
  );
}

export default App;
