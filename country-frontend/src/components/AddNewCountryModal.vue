<!-- 
 This modal component is flexible and can be used throughout the application.
The name and closing/opening logic can be tweaked to 
make this modal component more dynamic and flexible 
-->
<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-full max-w-lg">
            <div class="flex justify-end">
                <button @click="closeModal" class="text-black">X</button>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import store from '@/store/globalStore';
/* A flag is set in vuex store to regulate the opening and closing of the modal gracefully */
const closeModal = () => {
    store.dispatch('setAddNewCountryModalOpenedStatus', false)
};
</script>