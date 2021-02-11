import Vue from 'vue'
import App from './App.vue'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './registerServiceWorker'
import router from './router'
import store from './store'
import './quasar'
import { auth } from "./Firestore/firebaseInit"

Vue.config.productionTip = false

let app;
auth.onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});