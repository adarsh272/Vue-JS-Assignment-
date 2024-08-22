<!-- 
A dedicated component to display information about the selected country.
Loading spinner to keep the UI user-friendly
Used optional chaining to avoid unnecessary breakage in the UI 
-->

<template>
    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <!-- When no country selected -->
        <div v-if="loading">
            <div class="spinner"></div>
        </div>
        <div v-else>
            <div v-if="countryData?.data?.name">
                <h1 class="text-3xl font-bold mb-10">{{ countryData?.data?.name }}</h1>
                <h1 class="text-2xl mb-10">{{ countryData?.data?.name }}'s Global Rank is No. {{ countryData.data.rank
                    }}
                </h1>
                <img class="max-w-full" :src="imageUrl" alt="">
            </div>
            <div v-else>
                <h1 class="text-3xl font-bold mb-10">No Country Selected</h1>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
/* The source of truth to fetch and display country details is separated out into a custom function and the vuex store. */
const countryData = computed(() => store.state.countryData);
const imageUrl = computed(() => `http://localhost:8080/${countryData.value?.data?.flag || 'images/default.png'}`);
const loading = computed(() => store.state.countryData.loading);
const error = computed(() => store.state.countryData.error);

</script>