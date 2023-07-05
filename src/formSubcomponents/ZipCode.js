import zipLookup from '../dataHelpers/zipLookup';

import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';

export default function ZipCode(
  register,
  errors,
  watch,
  setValue,
  trigger,
  alertFeedback
) {
  // Zip Code Button and Lookup Status Indicator States
  const [zipLookupButton, setZipLookupButton] = useState(false);
  const [loadingZip, setLoadingZip] = useState(false);

  //Monitor Zip Code Input > Enable Lookup Button
  const watchZipCode = watch('zipCode');
  useEffect(
    () =>
      /^[0-9]{5}(?:-[0-9]{4})?$/.test(watchZipCode)
        ? setZipLookupButton(true)
        : setZipLookupButton(false),
    [watchZipCode]
  );

  //Digit Only Input w/ Feedback
  function handleZipInput(e) {
    let value = e.target.value;
    console.log(register.zipCode);
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (value !== e.target.value) {
      alertFeedback('error', 'Only numbers allowed', 600);
    }
  }

  //Returns Hardcoded or USPS API Call City/State & Alerts User
  const handleZipLookup = () => {
    setLoadingZip(true);
    zipLookup(watchZipCode)
      .then((result) => {
        setValue('city', result.city);
        trigger('city'); //In case of error state, trigger forces re-validation
        setValue('state', result.state);
        trigger('state');

        //Feedbaback
        setTimeout(() => {
          setLoadingZip(false);
        }, 500);
        alertFeedback('success', 'Zip code found!');
      })
      .catch((error) => {
        setLoadingZip(false);
        alertFeedback('warning', 'Zip code not be found.');
        console.error('Error:', error);
      });
  };

  return (
    <TextField
      label="Zip Code"
      name="zipCode"
      required
      inputProps={{ maxLength: 5 }}
      {...register('zipCode', {
        required: 'Zip code is required',
        pattern: {
          value: /^[0-9]{5}(?:-[0-9]{4})?$/,
          message: 'Enter 5 digit zip code',
        },
        onChange: (e) => {
          handleZipInput(e);
        },
      })}
      error={Boolean(errors.zipCode)}
      helperText={errors.zipCode?.message}
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
  );
}
