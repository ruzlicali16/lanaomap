<template>
  <div style="pointer-events: none; height: 200px; width: 100%">
    <!-- <small class="text-caption text-primary text-center">
      Center is at
      <span class="text-weight-bold">
        (Latidude: {{ currentCenter.lat }} °N , Longitude:
        {{ currentCenter.lng }} °E)
      </span>
    </small> -->

    <l-map
      :zoom="zoom"
      :center="[this.lat, this.lng]"
      :options="{ zoomControl: false }"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      @mousemove="getCurrentLocation"
      style="height: 95%"
    >
      <l-tile-layer :url="url" />
      <l-marker :lat-lng="currentCenter">
        <l-icon >
          <q-icon style="pointer-events: none;" color="red-5" name="my_location" size="30px" />
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng, latLngBounds, L } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
  LIcon,
} from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LIcon,
  },

  data() {
    
    return {
      zoom: 10,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      currentCenter: latLng(7.849097589482096, 124.34394836425783),
    };
  },

  computed: {
    showMap: {
      get() {
        return this.$store.state.siteNav.toogleMap;
      },
      set(val) {
        this.$store.dispatch("siteNav/toogleMap", val);
      },
    },

    lat: {
      get() {
        return this.$store.state.admin.lat;
      },
      set(val) {
        this.$store.commit("admin/lat", val);
      },
    },

    lng: {
      get() {
        return this.$store.state.admin.lng;
      },
      set(val) {
        this.$store.commit("admin/lng", val);
      },
    },
  },

  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },

    centerUpdate(center) {
      this.currentCenter = center;
    },

    showLongText() {
      this.showParagraph = !this.showParagraph;
    },

    getCurrentLocation() {},
  },
};
</script>
