import axios from 'axios';

//Hardcoded Zip Codes w/ City/State Info
const makeCSObj = (city, state) => ({
  city,
  state,
});

const zipCityState = {
  10001: makeCSObj('New York', 'NY'),
  10003: makeCSObj('New York', 'NY'),
  60601: makeCSObj('Chicago', 'IL'),
  60602: makeCSObj('Boston', 'MA'),
  '02113': makeCSObj('Boston', 'MA'),
  '02114': makeCSObj('Boston', 'MA'),
  94601: makeCSObj('Oakland', 'CA'),
  94603: makeCSObj('Oakland', 'CA'),
  94102: makeCSObj('San Francisco', 'CA'),
  94103: makeCSObj('San Francisco', 'CA'),
};

//Corrects All-Caps From API
const capEachWord = (str) => {
  const words = str.toLowerCase().split(' ');
  words.forEach(
    (word, idx) =>
      (words[idx] = word.charAt(0).toUpperCase().concat(word.slice(1)))
  );

  return words.join(' ');
};

export default async function lookupCityState(zipCode) {
  //Check Pre-loaded Memory for City/State
  if (zipCityState.hasOwnProperty(zipCode)) {
    return zipCityState[zipCode];
  } else {
    //USPS API Call
    const USPS_API_URL = 'https://secure.shippingapis.com/ShippingAPI.dll';
    const USER_ID = '2STUDEF595853';

    try {
      const response = await axios.get(USPS_API_URL, {
        params: {
          API: 'CityStateLookup',
          XML: `<CityStateLookupRequest USERID="${USER_ID}"><ZipCode ID="0"><Zip5>${zipCode}</Zip5></ZipCode></CityStateLookupRequest>`,
        },
      });
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const city = capEachWord(
        xmlDoc.getElementsByTagName('City')[0].innerHTML
      );
      const state = xmlDoc.getElementsByTagName('State')[0].innerHTML;

      return {
        city,
        state,
      };
    } catch (error) {
      console.error('Error looking up city and state:', error);
      throw error;
    }
  }
}
