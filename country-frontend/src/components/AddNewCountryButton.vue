<!--
Custom button component for opening a modal used to add a new country
We could have added this button directly into the Navbar, but a spearate component
makes the code readable, simplifies other components and can be resued.
-->
<template>
    <button @click="addNewCountryButtonClicked"
        class="text-white bg-green-700 hover:bg-green-800 rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 inline">
            <path fill-rule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clip-rule="evenodd" />
        </svg>
        Add New Country</button>
</template>

<script setup>
import { useStore } from 'vuex';
/*
On click of the 'Add New Country' component, we save a flag in the vuex store for the modal status (open or close).
We need this flag to regulate the rendering of the modal component
*/
const store = useStore();
const addNewCountryButtonClicked = () => {
    store.dispatch('setAddNewCountryModalOpenedStatus', true)
}
</script>