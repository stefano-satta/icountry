<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import {getAllCountry} from "../utils/api.ts";
  import {AxiosError, AxiosResponse} from "axios";
  import {Country} from "../types";
  import CountryItem from "../components/CountryItem.vue";
  import Loading from "../components/Loading.vue";
  import ErrorMsg from "../components/ErrorMsg.vue";

  let countries = ref<Country[]>([]);
  let isLoading = ref<boolean>(false);
  let errorMsg = ref<string>("");

  onMounted(() => {
    isLoading.value = true;
    errorMsg.value = "";
    getAllCountry()
        .then((resp: AxiosResponse<Country[]>) => countries.value = resp.data)
        .catch((err: AxiosError) => errorMsg.value = err.message)
        .finally(() => isLoading.value = false)
  })

</script>

<template>
  <div class="container mx-auto px-2 md:px-16 lg:px-32">
    <h1 class="dark:text-white text-4xl font-bold mb-10">World countries</h1>
    <Loading v-if="isLoading"/>
    <ErrorMsg :text="errorMsg" v-if="errorMsg"/>
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
        <CountryItem v-for="country in countries" :country="country" v-if="!isLoading"/>
    </div>
  </div>
</template>

<style scoped></style>