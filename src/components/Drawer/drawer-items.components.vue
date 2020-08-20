<template>
  <q-card
    class="q-pa-none no-shadow relative-position text-black"
    style="height: 300px"
  >
    <q-card
      v-if="!culturalHeritagePage"
      bordered
      class="second-card no-shadow 
                  q-gutter-y-xs q-mx-xs q-px-xs 
                  q-mt-xs q-pb-sm q-mb-sm text-black 
                  text-overline"
    >
      <div class="text-center text-grey-7">Locate all this heritages</div>

      <q-btn
        unelevated
        class="no-shadow full-width"
        v-for="heritage in heritages"
        :key="heritage.label"
        :label="heritage.label"
        :color="heritage.color"
        icon-right="pin_drop"
        align="between"
        no-caps
      />
    </q-card>

    <q-card
      v-if="!culturalHeritagePage && position == 'Mapper'"
      bordered
      class="q-mx-xs third-card no-shadow text-black"
    >
      <div class="q-pl-md q-py-sm q-pr-sm row justify-between">
        <small class="text-bold text-subtitle1">Menu</small>

        <div>
          <q-icon
            class="cursor-pointer text-grey-8"
            tag="a"
            name="help"
            size="xs"
          >
            <q-tooltip
              anchor="bottom middle"
              self="top middle"
              :offset="[1, 1]"
              content-class="bg-grey-8 text-white"
              content-style="font-size: 13px"
            >
              <small>More info</small>
            </q-tooltip>
          </q-icon>
        </div>
      </div>

      <q-separator inset />

      <div class="q-py-xs text-caption">
        <q-list>
          <q-item
            dense
            clickable
            class="text-grey-9"
            @click="addCulturalHeritage = true"
          >
            <AddForm />
            <q-item-section avatar>
              <q-icon name="add_location" color="grey-9" size="20px" />
            </q-item-section>

            <q-item-section>Add missing cultural heritages</q-item-section>
          </q-item>

          <q-item dense clickable class="text-grey-9" to="/manage-heritages">
            <q-item-section avatar>
              <q-icon name="pageview" color="grey-9" size="20px" />
            </q-item-section>

            <q-item-section>View my contribution</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>
  </q-card>
</template>

<script>
import LanaomapLogo from "../Header/lanaomap-logo.components";
import AddForm from "../Dialog/add-form.dialog";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";

export default {
  name: "DrawerItem",

  props: ["position"],

  components: {
    LanaomapLogo,
    AddForm,
  },

  data() {
    return {
      innerLoading: false,
      showSimulatedReturnData: false,
      heritages: [
        {
          label: "All heritages",
          color: "red-5",
        },
        {
          label: "Movable heritages",
          color: "yellow-9",
        },
        {
          label: "Immovable heritages",
          color: "green",
        },
        {
          label: "Artifacts",
          color: "blue",
        },
      ],
      selection: ["teal", "red"],
      text: "",
      counter: 0,
    };
  },

  methods: {},

  computed: {
    addCulturalHeritage: {
      get() {
        return this.$store.state.siteNav.addCulturalHeritage;
      },
      set(val) {
        this.$store.dispatch("siteNav/addCulturalHeritage", val);
      },
    },

    viewList: {
      get() {
        return this.$store.state.siteNav.viewList;
      },

      set(val) {
        this.$store.dispatch("siteNav/viewList", val);
      },
    },

    viewMyContribution: {
      get() {
        return this.$store.state.siteNav.viewMyContribution;
      },

      set(val) {
        this.$store.dispatch("siteNav/viewMyContribution", val);
      },
    },

    culturalHeritagePage: {
      get() {
        return this.$store.state.siteNav.culturalHeritages;
      },

      set(val) {
        this.$store.dispatch("siteNav/culturalHeritages", val);
      },
    },
  },
};
</script>

<style lang="css" scoped></style>
