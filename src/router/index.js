import Vue from "vue";
import VueRouter from "vue-router";
import Error404 from "../pages/Error404.vue";
import Login from "../pages/Auth/login-auth.page.vue";
import Register from "../pages/Auth/register-auth.page.vue";
import MainLayout from "../layouts/main.layout.vue";
import LandingLayout from "../layouts/landing.layout.vue";
import LandingPage from "../pages/landing.page.vue";
import MapPage from "../pages/map.page.vue";
import UpdateProfilePage from "../pages/edit-profile.page.vue";
import CulturalHeritagePage from "../pages/view-list-heritages.page.vue"; // ADMIN
import ManageAccountPage from "../pages/view-list-accounts.page.vue"; // ADMIN
import ManageHeritagePage from "../pages/Mapper/manage-list-heritages.page.vue"; // Mapper
import AddEditHeritage from "../pages/Mapper/add-heritage.page.vue"; // MAPPER
import ViewFullDetails from "../pages/view-full-details.page.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: MapPage, name: "map-page" },
      {
        path: "/update-profile",
        component: UpdateProfilePage,
        name: "update-profile",
      }, // ALL
      { path: "/cultural-heritages", component: CulturalHeritagePage }, // Municipal Admin
      { path: "/manage-accounts", component: ManageAccountPage }, // Municipal Admin
      { path: "/manage-heritages", component: ManageHeritagePage }, // Mapper
      { path: "/add-heritage", component: AddEditHeritage }, // Mapper

      {
        path: "/mh/vd/edit-heritage/:heritage_type/:heritage_id",
        component: AddEditHeritage,
        name: "edit-heritage",
      }, // Mapper
      {
        path: "/mh/view-details/:heritage_id",
        component: ViewFullDetails,
        name: "view-full-detils",
      }, // ALL
    ],
  },

  {
    path: "/lanaomap",
    component: LandingLayout,
    meta: { requiresGuest: true }, // for output purposes
    children: [{ path: "", component: MapPage, name: "lanao-map" }],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/signup",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    name: "Error404",
    component: Error404,
  });
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to, router, routes);
  // Check for requiredAuth guard
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/lanaomap",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
