import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home";
import Device from "../views/Device";
import Backend from "../views/Backend";
import NotFound from "../views/NotFound";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/device",
        name: "Device",
        component: Device,
    },
    {
        path: "/backend",
        name: "Backend",
        component: Backend,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    mode: "history",
    routes,
});

export default router;
