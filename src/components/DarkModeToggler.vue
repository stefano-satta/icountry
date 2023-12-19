<script setup lang="ts">
import { ref } from 'vue';
    
let isDarkMode = ref(false);

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    setDarkModeClass();
}

const setDarkModeClass = () => {
    const rootElement = document.querySelector('html');
    rootElement?.classList.toggle('dark');
}

</script>

<template>
    <button @click="toggleDarkMode" 
        class="p-2 w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200">
        <i v-if="isDarkMode"
            class="fa-solid fa-sun text-amber-300 fa-lg"/>
        <i v-else class="fa-solid fa-moon text-sky-500 fa-lg"/>
    </button>
</template>

<style scoped></style>