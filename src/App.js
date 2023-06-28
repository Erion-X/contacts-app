import React, { useState } from 'react';
import { contactsData } from './contactData';
import ContactsTable from './ContactsTable';
import Popup from './Popup';

function App() {
  const [contactsList, setContactsList] = useState([contactsData]);
  const [selectedContact, setSelectedContact] = useState({});
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
