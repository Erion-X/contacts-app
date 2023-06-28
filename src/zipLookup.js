import axios from 'axios';

const USPS_API_URL = 'https://secure.shippingapis.com/ShippingAPI.dll';
const USER_ID = '2STUDEF595853';

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default async function lookupCityState(zipCode) {
  try {
    const response = await axios.get(USPS_API_URL, {
      params: {
        API: 'CityStateLookup',
        XML: `<CityStateLookupRequest USERID="${USER_ID}"><ZipCode ID="0"><Zip5>${zipCode}</Zip5></ZipCode></CityStateLookupRequest>`,
      },
    });
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    const city = capitalizeFirstLetter(
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
