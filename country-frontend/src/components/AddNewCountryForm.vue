<!--
Custom 'Add New Country Form' component
Having this independent form component allows easier input management.
We can create more such forms (if app is enhanced) and include it in modals or standalone pages.
Errors are handled on the UI as well as server level
User is shown detailed and simple error messages
-->
<template>
    <form @submit.prevent="handleSubmit">
        <h2 class="text-3xl text-center font-semibold mb-6">Add New Country Form</h2>

        <div>
            <label class="block text-gray-700 font-bold mb-2">Name*</label>
            <input v-model="countryName" @change="handleCountryName" class="border rounded w-full py-2 px-3 mb-8"
                :class="(errors.name || errorsFromServer?.name) && 'border-red-600'" type="text" name="countryName"
                placeholder="Enter Country Name" />
        </div>
        <div v-if="errors.name" class="error mb-6">{{ errors.name }}</div>
        <div v-else-if="errorsFromServer?.name" class="error mb-6">{{ errorsFromServer.name }}</div>
        <div>
            <label class="block text-gray-700 font-bold mb-2">Image*</label>
            <input @change="handleImage" class="border rounded w-full py-2 px-3 mb-8" type="file" name="image"
                :class="(errors.image || errorsFromServer?.image) && 'border-red-600'" />
        </div>
        <div v-if="errors.image" class="error mb-6">{{ errors.image }}</div>
        <div v-else-if="errorsFromServer?.image" class="error mb-6">{{ errorsFromServer.image }}</div>
        <div>
            <label class="block text-gray-700 font-bold mb-2">Continent*</label>
            <Dropdown class="mb-8" @update:selected="handleContinent" :dropdownList="continents" />
            <div v-if="errors.continent" class="error mb-6">{{ errors.continent }}</div>
        </div>
        <div>
            <label class="block text-gray-700 font-bold mb-2">Rank*</label>
            <input @change="handleRank" v-model="rank" class="border rounded w-full py-2 px-3 mb-8" type="number"
                name="rank" :class="(errors.rank || errorsFromServer?.rank) && 'border-red-600'" />
            <div v-if="errors.rank" class="error mb-6">{{ errors.rank }}</div>
            <div v-else-if="errorsFromServer?.rank" class="error mb-6">{{ errorsFromServer.rank }}</div>
        </div>
        <div>
            <button
                class='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                type="submit">Submit Request</button>
        </div>
    </form>
</template>

<script setup>

import { computed, ref } from 'vue';
import Dropdown from './Dropdown.vue';
import { validateCountryDetails } from '@/validation/validateCountryDetails';
import store from '@/store/globalStore';
import { fetchContinents } from '@/api/fetchContinents';
import { addNewCountry } from '@/api/addNewCountry';
/* Validation logic to placed in a different file to simply code strucutre*/
const { errors, validateName, validateImage, validateRank, validateContinent, validateForm } = validateCountryDetails()
const countryName = ref('')
const continent = ref('')
const rank = ref('')
const image = ref(null)
const { continents, loadingContinents, errorLoadingContinents } = fetchContinents()
const { loading, error, success, addCountry } = addNewCountry();
const errorsFromServer = computed(() => store.state.addCountryData.error)

const handleCountryName = (e) => {
    countryName.value = e.target.value
    validateName(e.target.value)
}

const handleImage = (e) => {
    image.value = e.target.files[0]
    validateImage(e.target.files[0])
}

const handleContinent = (value) => {
    continent.value = value
    validateContinent(value)
}

const handleRank = (e) => {
    rank.value = e.target.value
    validateRank(e.target.value)
}

const handleSubmit = () => {
    /* Validation layer is managed on component level and server communication is handed over to vuex store*/
    const isValid = validateForm({
        countryName: countryName.value,
        image: image.value,
        rank: rank.value,
        continent: continent.value
    });
    /* if UI validations pass, proceed to hit the API with a well-built payload*/
    if (isValid) {
        store.dispatch('addCountry', {
            countryName: countryName.value,
            image: image.value,
            rank: rank.value,
            continent: continent.value
        });
    }
};

</script>