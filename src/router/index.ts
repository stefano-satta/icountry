import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomepageVue from "../views/Homepage.vue";

const routes: RouteRecordRaw[] = [
    {path: '/', component: HomepageVue }
];

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

export default router;