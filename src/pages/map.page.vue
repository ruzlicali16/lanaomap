<template>
  <q-page class="flex">
    <title>Lanao Map</title>
    <q-card style="flex:1">
      <l-map
        :minZoom="$q.screen.lt.md ? 9 : 10"
        :zoom="$q.screen.lt.md ? 9 : zoom"
        :center="{ lat, lng }"
        :options="{ zoomControl: false }"
        @update:center="centerUpdate"
        @ready="onReady"
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
            @click="centerMap"
          />
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
            (!showPopup && heritageType === heritage.heritageType) ||
              heritageType === 'All'
          "
          ref="markers"
        >
          >
          <l-popup>
            <q-card class="my-card" flat>
              <q-img
                v-if="heritage.photoURL != ''"
                :src="heritage.photoURL"
                width="300px"
                height="250px"
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

              <q-card-actions align="right">
                <q-btn
                  flat
                  color="green"
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

import { db, auth } from "../Firestore/firebaseInit";

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
  LTooltip,
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
    LTooltip,
  },

  data() {
    return {
      heritages: [],
      current: "",
      location: "",
      // zoom: 10,
      currentZoom: 0,
      currentCenter: "",
      mapObject: null,
    };
  },

  created() {
    this.heritageType = "All";
    this.lat = 7.84841737647579;
    this.lng = 124.24949096679689;
    this.getCurrentMaps();
    this.getProfile();
    this.updateProfile = false;
    this.culturalHeritages = false;
    this.manageHeritages = false;
  },

  computed: {
    heritageType: {
      get() {
        return this.$store.state.admin.heritageType;
      },
      set(val) {
        this.$store.dispatch("admin/heritageType", val);
      },
    },

    showPopup: {
      get() {
        return this.$store.state.admin.showPopup;
      },
      set(val) {
        this.$store.dispatch("admin/showPopup", val);
      },
    },

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
        return this.$store.state.admin.lat;
      },
      set(val) {
        this.$store.dispatch("admin/lat", val);
      },
    },

    lng: {
      get() {
        return this.$store.state.admin.lng;
      },
      set(val) {
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
    onReady(mapObject) {
      this.$store.commit("admin/mapObject", mapObject);
    },

    centerMap() {
      let mapObject = this.$store.state.admin.mapObject;
      mapObject.flyTo(L.latLng(7.84841737647579, 124.24949096679689), 10);
      mapObject.on("zoomend", () => {});
    },

    centerUpdate(center) {
      this.currentCenter = center;
      if (!this.showPopup) {
        this.lat = this.currentCenter.lat;
        this.lng = this.currentCenter.lng;
      }
    },

    viewHeritage(hid) {
      if (this.current != null) {
        this.$router.replace(`/mh/view-details/${hid}`);
      } else {
        this.$router.replace(`/lanaomap/view-heritage/${hid}`);
      }
    },

    getProfile() {
      auth.onAuthStateChanged((user) => {
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
          (err) => {}
        );
    },
  },
};
</script>

<style></style>
