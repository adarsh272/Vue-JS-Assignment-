import { ref, onMounted } from 'vue';
import axios from './axios';
/* 
Custom function to fetch the continents present in our json file. 
I have defined this API call in its file to keep code organized, 
easy to debug and can be resused if this app is enhanced in the future
*/
export function fetchContinents() {
    const continents = ref([]);
    const loadingContinents = ref(false);
    const errorLoadingContinents = ref(null);

    const fetchContinents = async () => {
        loadingContinents.value = true;
        try {
            const response = await axios.get('/api/continents');
            continents.value = response.data;
            console.log(response.data)
        } catch (err) {
            errorLoadingContinents.value = err;
        } finally {
            loadingContinents.value = false;
        }
    };

    onMounted(() => {
        fetchContinents();
    });

    return {
        continents,
        loadingContinents,
        errorLoadingContinents,
        fetchContinents
    };
}
