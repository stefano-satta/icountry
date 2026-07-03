<script setup lang="ts">
  import {CityWeather, Country, Meteo} from "../types";
  import {onMounted, ref} from "vue";
  import {store} from "../store";
  import {getCurrentWeather} from "../utils/api.ts";
  import {AxiosError} from "axios";
  import WeatherCapitalCountry from "../components/WeatherCapitalCountry.vue";
  import Box from "../components/Box.vue";
  import {capitalize} from "../utils";
  import router from "../router";

  let country: Country = store.getters.getCountry();
  let currentCity = ref<CityWeather | undefined>();
  let currentWeather = ref<Meteo>();
  let loadingWeather = ref(false);
  let searchErrorCity = ref(false);
  let currency = ref("");

  onMounted(() => {
    if (!country?.names) {
      router.back();
    } else {
      currentCity.value = {name: country?.capitals[0]?.name, country: country?.names?.common, state: ''};
      setCurrency();

      if (country?.names) {
        loadingWeather.value = true;
        getCurrentWeather(country.coordinates.lat!, country.coordinates.lng!)
            .then( ({data}) => {
              currentWeather.value = data;
              console.log(data, currentWeather.value)
            })
            .catch((err: AxiosError) => {
              searchErrorCity.value = true;
              currentCity.value = {name: '', country: '', state: ''}
            })
            .finally(() => loadingWeather.value = false)
      }
    }
  })

  const setCurrency = () => {
    if (country?.names) {
      currency.value = `${country.currencies[0].name} (${country?.currencies[0].symbol})`;
    }
  }

  const setLanguages = (): string => {
    let languages: string = '';
  
    if(!country?.languages) {
      return '';
    }

    languages = `${capitalize(country?.languages[0]?.name)}`
    return languages;
  }
</script>

<template>
  <div class="container mx-auto md:px-32">
    <h1 class="dark:text-white text-4xl font-bold mb-2 flex items-center">
      {{country?.names?.common}}
      <img :src="country?.flag?.url_svg" class="w-8 h-7 ms-3" alt="flag"/>
    </h1>
    <h3 class="dark:text-white text-xl text-gray-500">{{country?.names?.official}}</h3>
    <h3 class="dark:text-white text-xl text-gray-500">{{country?.continents?.toString()}}</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full" v-if="currentWeather">
      <WeatherCapitalCountry :current-weather="currentWeather"
                             :city="currentCity"
                             v-if="currentWeather"
                             class="md:col-span-2"/>
      <div class="border rounded-3xl w-full">
          <iframe width="100%"
                  height="100%"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  class="border rounded-3xl"
                  :src="`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${country?.names?.common.toLowerCase()}+()&amp;t=&amp;z=5&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`">
        </iframe>
      </div>
      <Box label="POPULATION" :value="country?.population?.toLocaleString()" icon="fa-person"/>
      <Box label="CURRENCY" :value="currency" icon="fa-money-bill"/>
      <Box label="LANGUAGES" :value="setLanguages()" icon="fa-language"/>

    </div>
  </div>
</template>

<style scoped></style>