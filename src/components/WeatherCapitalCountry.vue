<script setup lang="ts">
  import {getCelsiusTemp, getWeatherIcon} from "../utils";
  import {CityWeather, Meteo} from "../types";

  const {city, currentWeather} = defineProps<{city: CityWeather, currentWeather: Meteo}>();

</script>

<template>
  <!--v-if="(!loadingCityName || !loadingWeather) && currentCity?.name"-->
    <div class="border shadow rounded-3xl p-8 flex justify-start items-center flex-col dark:text-white w-full">
      <div v-if="city?.name" class="text-3xl dark:text-white mb-6">
        <p>
          <i class="fa-solid fa-location-dot dark:text-white mr-2"></i>
          <span>{{ city?.name }}</span>
          <!--              <span v-if="currentCity?.state">, {{ currentCity?.state }}</span>
                        <span v-if="currentCity?.country">, {{ currentCity?.country.toUpperCase() }}</span>-->
        </p>
      </div>
      <div class="text-6xl font-bold">{{ getCelsiusTemp(currentWeather?.main.temp) }}</div>
      <img :src="getWeatherIcon(currentWeather?.weather[0]?.icon)" alt="weather-icon" width="80">
      <div class="text-4xl">{{ currentWeather?.weather[0].main }}</div>
      <div class="text-xl">{{ currentWeather?.weather[0].description }}</div>
      <div class="flex justify-between">
        <span class="me-2">Min: {{ getCelsiusTemp(currentWeather?.main.temp_min) }}</span>
        <span>Max: {{ getCelsiusTemp(currentWeather?.main.temp_max) }}</span>
      </div>
    </div>
</template>

<style scoped></style>