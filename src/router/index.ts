import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomepageVue from "../pages/Homepage.vue";
import WeatherVue from "../pages/Weather.vue";

const routes: RouteRecordRaw[] = [
    {path: '/', component: HomepageVue },
    {path: '/weather', component: WeatherVue}
];

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

export default router;