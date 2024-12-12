<script setup lang="ts">
import {ref, watch} from 'vue';
  import head_wallpaper from './../assets/images/travel_bg.png';
  import {Country} from '../types';
  import router from "../router";
  import {getCountry} from "../utils/api.ts";
  import {AxiosError, AxiosResponse} from "axios";
  import {store} from "../store";
  import ErrorMsg from "../components/ErrorMsg.vue";
  import Loading from "../components/Loading.vue";

  let newCountry = ref('');
  let isLoading = ref<boolean>(false);
  let errorMsg = ref<string>("");
  watch(newCountry, () => errorMsg.value = "");

  const searchCountry = (e: Event) => {
    const country = (e.target as HTMLInputElement).value;
    if (country.length == 0) return;
    isLoading.value = true;
    newCountry.value = "";

    getCountry(country)
      .then((resp: AxiosResponse<Country[]>) => {
        store.actions.setCountry(resp.data[0]);
        router.push(`/country/${country?.toLowerCase()}`);
      })
      .catch((err: AxiosError) => errorMsg.value = err.message)
      .finally(() => {
        isLoading.value = false;
      })
  }
</script>

<template>
  <div class="w-full py-8 flex justify-center items-center flex-col">
    <img :src="head_wallpaper" alt="todolist_img" class="md:max-w-2xl mb-2">
    <h1 class="text-black dark:text-white text-5xl font-bold mb-8">iCountry</h1>
    <div class="flex justify-center items-center w-full md:w-3/4 lg:w-1/2 relative">
      <input type="text"
        class="border bg-white dark:bg-slate-700 rounded-full py-4 w-full
          focus:shadow focus:shadow-grey-900 focus:outline-none placeholder:text-center text-center text-black dark:text-white"
        placeholder="Search country"
        v-model="newCountry"
        @keyup.enter="searchCountry($event)"/>
      <Loading v-if="isLoading" class="absolute right-4"/>
    </div>
    <ErrorMsg :text="errorMsg" v-if="errorMsg" class="mt-8"/>
  </div>
</template>

<style scoped></style>