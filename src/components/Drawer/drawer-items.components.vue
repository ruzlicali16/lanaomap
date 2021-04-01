<template>
  <div class="q-pa-none relative-position text-black" style="height: 300px">
    <q-card
      v-if="!culturalHeritagePage"
      class="second-card no-shadow 
                  q-gutter-y-xs q-mx-xs q-px-xs 
                  q-mt-md q-pb-sm q-mb-sm text-black 
                  text-overline bg-transparent"
    >
      <div class="text-center text-subtitle1 text-bold text-grey-7">Locate heritages</div>

      <q-btn
        push
        class="no-shadow full-width"
        v-for="(heritage, index) in heritages"
        :key="heritage.label"
        :label="heritage.label"
        :color="heritage.color"
        icon-right="pin_drop"
        align="between"
        no-caps
        @click="clicked(heritage.label, index)"
      />
    </q-card>

    <q-card
      v-if="!culturalHeritagePage && position == 'Mapper'"
      class="q-ma-sm third-card text-black"
    >
      <div class="q-pl-md q-py-sm q-pr-sm row justify-between">
        <small class="text-bold text-subtitle1 text-green">Menu</small>
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
  </div>
</template>

<script>
const LanaomapLogo = () => import("../Header/lanaomap-logo.components");
const AddForm = () => import("../Dialog/add-form.dialog");

import { db, auth } from "../../Firestore/firebaseInit";

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
          color: "grey-8",
        },
        {
          label: "Movable heritages",
          color: "grey-8",
        },
        {
          label: "Immovable heritages",
          color: "grey-8",
        },
      ],
      selection: ["teal", "red"],
      text: "",
      counter: 0,
    };
  },

  created() {
    this.heritages[0].color = "green";
  },

  methods: {
    clicked(val, index) {
      if (val == "All heritages") {
        this.showPopup = false;
        this.heritageType = "All";
        this.heritages[index].color = "green";
        this.heritages[1].color = "grey-8";
        this.heritages[2].color = "grey-8";
        if (this.position == "Mapper") {
          this.drawerState = false;
        }
      } else if (val == "Movable heritages") {
        this.showPopup = false;
        this.heritageType = "Movable";
        this.heritages[index].color = "green";
        this.heritages[0].color = "grey-8";
        this.heritages[2].color = "grey-8";
        if (this.position == "Mapper") {
          this.drawerState = false;
        }
      } else if (val == "Immovable heritages") {
        this.showPopup = false;
        this.heritageType = "Immovable";
        this.heritages[index].color = "green";
        this.heritages[0].color = "grey-8";
        this.heritages[1].color = "grey-8";
        if (this.position == "Mapper") {
          this.drawerState = false;
        }
      }
    },
  },

  computed: {
    drawerState: {
      get() {
        return this.$store.state.siteNav.drawerState;
      },

      set(val) {
        this.$store.dispatch("siteNav/drawerState", val);
      },
    },

    miniState: {
      get() {
        return this.$store.state.siteNav.miniState;
      },

      set(val) {
        this.$store.dispatch("siteNav/miniState", val);
      },
    },

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

    addCulturalHeritage: {
      get() {
        return this.$store.state.siteNav.addCulturalHeritage;
      },
      set(val) {
        this.$store.dispatch("siteNav/addCulturalHeritage", val);
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
