<script setup lang="ts">
import NavBar from './components/NavBar.vue';

</script>

<template>
  <NavBar/>
  <main class="bg-white dark:bg-slate-900 px-2 py-10 md:px-8">
    <router-view></router-view>
  </main>
</template>

<style scoped>
</style>