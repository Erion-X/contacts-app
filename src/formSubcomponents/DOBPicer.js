import TextField from '@mui/material/TextField';

//Get ISO Format Date -- In Current Timezone
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const today = `${year}-${month}-${day}`;

export default function DOBPicker(register, errors) {
  return (
    <TextField
      label="Date of Birth"
      name="DOB"
      type="date"
      required
      {...register('DOB', {
        required: 'Date of birth is required',
        validate: (dob) => {
          return Date.parse(dob) <= Date.parse(today) || 'Enter a past date';
        },
      })}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputProps: { max: today },
      }}
      error={Boolean(errors.DOB)}
      helperText={errors.DOB?.message}
    />
  );
}
