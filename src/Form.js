import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import lookupCityState from './zipLookup';
import CircularProgress from '@mui/material/CircularProgress';

export default function Form(
  selectedContact,
  setSelectedContact,
  updateContact
) {
  const today = new Date().toISOString().slice(0, -14);

  const handleInput = (e) => {
    let value = e.target.value;
    //Enforcing Numeric Input on Phone Number and Zip Code
    if (e.target.name === 'phoneNumber' || e.target.name === 'zipCode') {
      value = value.replace(/\D/g, '');
      //Enforcing US Phone Number Formatt
      if (
        e.target.name === 'phoneNumber' &&
        value.length > 3 &&
        value.length <= 6
      ) {
        value = `${value.slice(0, 3)}-${value.slice(3)}`;
      } else if (value.length > 6) {
        value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
          6,
          10
        )}`;
      }
    }

    setSelectedContact({ ...selectedContact, [e.target.name]: value });
  };

  // Zip Code Button and Lookup
  const [zipLookupActive, setZipLookupActive] = useState(false);
  const [loadingZip, setLoadingZip] = useState(false);
  const [lookupError, setLookupError] = useState(false);

  useEffect(() => {
    if (selectedContact.zipCode.length === 5) {
      setZipLookupActive(true);
    } else {
      setZipLookupActive(false);
    }
  }, [selectedContact.zipCode]);

  const handleZipLookup = (e) => {
    e.preventDefault();
    setLoadingZip(true);
    lookupCityState(selectedContact.zipCode)
      .then((result) => {
        setSelectedContact({
          ...selectedContact,
          city: result.city,
          state: result.state,
        });
        //For Showcase Only
        setTimeout(() => {
          setLoadingZip(false);
        }, 600);
      })
      .catch((error) => {
        setLookupError(true);
        setLoadingZip(false);
        setTimeout(() => {
          setLookupError(false);
        }, 3000);
        console.error('Error:', error);
      });
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
        label="Date of Birth"
        name="DOB"
        value={selectedContact.DOB}
        required
        onChange={handleInput}
        InputProps={{
          inputProps: { max: today },
        }}
      />
      <Box my={2}>
        <Divider variant="middle">Address</Divider>
      </Box>

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
        helperText={lookupError ? 'Zip code could not be found...' : null}
        InputProps={{
          inputProps: { maxLength: 5, type: 'tel' },
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
                {loadingZip ? <CircularProgress /> : <SearchIcon />}
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
            e.preventDefault();
            updateContact(e);
          }}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}
