import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
import Grid from '@mui/material/Grid';

//Get ISO Format Date -- In Current Timezone
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const today = `${year}-${month}-${day}`;

export default function Form(
  selectedContact,
  handleClosePopup,
  updateContact,
  deleteContact
) {
  //React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    trigger,
  } = useForm();

  useEffect(() => {
    reset();
    for (const key in selectedContact) {
      setValue(`${key}`, selectedContact[key]);
    }
    //Added setValue temp. to eliminate dependency
  }, [setValue, selectedContact]);

  const onSave = (formData) => {
    updateContact(formData);
  };

  //Enforcing Numeric Input on Phone Number and Zip Code
  // if (e.target.name === 'phoneNumber' || e.target.name === 'zipCode') {
  //   value = value.replace(/\D/g, '');
  //   //Enforcing US Phone Number Formatt
  //   if (
  //     e.target.name === 'phoneNumber' &&
  //     value.length > 3 &&
  //     value.length <= 6
  //   ) {
  //     value = `${value.slice(0, 3)}-${value.slice(3)}`;
  //   } else if (value.length > 6) {
  //     value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
  //       6,
  //       10
  //     )}`;
  //   }
  // }

  // Zip Code Button and Lookup
  const [zipLookupButton, setZipLookupButton] = useState(false);
  const [loadingZip, setLoadingZip] = useState(false);
  // const [lookupError, setLookupError] = useState(false);

  const watchZipCode = watch('zipCode');
  useEffect(
    () =>
      /^[0-9]{5}(?:-[0-9]{4})?$/.test(watchZipCode)
        ? setZipLookupButton(true)
        : setZipLookupButton(false),
    [watchZipCode]
  );

  const handleZipLookup = () => {
    setLoadingZip(true);
    lookupCityState(watchZipCode)
      .then((result) => {
        setValue('city', result.city);
        //In case of error state, trigger forces re-validation
        trigger('city');
        //NOTE: Consider controller wrap to fix bug where placeholder is on top
        //of textfield after setValue
        //https://github.com/mui/material-ui/issues/17018
        setValue('state', result.state);
        trigger('state');
        setTimeout(() => {
          setLoadingZip(false);
        }, 600);
      })
      .catch((error) => {
        // setLoadingZip(false);
        // setLookupError(true);
        // setTimeout(() => {
        //   setLookupError(false);
        // }, 5000);
        console.error('Error:', error);
      });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSave)}
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

      <Grid>
        <TextField
          label="First Name"
          name="firstName"
          {...register('firstName', { required: 'First name is required' })}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
        />

        <TextField
          label="Middle Name"
          name="middleName"
          {...register('middleName')}
        />

        <TextField
          label="Last Name"
          name="lastName"
          {...register('lastName', { required: 'Last name is required' })}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
        />
      </Grid>

      <TextField
        label="Phone Number"
        name="phoneNumber"
        {...register('phoneNumber', {
          required: 'Phone number is required',
          pattern: {
            value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
            message: 'Please enter a valid US phone number',
          },
        })}
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber?.message}
      />

      <TextField
        label="Date of Birth"
        name="DOB"
        type="date"
        {...register('DOB', { required: 'Date of birth is required' })}
        placeholder="none"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputProps: { max: today },
        }}
        error={Boolean(errors.DOB)}
        helperText={errors.DOB?.message}
      />

      <Box my={2}>
        <Divider variant="middle">Address</Divider>
      </Box>
      <TextField
        label="Address Line 1"
        name="addressLn1"
        {...register('addressLn1', { required: 'Address is required' })}
        error={Boolean(errors.addressLn1)}
        helperText={errors.addressLn1?.message}
      />
      <TextField
        label="Address Line 2"
        name="addressLn2"
        {...register('addressLn2')}
      />
      <Grid>
        <TextField
          label="City"
          name="city"
          {...register('city', { required: 'City is required' })}
          error={Boolean(errors.city)}
          helperText={errors.city?.message}
        />
        <TextField
          label="State"
          name="state"
          {...register('state', { required: 'State is required' })}
          error={Boolean(errors.state)}
          helperText={errors.state?.message}
        />
        <TextField
          label="Zip Code"
          name="zipCode"
          {...register('zipCode', {
            required: 'Zip code is required',
            pattern: {
              value: /^[0-9]{5}(?:-[0-9]{4})?$/,
              message: 'Please enter a vaild 5 digit zip code',
            },
          })}
          error={Boolean(errors.zipCode)}
          helperText={errors.zipCode?.message}
          // helperText={lookupError ? 'Zip code could not be found...' : null}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  color="primary"
                  type="button"
                  disabled={!zipLookupButton}
                  onClick={() => {
                    handleZipLookup();
                  }}
                >
                  {loadingZip ? <CircularProgress /> : <SearchIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Grid>

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
