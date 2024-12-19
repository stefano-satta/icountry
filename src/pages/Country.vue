<script setup lang="ts">
  import {CityWeather, Country, Meteo} from "../types";
  import {onMounted, ref} from "vue";
  import {store} from "../store";
  import {getCoordsByCityName, getCurrentWeather} from "../utils/api.ts";
  import {AxiosError, AxiosResponse} from "axios";
  import WeatherCapitalCountry from "../components/WeatherCapitalCountry.vue";
  import Box from "../components/Box.vue";
  import {capitalize} from "../utils";
  import router from "../router";

  let country: Country = store.getters.getCountry();
  let currentCity = ref<CityWeather>();
  let currentWeather = ref<Meteo>();
  let loadingCityName = ref(false);
  let loadingWeather = ref(false);
  let searchErrorCity = ref(false);
  let currency = ref("");

  onMounted(() => {
    console.log('mounted ', country)
    if (!country?.name) {
      router.push('/');
    }
    setCurrency();

    if (country?.name) {
      loadingWeather.value = true;
      getCoordsByCityName(country?.capital?.toString())
        .then(({data}: AxiosResponse<CityWeather[]>) => {
          const city = data[0];
          currentCity.value = {name: city?.name, country: city?.country || '', state: city?.state || ''};
          return {lat: city.lat, lon: city.lon, name: city.name, country: city.country, state: city.state}
        })
        .then((city: CityWeather) => getCurrentWeather(city.lat!, city.lon!))
        .then( ({data}) => currentWeather.value = data)
        .catch((err: AxiosError) => {
          searchErrorCity.value = true;
          currentCity.value = {name: '', country: '', state: ''}
        })
        .finally(() => loadingWeather.value = false)
    }

  })

  const setCurrency = () => {
    if (country?.name) {
      for (let [key,] of Object.entries(country?.currencies)) {
        currency.value = `${country?.currencies[key].name} (${country?.currencies[key].symbol})`;
      }
    }
  }

  const setLanguages = (): string => {
    let languages: string = '';
    for (let [key,] of Object.entries(country?.languages)) {
      languages = `${capitalize(country?.languages[key])}`;
    }
    return languages;
  }

</script>

<template>
  <div class="container mx-auto md:px-32">
    <h1 class="dark:text-white text-4xl font-bold mb-2 flex items-center">
      {{country?.name?.common}}
      <img :src="country?.flags?.png" class="w-8 h-7 ms-3" alt="flag"/>
    </h1>
    <h3 class="dark:text-white text-xl text-gray-500">{{country?.name?.official}}</h3>
    <h3 class="dark:text-white text-xl text-gray-500">{{country?.continents?.toString()}}</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full" v-if="!loadingCityName && !loadingWeather && country?.name">
      <WeatherCapitalCountry :current-weather="currentWeather"
                             :city="currentCity"
                             v-if="currentWeather && currentCity"
                             class="md:col-span-2"/>
      <div class="border rounded-3xl w-full">
          <iframe width="100%"
                  height="100%"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  class="border rounded-3xl"
                  :src="`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${country?.name?.common.toLowerCase()}+()&amp;t=&amp;z=5&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`">
        </iframe>
      </div>
      <Box label="POPULATION" :value="country?.population?.toLocaleString()" icon="fa-person"/>
      <Box label="CURRENCY" :value="currency" icon="fa-money-bill"/>
      <Box label="LANGUAGES" :value="setLanguages()" icon="fa-language"/>

    </div>
  </div>
</template>

<style scoped></style>