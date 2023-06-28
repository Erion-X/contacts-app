export default function contactGen(
  id,
  firstName,
  middleName,
  lastName,
  DOB,
  phoneNumber,
  addressLn1,
  addressLn2,
  city,
  state,
  zipCode
) {
  return {
    id,
    firstName,
    middleName,
    lastName,
    DOB,
    phoneNumber,
    addressLn1,
    addressLn2,
    city,
    state,
    zipCode,
  };
}
