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
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';

export default function Form(
  selectedContact,
  setSelectedContact,
  updateContact,
  handleClosePopup,
  deleteContact
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
      onSubmit={(e) => {
        e.preventDefault();
        updateContact();
      }}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h6">
          {selectedContact.id ? 'Edit Contact' : 'New Contact'}
        </Typography>
        {selectedContact.id ? (
          <Button color="error" onClick={() => deleteContact()}>
            Delete
          </Button>
        ) : null}
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {/* <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        > */}
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
        {/* </Stack> */}
      </Box>

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
        placeholder="none"
        name="DOB"
        value={selectedContact.DOB}
        required
        onChange={handleInput}
        InputLabelProps={{ shrink: true }}
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
                type="button"
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
        Í
      ></TextField>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={() => handleClosePopup()}>Cancel</Button>
      </Box>
    </Box>
  );
}
