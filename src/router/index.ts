import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import UserProfile from "../pages/UserProfile.vue";
import DetailView from "../pages/DetailView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: UserProfile,
  },
  {
    path: "/detail/:weatherKey?", // Optional param (use `?` if it's not required)
    name: "Detail",
    component: DetailView,
    props: true, // Enables passing params as props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
