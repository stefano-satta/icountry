<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import {getCityNameByCoords, getCoordsByCityName, getCurrentWeather} from './../utils/api';
    import {getWeatherIcon, getCelsiusTemp} from './../utils';
    import { CityWeather, Meteo } from '../types';
    import { AxiosResponse } from 'axios';
    import Loading from './../components/Loading.vue';


    const currentCity = ref<CityWeather>();
    const currentWeather = ref<Meteo>();
    const loadingCityName = ref(false);
    const loadingWeather = ref(false);
    const searchErrorCity = ref(false);

    onMounted(() => {
        getPositionCoords();
    })

    onUnmounted(() => {

    })

    const getPositionCoords = () => {
        if (navigator.geolocation) {
            console.log('sto entrando');
            loadingCityName.value = true;
            loadingWeather.value = true;
            
            navigator.geolocation.getCurrentPosition(function(location) {
                console.log(location.coords.latitude);
                console.log(location.coords.longitude);
                console.log(location.coords.accuracy);
                
                getCityNameByCoords(location.coords.latitude, location.coords.longitude)
                    .then(({data}: AxiosResponse<CityWeather[]>) => {
                        const city = data[0];
                        currentCity.value = {name: city.name, country: city.country, state: city.state};
                        console.log('coords to city name', data, currentCity.value);
                    })
                    .finally(() => loadingCityName.value = false)
                getCurrentWeather(location.coords.latitude, location.coords.longitude)
                    .then(({data}) => {
                        currentWeather.value = data;
                        console.log('success city meteo ', data)
                    })
                    .finally(() => loadingWeather.value = false)
            },
            (err) => {
                console.log('errore ', err);
                loadingCityName.value = false;
                loadingWeather.value = false;
            });
        }
    }

    const searchCityWeather = (e: Event) => {
        searchErrorCity.value = false;
        loadingWeather.value = true;
        getCoordsByCityName((e.target as HTMLInputElement).value)
            .then(({data}: AxiosResponse<CityWeather[]>) => {
                console.log(data[0])
                const city = data[0];
                currentCity.value = {name: city?.name, country: city?.country || '', state: city?.state || ''};
                return {lat: city.lat, lon: city.lon, name: city.name, country: city.country, state: city.state}
            })
            .then((city: CityWeather) => getCurrentWeather(city.lat!, city.lon!))
            .then( ({data}) => {
                currentWeather.value = data;
                console.log('success city meteo ', data)
            })
            .catch( (err) => {
                searchErrorCity.value = true;
                currentCity.value = {name: '', country: '', state: ''}
                console.log('erroreeee req ', err );
            })
            .finally(() => loadingWeather.value = false)
    }
</script>

<template>
    <div class="w-full py-8 flex justify-center items-center flex-col mb-12">
        <div v-if="loadingCityName || loadingWeather" class="full-w h-full flex items-center justify-center">
            <Loading/>
        </div>
        <p v-if="!loadingCityName || !loadingWeather" class="text-5xl dark:text-white">Open Meteo</p>
        <input v-if="!loadingCityName || !loadingWeather"
            type="text"
            class="border bg-white dark:bg-slate-700 rounded-full px-4 py-4 w-4/6 md:w-1/2 
                focus:shadow focus:shadow-grey-900 focus:outline-none placeholder:text-center dark:text-white mt-16 text-center"
            value=""
            placeholder="Search city with OpenWeatherMap service"
            @keyup.enter="searchCityWeather($event)"/>
        <p class="text-red-700" v-if="searchErrorCity"><small>no cities found!</small></p>
    </div>
    <div class="w-full py-8 flex justify-center items-center flex-col" v-if="(!loadingCityName || !loadingWeather) && currentCity?.name">
        <div class="border rounded-lg p-8 w-96 flex justify-center items-center flex-col dark:text-white">
            <div v-if="currentCity?.name" class="text-3xl dark:text-white mb-6">
                <p>
                    <i class="fa-solid fa-location-dot dark:text-white mr-2"></i>
                    <span>{{ currentCity?.name }}</span>
                    <span v-if="currentCity?.state">, {{ currentCity?.state }}</span>
                    <span v-if="currentCity?.country">, {{ currentCity?.country.toUpperCase() }}</span>
                </p>
            </div>
            <div class="text-5xl font-bold">{{ getCelsiusTemp(currentWeather?.main.temp) }}</div>
            <img :src="getWeatherIcon(currentWeather?.weather[0]?.icon)" alt="weather-icon" width="80">
            <div class="text-4xl">{{ currentWeather?.weather[0].main }}</div>
            <div class="text-xl">{{ currentWeather?.weather[0].description }}</div>
            <div class="flex justify-between">
                <span class="me-2">Min: {{ getCelsiusTemp(currentWeather?.main.temp_min) }}</span>
                <span>Max: {{ getCelsiusTemp(currentWeather?.main.temp_max) }}</span>
            </div>
            
        </div>
    </div>
</template>

<style scoped></style>