<!-- 
Component used on the homepage to select a coountry
Added a loading spinner for better UI experience 
-->
<template>
    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <h1 class="text-3xl font-bold mb-2">Select a Country</h1>
        <div class="text-gray-500 mb-4">Know your country's global rank</div>
        <div v-if="countryListLoading">
            <div class="spinner"></div>
        </div>
        <div v-else>
            <Dropdown :dropdownList="countryList.countries" @update:selected="handleCountryChange" />
        </div>
    </div>
</template>

<script setup>
import Dropdown from './Dropdown.vue';
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const countryList = computed(() => store.state.countryList.countries)
const countryListLoading = computed(() => store.state.countryList.loading)

const selectedCountry = ref('')

const handleCountryChange = (selectedValue) => {
    selectedCountry.value = selectedValue
    store.dispatch('setCountry', selectedCountry.value)
    /* Fetch country data for the DisplayCountry component as soon as a country is selected*/
    store.dispatch('fetchCountryData');
}

onMounted(() => {
    /* Fetch country list on mount*/
    store.dispatch('fetchCountryList')
})

</script>
