<!-- 
Container component to manage Select and Display components
Ceentralized alert messages using toaster
-->
<template>
    <section class="h-screen bg-indigo-50">
        <div class="container mx-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Select a country from dropdown (70% width) -->
                <main class="md:col-span-1">
                    <SelectCountry />
                </main>

                <!-- Sidebar Country Display content (30% width) -->
                <aside class="md:col-span-2">
                    <DisplayCountry />
                </aside>
            </div>
        </div>
    </section>
</template>

<script setup>
import SelectCountry from '@/components/SelectCountry.vue';
import DisplayCountry from '@/components/DisplayCountry.vue';
import { useToast } from 'vue-toastification';
import { watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const toast = useToast();
/* Observe the success and error of country addition and notify user */
watch(
    () => store.state.addCountryData.success,
    (newSuccess) => {
        if (newSuccess) {
            toast.success(newSuccess);
        }
    }
);

watch(
    () => store.state.addCountryData.error,
    (newError) => {
        if (newError) {
            toast.error(newError);
        }
    }
);


</script>

<!-- since styling is not a major concern for the assignment, I have not created a dedicated css file for component styles -->
<style>
.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #4A90E2;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
