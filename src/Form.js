import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Form(selectedContact) {
  var today = new Date().toISOString().slice(0, -14);
  console.log(today, selectedContact);
  return (
    <Box component="form">
      <TextField
        InputProps={{
          inputProps: { max: today },
        }}
        type="date"
      />
    </Box>
  );
}
