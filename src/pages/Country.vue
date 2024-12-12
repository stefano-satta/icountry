<script setup lang="ts">

  import {Country} from "../types";
  import {onMounted} from "vue";
  import {store} from "../store";

  let country: Country = store.getters.getCountry();

  onMounted(() => {
    console.log('country ', country);
    /*getCountry(countryName as string)
        .then((resp: AxiosResponse<Country[]>) => country.value =  resp.data[0])
        .catch( err => console.log(err))
        .finally(() => {})*/
  })


</script>

<template>
  <div class="container mx-auto md:px-32">
    <h1 class="dark:text-white text-4xl font-bold mb-2 flex items-center">
      {{country?.name?.common}}
      <img :src="country?.flags?.png" class="w-8 h-7 ms-3" alt="flag"/>
    </h1>
    <h3 class="dark:text-white text-xl text-gray-500">{{country.name.official}}</h3>
    <div class="grid">

    </div>
  </div>

</template>

<style scoped></style>