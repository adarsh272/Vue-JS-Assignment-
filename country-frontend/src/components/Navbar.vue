<!-- Navbar component for branding and adding country -->
<template>
    <nav class="bg-indigo-700 border-b border-indigo-500">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <a class="flex flex-shrink-0 items-center mr-4">
                        <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
                        <span class="hidden md:block text-white text-2xl font-bold ml-2">Country Pedia</span>
                    </a>
                    <div class="md:ml-auto">
                        <div class="flex space-x-2">
                            <AddNewCountryButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import logo from '../assets/images/logo.webp'
import AddNewCountryButton from './AddNewCountryButton.vue';
</script>