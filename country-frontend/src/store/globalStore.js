import { createStore } from 'vuex';
import { fetchCountryById } from '@/api/fetchCountryDetails';
import { addNewCountry } from '@/api/addNewCountry';
import { fetchCountries } from '@/api/fetchCountries';

/*Utlized the flexibility and robustness of Vuex to manage:
- Validations
- API responses
- Success and Error states
Separation of the above logic layers into the Vuex helps in debugging issues easily.
*/

const store = createStore({
    state() {
        return {
            selectedCountry: '',
            countryData: {
                data: {},
                loading: false,
                error: null
            },
            isAddNewCountryModalOpened: false,
            errorsInCountryValidation: {},
            addCountryData: {
                loading: false,
                error: '',
                success: ''
            },
            countryList: {
                countries: [],
                loading: false,
                error: ''
            }
        };
    },
    getters: {
        getSelectedCountry(state) {
            return state.selectedCountry;
        },
        getIsAddNewCountryModalOpened(state) {
            return state.isAddNewCountryModalOpened
        }
    },
    mutations: {
        SET_COUNTRY_LIST(state, list) {
            state.countryList.countries = list
        },
        SET_COUNTRY_LIST_LOADING_STATUS(state, status) {
            state.countryList.loading = status
        },
        SET_COUNTRY_LIST_ERROR(state, error) {
            state.countryList.error = error
        },
        SET_COUNTRY(state, newValue) {
            state.selectedCountry = newValue;
        },
        SET_COUNTRY_DATA(state, data) {
            state.countryData.data = data;
        },
        SET_COUNTRY_DATA_LOADING_STATUS(state, loading) {
            state.countryData.loading = loading;
        },
        SET_COUNTRY_DATA_ERROR(state, error) {
            state.countryData.error = error;
        },
        SET_ADD_NEW_COUNTRY_MODAL_OPENED_STATUS(state, status) {
            state.isAddNewCountryModalOpened = status
        },
        ADD_COUNTRY(state, country) {
            state.countryData = country
        },
        SET_ADD_COUNTRY_LOADING_STATUS(state, loadingStatus) {
            state.addCountryData.loading = loadingStatus
        },
        SET_ADD_COUNTRY_ERROR_FROM_SERVER(state, errors) {
            state.addCountryData.error = errors;
        },
        SET_ADD_COUNTRY_SUCCESS_FROM_SERVER(state, success) {
            state.addCountryData.success = success;
        },
    },
    actions: {
        setCountry({ commit }, newValue) {
            commit('SET_COUNTRY', newValue);
        },
        async fetchCountryList({ commit }) {
            commit('SET_COUNTRY_LIST_LOADING_STATUS', true);
            try {
                const countries = await fetchCountries();
                commit('SET_COUNTRY_LIST', countries);
            } catch (err) {
                commit('SET_COUNTRY_DATA_ERROR', err.message || 'An error occurred');
            } finally {
                commit('SET_COUNTRY_LIST_LOADING_STATUS', false);
            }
        },
        async fetchCountryData({ commit, state }) {
            if (!state.selectedCountry) return;

            commit('SET_COUNTRY_DATA_LOADING_STATUS', true);
            try {
                const data = await fetchCountryById(state.selectedCountry);
                commit('SET_COUNTRY_DATA', data);
            } catch (error) {
                commit('SET_COUNTRY_DATA_ERROR', error);
            } finally {
                commit('SET_COUNTRY_DATA_LOADING_STATUS', false);
            }
        },
        setAddNewCountryModalOpenedStatus({ commit }, status) {
            commit('SET_ADD_NEW_COUNTRY_MODAL_OPENED_STATUS', status)
        },
        async addCountry({ commit }, country) {
            commit('SET_ADD_COUNTRY_LOADING_STATUS', true);
            const formData = new FormData();
            formData.append('name', country.countryName);
            formData.append('continent', country.continent);
            formData.append('rank', country.rank);
            formData.append('image', country.image);

            try {
                const response = await addNewCountry(formData);
                commit('SET_ADD_COUNTRY_SUCCESS_FROM_SERVER', response.data.message);
                this.dispatch('fetchCountryList')
                commit('SET_ADD_NEW_COUNTRY_MODAL_OPENED_STATUS', false)
            } catch (err) {
                commit('SET_ADD_COUNTRY_ERROR_FROM_SERVER', err.response ? err?.response?.data?.error : "An error occurred");
            } finally {
                commit('SET_ADD_COUNTRY_LOADING_STATUS', false);
            }
        }
    }
});

export default store;
