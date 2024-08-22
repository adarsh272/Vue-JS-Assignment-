<!-- 
Custom dropdown component that can be used throughout the app. 
Using props to make it dynamic
-->
<template>
    <div>
        <select id="dropdownData" v-model="selectedValue" @change="changeDropdownValue"
            class="bg-indigo-50 border border-indigo-300 text-indigo-900 rounded-lg block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white"
            placeholder="ll">
            <option selected disabled value="">{{ placeHolder }}</option>
            <option v-for="option in dropdownList" :key="option.id" :value="option.id">{{ option.name }}</option>
        </select>


    </div>
</template>

<script setup>

import { defineProps, ref, defineEmits } from 'vue';

const selectedValue = ref('')
const emit = defineEmits(['update:selected'])

defineProps({
    dropdownList: {
        type: Array,
        default: []
    },
    placeHolder: {
        type: String,
        default: 'Select an option'
    }
})

const changeDropdownValue = (e) => {
    selectedValue.value = e.target.value
    emit('update:selected', selectedValue.value);
}

</script>