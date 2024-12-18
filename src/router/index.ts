import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomepageVue from "../pages/Homepage.vue";
import WeatherVue from "../pages/Weather.vue";
import CountryVue from "../pages/Country.vue";
import AllCountries from "../pages/AllCountries.vue";

const routes: RouteRecordRaw[] = [
    {path: '/', component: HomepageVue },
    {path: '/all-countries', component: AllCountries},
    {path: '/country/:country', component: CountryVue},
    {path: '/weather', component: WeatherVue}
];

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

export default router;