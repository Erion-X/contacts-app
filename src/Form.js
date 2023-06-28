import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import lookupCityState from './zipLookup';

export default function Form(
  selectedContact,
  setSelectedContact,
  updateContact
) {
  const today = new Date().toISOString().slice(0, -14);

  const handleInput = (e) => {
    let value = e.target.value;
    setSelectedContact({ ...selectedContact, [e.target.name]: value });
  };

  // Zip Code Button and Lookup
  const [zipLookupActive, setZipLookupActive] = useState(false);

  useEffect(() => {
    if (selectedContact.zipCode.length === 5) {
      setZipLookupActive(true);
    } else {
      setZipLookupActive(false);
    }
  }, [selectedContact.zipCode]);

  const handleZipLookup = (e) => {
    e.preventDefault();
    lookupCityState(selectedContact.zipCode)
      .then((result) => {
        console.log('City:', result.city);
        console.log('State:', result.state);
        setSelectedContact({
          ...selectedContact,
          city: result.city,
          state: result.state,
        });
        console.log(selectedContact);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const test = {
    id: 2,
    firstName: 'test',
    middleName: 'test',
    lastName: 'test',
    DOB: '2018-04-05',
    phoneNumber: '555-555-5555',
    addressLn1: 'asdf',
    addressLn2: 'asdf',
    city: 'asdf',
    state: 'asdf',
    zipCode: 'asdf',
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
      <div>
        <Divider variant="middle">Address</Divider>
      </div>
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
      ></TextField>
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                color="primary"
                type="submit"
                disabled={!zipLookupActive}
                onClick={(e) => {
                  handleZipLookup(e);
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => {
            updateContact(e, test);
          }}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}
