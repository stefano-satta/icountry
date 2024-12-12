import axios from 'axios';

const http = axios.create({});
const APIkey = '720c529366565c4ddf26ecae7d805558';
const BASE_URL_OWM = 'http://api.openweathermap.org';
const BASE_URL_COUNTRIES = 'https://restcountries.com/v3.1';

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
    return await http.get(`${BASE_URL_COUNTRIES}/name/${country}`);
}

export const getAllCountry = async () => {
    return await http.get(`${BASE_URL_COUNTRIES}/all`);
}