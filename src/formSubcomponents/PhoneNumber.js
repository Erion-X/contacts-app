import { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function PhoneNumber(
  register,
  errors,
  setValue,
  trigger,
  isSubmitted,
  alertFeedback
) {
  const [prevValue, setPrevValue] = useState('');

  //Enforce Ph. Format: 123-456-7890 w/ Feedback
  //
  //Normally I'd use a library like react-input-mask or react-text-mask,
  //but I was having too much fun writing it.
  //
  //This function does 3 things:
  // 1 - rejects non digt inputs & alerts the user
  // 2 - automatically formats the phone number with dashes during input
  // 3 - allows user to copy/pase numbers in common formats w/o error alert
  //     (123)456-7890  OK
  //     (123) 456-7890 OK
  //     123.456.7890   OK
  //     123_456_7890   OK
  //     123/456*7890   Alert
  //     123x456x7890   Alert

  function phoneFormatter(e) {
    let value = e.target.value.replace(/[^0-9]/g, '');

    const isCopyPaste = Boolean(e.nativeEvent.inputType === 'insertFromPaste');
    const isFormatOK = Boolean(!/[^0-9\s\-.,_()]/.test(e.target.value));
    const didValueChange = Boolean(prevValue !== value);
    const isComplete = Boolean(value.length >= 10);
    const numbersOnlyAlert = () => {
      alertFeedback('error', 'Only numbers allowed', 600);
    };

    if (isCopyPaste) {
      if (isFormatOK) {
        setPrevValue(value);
      } else {
        numbersOnlyAlert();
        setPrevValue(value);
      }
    } else if (didValueChange) {
      setPrevValue(value);
    } else if (!isComplete) {
      numbersOnlyAlert();
    }

    if (value.length > 3 && value.length <= 6) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }
    e.target.value = value;

    if (isSubmitted) {
      setValue('phoneNumber', value);
      trigger('phoneNumber');
    }
  }

  return (
    <TextField
      label="Phone Number"
      name="phoneNumber"
      required
      inputProps={{ inputMode: 'numeric' }}
      {...register('phoneNumber', {
        required: 'Phone number is required',
        pattern: {
          value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
          message: 'Enter 10 digit US phone number: 123-456-7890',
        },
        onChange: (e) => {
          phoneFormatter(e);
        },
      })}
      error={Boolean(errors.phoneNumber)}
      helperText={errors.phoneNumber?.message}
    />
  );
}
