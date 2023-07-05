import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import DOBPicker from './formSubcomponents/DOBPicer';
import PhoneNumber from './formSubcomponents/PhoneNumber';
import ZipCode from './formSubcomponents/ZipCode';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import MapIcon from '@mui/icons-material/Map';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

export default function Form(
  selectedContact,
  handleCloseForm,
  updateContact,
  deleteContact,
  alertFeedback
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
    formState: { isSubmitted },
    getValues,
  } = useForm();

  useEffect(() => {
    reset();
    for (const key in selectedContact) {
      setValue(`${key}`, selectedContact[key]);
    }
    //Added reset & setValue to temp eliminate lint warning
  }, [reset, setValue, selectedContact]);

  const onSave = (formData) => {
    updateContact(formData);
    reset();
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

      <Box marginLeft={5} padding={1}>
        <Grid container spacing={1}>
          {Object.keys(errors).length > 0 && (
            <span>
              <Typography>Please fix the following errors:</Typography>
              {Object.values(errors).map((error, index) => (
                <Box xs="auto">
                  <Typography fontSize={'small'} key={index}>
                    {error.message}
                  </Typography>
                </Box>
              ))}
            </span>
          )}
        </Grid>
      </Box>

      <Grid container spacing={1}>
        <Box padding={3}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              required
              {...register('firstName', {
                required: 'First name is required',
              })}
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
              required
              {...register('lastName', {
                required: 'Last name is required',
              })}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
            />

            {PhoneNumber(
              register,
              errors,
              setValue,
              trigger,
              isSubmitted,
              alertFeedback
            )}

            {DOBPicker(register, errors)}
          </Stack>
        </Box>

        <Divider orientation="vertical" flexItem></Divider>

        <Box padding={3}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="addressLn1"
              required
              {...register('addressLn1', {
                required: 'Address is required',
              })}
              error={Boolean(errors.addressLn1)}
              helperText={errors.addressLn1?.message}
            />

            <TextField
              label="Address Line 2"
              name="addressLn2"
              {...register('addressLn2')}
            />

            <TextField
              label="City"
              name="city"
              required
              InputLabelProps={{
                shrink: getValues('city') === '' ? false : true,
              }}
              {...register('city', { required: 'City is required' })}
              error={Boolean(errors.city)}
              helperText={errors.city?.message}
            />

            <TextField
              label="State"
              name="state"
              required
              InputLabelProps={{
                shrink: getValues('city') === '' ? false : true,
              }}
              {...register('state', { required: 'State is required' })}
              error={Boolean(errors.state)}
              helperText={errors.state?.message}
            />

            {ZipCode(register, errors, watch, setValue, trigger, alertFeedback)}
          </Stack>
        </Box>
      </Grid>
      <Grid></Grid>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={() => handleCloseForm()}>Cancel</Button>
      </Box>
    </Box>
  );
}
