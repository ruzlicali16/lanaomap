import Vue from "vue";
import VueRouter from "vue-router";
const Error404 = () => import("../pages/Error404.vue");
const Login = () => import("../pages/Auth/login-auth.page.vue");
const Register = () => import("../pages/Auth/register-auth.page.vue");
const MainLayout = () => import("../layouts/main.layout.vue");
const LandingLayout = () => import("../layouts/landing.layout.vue");
const LandingPage = () => import("../pages/landing.page.vue");
const MapPage = () => import("../pages/map.page.vue");
const UpdateProfilePage = () => import("../pages/edit-profile.page.vue");
const CulturalHeritagePage = () =>
  import("../pages/view-list-heritages.page.vue"); // ADMIN
const ManageAccountPage = () => import("../pages/view-list-accounts.page.vue"); // ADMIN
const ManageHeritagePage = () =>
  import("../pages/Mapper/manage-list-heritages.page.vue"); // MAPPER
const AddEditHeritage = () => import("../pages/Mapper/add-heritage.page.vue"); // MAPPER
const ViewFullDetails = () => import("../pages/view-full-details.page.vue"); // MAPPER
const ViewHeritage = () => import("../pages/Guest/view-full-details.page.vue"); // MAPPER
import firebase from "firebase/app";
import "firebase/auth";

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
    children: [
      { path: "", component: MapPage, name: "lanao-map" },
      { path: "view-heritage/:heritage_id", component: ViewHeritage, name: "view-heritage" },
    ],
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
