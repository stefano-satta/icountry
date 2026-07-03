import axios from 'axios';
import {Continent} from "../types";

const http = axios.create({});
const APIkey = '720c529366565c4ddf26ecae7d805558';
const BASE_URL_OWM = 'http://api.openweathermap.org';
const BASE_URL_COUNTRIES = 'https://api.restcountries.com/countries/v5';


http.interceptors.request.use((config) => {
    if (config.url?.includes(BASE_URL_COUNTRIES)) {
        config.headers.set({...config.headers, Authorization: `Bearer ${import.meta.env.VITE_API_COUNTRY_REST}` });
    }
    return config;
})


/* OPEN WEATHER MAP */

export const getCoordsByCityName = async (city: string) => {
    return await http.get(`${BASE_URL_OWM}/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`);
}

export const getCityNameByCoords = async (lat: number, lon: number) => {
    return await http.get(`${BASE_URL_OWM}/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIkey}`);
}

export const getCurrentWeather = async (lat: number, lon: number) => {
    return await http.get(`${BASE_URL_OWM}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`);
}


/* REST COUNTRY */

export const getCountry = async (country: string) => {
    const params =  { q: country };
    return await http.get(`${BASE_URL_COUNTRIES}`, {params});
}

export const getAllCountry = async () => {
    const params =  { limit: 100 };
    return await http.get(`${BASE_URL_COUNTRIES}`, {params});
}

export const getCountriesByContinent = async (continent: Continent ) => {
    const params =  { region: continent };
    return await http.get(`${BASE_URL_COUNTRIES}`, {params});
}