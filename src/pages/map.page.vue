<template>
  <q-page class="flex">
    <title>{{ lat }} | {{ lng }}</title>
    <q-card style="flex:1">
      <l-map
        :zoom="zoom"
        :center="{ lat, lng }"
        :options="{ zoomControl: false }"
      >
        <l-control-scale
          position="bottomright"
          :imperial="true"
          :metric="false"
        />

        <l-control-zoom position="bottomright" />
        <l-control position="bottomright">
          <q-btn
            dense
            color="white"
            text-color="grey-9"
            size="md"
            icon="my_location"
          />
        </l-control>
        <l-control position="bottomleft">
          <q-btn
            class="q-ma-sm"
            :fab="!this.$q.platform.is.mobile"
            :fab-mini="this.$q.platform.is.mobile"
            icon="feedback"
            color="red"
            @click="feedbackDialog = true"
          >
            <q-tooltip
              content-class="bg-grey-9"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
            >
              Feedback
            </q-tooltip>
          </q-btn>
        </l-control>
        <l-control-layers position="bottomright" />
        <l-tile-layer
          v-for="tileprovider in tileproviders"
          :key="tileprovider.name"
          :name="tileprovider.name"
          :visible="tileprovider.visible"
          :url="tileprovider.url"
          layer-type="base"
        >
        </l-tile-layer>

        <l-marker
          v-for="heritage in heritages"
          :key="heritage.id"
          :lat-lng="heritage.location"
          :visible="
            visible == 'showAll'
              ? true
              : heritage.location.lat == lat && heritage.location.lng == lng
          "
        >
          <l-popup>
            <q-card class="my-card" flat>
              <q-img
                v-if="heritage.photoURL != ''"
                :src="heritage.photoURL"
                width="300px"
              />
              <img v-else src="../assets/no-image.png" />

              <q-card-section class="q-pa-none q-ma-none items-center">
                <div class="text-h6 text-center text-weight-bold">
                  {{ heritage.name }}
                </div>
              </q-card-section>
              <q-card-section class="q-pa-none q-ma-none items-center">
                <div class="text-subtitle2 text-center text-grey-8">
                  {{ heritage.type }}
                </div>
              </q-card-section>
              <q-card-section class="q-pa-none q-py-sm no-wrap items-center">
                <div class="text-caption text-grey-8 text-center">
                  <q-icon name="place" color="green" size="20px" />
                  {{ heritage.baranggayLocation }},
                  {{ heritage.mapperLocation }}
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions v-if="current != null" align="right">
                <q-btn
                  flat
                  color="primary"
                  label="View"
                  @click="viewHeritage(heritage.id)"
                />
              </q-card-actions>
            </q-card>
          </l-popup>
        </l-marker>
      </l-map>
    </q-card>
  </q-page>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../Firestore/firebaseInit";

import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LControlZoom,
  LControlLayers,
  LControl,
  LControlScale,
  LFeatureGroup,
  LIcon,
} from "vue2-leaflet";
import L from "leaflet";
import { latLng, icon } from "leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControlZoom,
    LControlLayers,
    LControl,
    LControlScale,
    LFeatureGroup,
    LIcon,
  },

  data() {
    return {
      heritages: [],
      current: "",
      location: "",
      // zoom: 10,
      currentZoom: 0,
      center: L.latLng(0, 0),

      currentCenter: latLng(0, 0),
      visible: "showAll",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },

  created() {
    console.log("map page");
    this.lat = 7.846278;
    this.lng = 124.26101;
    this.getCurrentMaps();
    this.getProfile();
    this.updateProfile = false;
    this.culturalHeritages = false;
    this.manageHeritages = false;
  },

  computed: {
    zoom: {
      get() {
        return this.$store.state.admin.zoom;
      },
      set(val) {
        this.$store.dispatch("admin/zoom", val);
      },
    },

    lat: {
      get() {
        // console.log("get lat - 1", this.$store.state.admin.lat);
        return this.$store.state.admin.lat;
      },
      set(val) {
        // console.log("set lat - 1");
        this.$store.dispatch("admin/lat", val);
      },
    },

    lng: {
      get() {
        // console.log("get lng - 2", this.$store.state.admin.lng);
        return this.$store.state.admin.lng;
      },
      set(val) {
        // console.log("set lng - 2", this.$store.state.admin.lng);
        this.$store.dispatch("admin/lng", val);
      },
    },

    tileproviders() {
      return this.$store.state.admin.tileProviders;
    },

    feedbackDialog: {
      get() {
        return this.$store.state.siteNav.feedbackDialog;
      },

      set(val) {
        this.$store.dispatch("siteNav/feedbackDialog", val);
      },
    },

    notifDrawerState: {
      get() {
        return this.$store.state.siteNav.notifDrawerState;
      },

      set(val) {
        this.$store.dispatch("siteNav/notifDrawerState", val);
      },
    },

    updateProfile: {
      get() {
        return this.$store.state.siteNav.updateProfile;
      },

      set(val) {
        this.$store.dispatch("siteNav/updateProfile", val);
      },
    },

    culturalHeritages: {
      get() {
        return this.$store.state.siteNav.culturalHeritages;
      },

      set(val) {
        this.$store.dispatch("siteNav/culturalHeritages", val);
      },
    },

    manageHeritages: {
      get() {
        return this.$store.state.siteNav.manageHeritages;
      },

      set(val) {
        this.$store.dispatch("siteNav/manageHeritages", val);
      },
    },
  },

  methods: {
    viewHeritage(hid) {
      this.$router.push(`/mh/view-details/${hid}`);
    },

    getProfile() {
      firebase.auth().onAuthStateChanged((user) => {
        this.current = user;
      });
    },

    getCurrentMaps() {
      db.collection("heritages")
        .where("verified", "==", true)
        .onSnapshot(
          (querySnapshot) => {
            this.heritages = [];
            querySnapshot.forEach((doc) => {
              const data = {
                id: doc.id,
                type: doc.data().type,
                heritageType: doc.data().heritageType,
                name: doc.data().name,
                ownership: doc.data().ownership,
                ownershipJurisdiction: doc.data().ownershipJurisdiction,
                nameOfOwner: doc.data().nameOfOwner,
                photoURL: doc.data().photoURL,
                baranggayLocation: doc.data().baranggayLocation,
                timestamp: doc.data().timestamp,
                mapperLocation: doc.data().mapperLocation,
                mapperName: doc.data().mapperName,
                location: {
                  lat: doc.data().lat,
                  lng: doc.data().lng,
                },
              };
              this.heritages.push(data);
            });
          },
          (err) => {
            console.log(err.message);
          }
        );
    },
  },
};
</script>

<style></style>
