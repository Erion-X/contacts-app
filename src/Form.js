import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';

export default function Form(selectedContact, setSelectedContact) {
  const today = new Date().toISOString().slice(0, -14);

  const handleInput = (e) => {
    let value = e.target.value;
    setSelectedContact({ ...selectedContact, [e.target.name]: value });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <TextField
        label="First Name"
        name="firstName"
        value={selectedContact.firstName}
        onChange={handleInput}
        required
      />
      <TextField
        label="Middle Name"
        name="middleName"
        value={selectedContact.middleName}
        onChange={handleInput}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={selectedContact.lastName}
        onChange={handleInput}
        required
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={selectedContact.phoneNumber}
        onChange={handleInput}
        required
      />
      <TextField
        type="date"
        label="Birthday"
        name="DOB"
        value={selectedContact.DOB}
        required
        InputProps={{
          inputProps: { max: today },
        }}
      />

      <Divider variant="middle">Address</Divider>

      <TextField
        label="Address Line 1"
        name="addressLn1"
        value={selectedContact.addressLn1}
        onChange={handleInput}
        required
      />
      <TextField
        label="Address Line 2"
        name="addressLn2"
        value={selectedContact.addressLn2}
        onChange={handleInput}
      />
      <TextField
        label="City"
        name="city"
        value={selectedContact.city}
        onChange={handleInput}
        required
      />
      <TextField
        label="State"
        name="state"
        value={selectedContact.state}
        onChange={handleInput}
        required
      />
      <TextField
        label="Zip Code"
        name="zipCode"
        value={selectedContact.zipCode}
        onChange={handleInput}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}
