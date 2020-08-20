import Vue from "vue";
import Vuex from "vuex";

import admin from "./admin-module";
import siteNav from "./site-navigation";
import ldsmap from "./lanaodelsur-maps";
import services from "./services";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      admin,
      siteNav,
      ldsmap,
      services
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return Store;
}
