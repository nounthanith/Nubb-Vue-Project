import {createRouter, createWebHistory} from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Login from "../pages/Login.vue";
import Profile from "../pages/Profile.vue";


const routes = [
	{path: "/", component: Home},
	{path: "/about", component: About},
	{path: "/login", component: Login},
	{path: "/profile", component: Profile},
];


const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
