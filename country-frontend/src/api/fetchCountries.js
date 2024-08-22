import axios from "./axios";
/* 
Custom function to fetch all countries present in our json file. 
I have defined this API call in its own file to keep code organized, 
easy to debug and can be resused if this app is enhanced in the future
*/
export async function fetchCountries() {
    const response = await axios.get('/api/countries');
    return response.data;
}