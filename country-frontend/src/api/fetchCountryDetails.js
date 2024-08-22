import axios from './axios';
/* 
Custom Hook - fetch an individual country selected in the dropdown. 
I have defined this API call in its file to keep code organized, 
easy to debug and can be resused if this app is enhanced in the future
*/
export async function fetchCountryById(countryId) {
    try {
        const response = await axios.get(`/api/country/${countryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}