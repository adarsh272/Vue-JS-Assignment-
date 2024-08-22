<template>
  <div>
    <Navbar />
    <HomePage />
    <AddNewCountryModal v-if="isModalOpen">
      <AddNewCountryForm />
    </AddNewCountryModal>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import HomePage from './pages/HomePage.vue';
import AddNewCountryModal from './components/AddNewCountryModal.vue';
import AddNewCountryForm from './components/AddNewCountryForm.vue';

import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const isModalOpen = computed(() => store.getters.getIsAddNewCountryModalOpened);
</script>
