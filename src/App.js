import React, { useState } from 'react';
import { contactsData } from './contactData';
import ContactsTable from './ContactsTable';
import Popup from './Popup';

function App() {
  const contact = {
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

  const [contactsList, setContactsList] = useState([contactsData]);
  const [selectedContact, setSelectedContact] = useState(contact);
  const [openPopup, setOpenPopup] = useState(false);

  //Opens Edit Contact Form
  function editContact(singleContact) {
    setOpenPopup(true);
    setSelectedContact({ ...singleContact });
  }

  //Closes Edit/New Contact Form
  function handleClosePopup() {
    setOpenPopup(false);
    setSelectedContact({});
  }

  return (
    <div className="App">
      <div>{ContactsTable(contactsList, editContact)}</div>
      <div>
        {Popup(
          openPopup,
          selectedContact,
          handleClosePopup,
          setSelectedContact
        )}
      </div>
    </div>
  );
}

export default App;
