<template>
  <q-drawer
    content-class="bg-white"
    v-model="drawerState"
    :mini="
      position == 'Municipal Admin' || position == 'Provincial Admin'
        ? miniState
        : false
    "
    :breakpoint="768"
    :width="280"
    :mini-width="65"
    show-if-above
    :behavior="
      position == 'Mapper' || position == '' || this.$q.screen.lt.md
        ? 'mobile'
        : 'desktop'
    "
    elevated
  >
    <template
      v-if="position == 'Provincial Admin' || position == 'Municipal Admin'"
      class="mini"
      v-slot:mini
    >
      <q-scroll-area class="fit q-pt-sm">
        <q-item
          class="q-mb-xs q-ml-xs column items-center mini-slot"
          exact-active-class="bg-green text-white"
          exact
          dense
          v-for="nav in navsForMA"
          :key="nav.label"
          :to="nav.to"
          clickable
          v-ripple
          style="border-radius: 50px 5px 5px 50px"
        >
          <q-tooltip
            content-class="bg-grey-9"
            transition-show="scale"
            transition-hide="scale"
            anchor="center right"
            self="center left"
          >
            {{ nav.tooltip }}
          </q-tooltip>
          <q-item-section avatar class="mini-icon">
            <q-icon :name="nav.icon"> </q-icon>
          </q-item-section>
          <small>{{ nav.label }}</small>
        </q-item>
      </q-scroll-area>
    </template>

    <div
      class="q-pt-sm"
      v-if="position == 'Provincial Admin' || position == 'Municipal Admin'"
    >
      <q-item
        class="drawer q-mb-xs q-ml-sm rounded-borders"
        exact
        exact-active-class="bg-green text-white"
        v-for="nav in navsForMA"
        :key="nav.tooltip"
        :to="nav.to"
        clickable
        v-ripple
        style="border-radius: 50px 5px 5px 50px"
      >
        <q-item-section avatar>
          <q-icon :name="nav.icon" />
        </q-item-section>
        <q-item-section>
          {{ nav.tooltip }}
        </q-item-section>
      </q-item>
    </div>

    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 400px; max-width: 300px;"
    >
      <q-list>
        <!-- <ViewContribution v-if="viewMyContribution" /> -->
        <DrawerItem :position="position" />
      </q-list>
    </q-scroll-area>
    <div class="text-center text-caption fixed-bottom">
      <span class="text-red">L A </span>
      <span class="text-yellow-14">N A O </span>
      <span class="text-green">M A P</span>
    </div>
  </q-drawer>
</template>

<script>
const DrawerItem = () => import("../Drawer/drawer-items.components.vue");
const LanaomapLogo = () => import("../Header/lanaomap-logo.components");

import { db, auth } from "../../Firestore/firebaseInit";

export default {
  name: "Drawer",

  props: ["position"],

  components: {
    DrawerItem,
    LanaomapLogo,
  },

  data() {
    return {
      behavior: "mobile",

      navsForMA: [
        {
          tooltip: "Lanao heritage map",
          icon: "location_on",
          to: "/",
        },
        {
          tooltip: "Manage accounts",
          icon: "people_alt",
          to: "/manage-accounts",
        },
        {
          tooltip: "Manage cultural heritages",
          icon: "museum",
          to: "/cultural-heritages",
        },
      ],

      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
    };
  },

  computed: {
    miniState: {
      get() {
        return this.$store.state.siteNav.miniState;
      },

      set(val) {
        this.$store.dispatch("siteNav/miniState", val);
      },
    },

    drawerState: {
      get() {
        return this.$store.state.siteNav.drawerState;
      },

      set(val) {
        this.$store.dispatch("siteNav/drawerState", val);
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.mini-slot
  transition: background-color .28s
  &:hover
    background-color: rgba(0, 0, 0, .1)
    color: black

.drawer
 transition: background-color .28s
 &:hover
    background-color: rgba(0, 0, 0, .1)
    color: black

.mini-icon
  font-size: 1em
  & + &
  margin-top: 1px
</style>
