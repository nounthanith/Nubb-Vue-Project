import {createRouter, createWebHistory} from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Login from "../pages/Login.vue";
import Profile from "../pages/Profile.vue";
import Register from "../pages/Register.vue";
import Admin from "../pages/Admin.vue";


const routes = [
	{path: "/", component: Home},
	{path: "/about", component: About},
	{path: "/login", component: Login},
	{path: "/register", component: Register},
	{path: "/profile", component: Profile},
	{path: "/admin", component: Admin},
];


const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
