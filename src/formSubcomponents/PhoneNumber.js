import TextField from '@mui/material/TextField';

export default function PhoneNumber(register, errors) {
  function phoneFormat(e) {
    let value = e.target.value;
    //Disregard non digit inputs
    value = value.replace(/[^0-9]/g, '');
    //Auto insert dashes to format ph # 123-456-7890
    if (value.length > 3 && value.length <= 6) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }
    e.target.value = value;
  }

  return (
    <TextField
      label="Phone Number"
      name="phoneNumber"
      required
      inputProps={{ maxLength: 12 }}
      {...register('phoneNumber', {
        required: 'Phone number is required',
        pattern: {
          value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
          message: 'Enter 10 digit US phone number: 123-456-7890',
        },
        onChange: (e) => {
          phoneFormat(e);
        },
      })}
      error={Boolean(errors.phoneNumber)}
      helperText={errors.phoneNumber?.message}
    />
  );
}
