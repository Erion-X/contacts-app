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
      <div>
        {Object.keys(errors).length > 0 && (
          <div>
            <List dense={'true'} fontSize={'small'}>
              Please fix the following errors:
              {Object.values(errors).map((error, index) => (
                <Typography fontSize={'small'} key={index}>
                  {error.message}
                </Typography>
              ))}
            </List>
          </div>
        )}
      </div>
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
          required
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
          required
          {...register('lastName', { required: 'Last name is required' })}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
        />
      </Grid>

      {PhoneNumber(register, errors, alertFeedback)}

      {DOBPicker(register, errors)}

      <Box my={2}>
        <Divider variant="middle">Address</Divider>
      </Box>
      <TextField
        label="Address Line 1"
        name="addressLn1"
        required
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
          required
          {...register('city', { required: 'City is required' })}
          error={Boolean(errors.city)}
          helperText={errors.city?.message}
        />
        <TextField
          label="State"
          name="state"
          required
          {...register('state', { required: 'State is required' })}
          error={Boolean(errors.state)}
          helperText={errors.state?.message}
        />

        {ZipCode(register, errors, watch, trigger, setValue, alertFeedback)}
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
        <Button onClick={() => handleCloseForm()}>Cancel</Button>
      </Box>
    </Box>
  );
}
