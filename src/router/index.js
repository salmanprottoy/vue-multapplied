import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Details from "../views/Details.vue";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/:id",
    name: "Details",
    component: Details,
  },
  {
    path: "/adminstration/system-chart",
    name: "Admin",
    component: Admin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
