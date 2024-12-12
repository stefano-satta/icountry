<script setup lang="ts">
    import {Country} from '../types';
    import {truncateText} from './../utils';
    import router from "../router";
    import {store} from "../store";

    const {country} = defineProps<{country: Country}>();

    const goToCountryDetails = () => {
      store.actions.setCountry(country);
      router.push(`/country/${country?.name?.common.toLowerCase()}`);
    }

</script>

<template>
  <div class="border-1 shadow-lg rounded-lg p-4 flex items-center bg-gray-50 cursor-pointer dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600"
       @click="goToCountryDetails()">
    <img :src="country?.flags?.png" alt="" class="w-12">
    <div class="ps-4">
      <h3 class="text-xl dark:text-white font-bold">{{truncateText(country?.name.common, 25)}}</h3>
      <p class="text-gray-500 dark:text-gray-300">{{truncateText(country?.name.official, 25)}}</p>
    </div>
  </div>
</template>

<style scoped></style>