import axios from './axios';
/*Post request to save a new country in our database (json file)*/
export const addNewCountry = async (formData) => {
    const response = await axios.post('/api/country', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};
