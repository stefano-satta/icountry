<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import {getAllCountry, getCountriesByContinent} from "../utils/api.ts";
  import {AxiosError, AxiosResponse} from "axios";
  import {Continent, Country} from "../types";
  import CountryItem from "../components/CountryItem.vue";
  import Loading from "../components/Loading.vue";
  import ErrorMsg from "../components/ErrorMsg.vue";
  import {ALL_CONTINENTS, capitalize} from "../utils";

  let countries = ref<Country[]>([]);
  let isLoading = ref<boolean>(false);
  let errorMsg = ref<string>("");
  let filterSelected = ref<Continent | 'all'>("all");

  onMounted(() => {
    getAllCountries();
  })

  const getAllCountries = () => {
    isLoading.value = true;
    errorMsg.value = "";
    filterSelected.value = 'all';
    getAllCountry()
        .then((resp: AxiosResponse<Country[]>) => countries.value = resp.data)
        .catch((err: AxiosError) => errorMsg.value = err.message)
        .finally(() => isLoading.value = false)
  }

  const filterCountries = (continent: Continent) => {
    isLoading.value = true;
    errorMsg.value = "";
    filterSelected.value = continent;
    getCountriesByContinent(continent)
        .then((resp: AxiosResponse<Country[]>) => countries.value = resp.data)
        .catch((err: AxiosError) => errorMsg.value = err.message)
        .finally(() => isLoading.value = false)
  }
</script>

<template>
  <div class="container mx-auto px-2 md:px-16 lg:px-32">
    <h1 class="dark:text-white text-4xl font-bold mb-6">World countries</h1>
    <div class="mb-8 overflow-x-auto flex p-2" role="group" v-if="!errorMsg">
      <button class="mr-2 py-2 px-3 rounded-3xl dark:text-white bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 disabled:bg-gray-200 dark:disabled:bg-slate-400"
              :disabled="filterSelected === 'all'"
              @click="getAllCountries()">
        All
      </button>
      <button class="mr-2 py-2 px-3 rounded-3xl dark:text-white bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 disabled:bg-gray-200 dark:disabled:bg-slate-400"
              @click="filterCountries(continent.toLowerCase() as Continent)"
              :disabled="filterSelected === continent"
              v-for="continent in ALL_CONTINENTS" :key="continent">
        {{ capitalize(continent) }}
      </button>
    </div>
    <Loading v-if="isLoading"/>
    <ErrorMsg :text="errorMsg" v-if="errorMsg"/>
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
        <CountryItem v-for="country in countries" :country="country" v-if="!isLoading && !errorMsg"/>
    </div>
  </div>
</template>

<style scoped></style>