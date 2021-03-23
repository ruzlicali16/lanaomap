<template>
  <q-dialog
    v-model="addCulturalHeritage"
    :full-width="selectedValue != null ? true : false"
    transition-show="fade"
    transition-hide="fade"
    square
  >
    <q-card style="width: 600px; max-width: 85vw;">
      <q-toolbar class="bg-grey-4 vertical-top">
        <q-toolbar-title v-if="selectedValue == null">
          Select
          <span class="text-weight-bold">Cultural Heritage</span>
        </q-toolbar-title>

        <q-btn v-else flat round dense icon="arrow_back" @click="backNav" />

        <q-toolbar-title
          class="text-center"
          v-if="heritage_id == null && selectedValue != null"
        >
          Add
          <span class="text-weight-bold">Cultural Heritage</span>
        </q-toolbar-title>

        <q-toolbar-title
          v-else-if="heritage_id != null && selectedValue != null"
        >
          Edit
          <span class="text-weight-bold">Cultural Heritage</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="close" @click="confirm" />
      </q-toolbar>

      <div v-if="selectedValue == null" class="q-pa-md full-width">
        <q-list>
          <q-expansion-item
            popup
            icon="home"
            label="Tanggile Immovable Heritage"
            header-class="text-primary"
          >
            <q-separator />
            <q-card>
              <q-card-section class="q-pa-none">
                <q-list dense separator>
                  <q-item
                    class="text-caption"
                    v-for="immovable in Immovables"
                    :key="immovable.label"
                    v-ripple
                    clickable
                    @click="
                      selectedCategory(
                        immovable.label,
                        immovable.id,
                        'Immovable'
                      )
                    "
                  >
                    <q-item-section class="q-ml-xl">{{
                      immovable.label
                    }}</q-item-section>
                    <q-item-section avatar>
                      <q-icon color="grey-8" :name="immovable.icon" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item
            popup
            icon="brush"
            label="Tanggible Movable Heritage"
            header-class="text-teal"
          >
            <q-separator />
            <q-card>
              <q-card-section class="q-pa-none">
                <q-list dense separator>
                  <q-item
                    class="text-caption"
                    v-for="movable in Movables"
                    :key="movable.label"
                    v-ripple
                    clickable
                    @click="
                      selectedCategory(movable.label, movable.id, 'Movable')
                    "
                  >
                    <q-item-section class="q-ml-xl">{{
                      movable.label
                    }}</q-item-section>
                    <q-item-section avatar>
                      <q-icon color="grey-8" :name="movable.icon" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { Platform } from "quasar";

export default {
  name: "AddForm",

  props: ["heritage_id", "manageHeritage"],

  data() {
    return {
      hideTangibleSelection: false,
      selectedValue: null,
      selectedValue2: null,

      Immovables: [
        {
          id: "Govt",
          label:
            "Government Structures, Private Built Structures and Commercial Establishments",
          icon: "business",
        },
        {
          id: "School",
          label: "Schools and Educational Complexes",
          icon: "school",
        },
        {
          id: "Hospital",
          label: "Hospital and Medical Facilities",
          icon: "local_hospital",
        },
        {
          id: "Churches",
          label: "Churches, Temples and Places of Worship",
          icon: "house",
        },
        {
          id: "Monuments",
          label: "Monuments and Markers",
          icon: "place",
        },
        {
          id: "Sites",
          label: "Sites",
          icon: "map",
        },
        {
          id: "Heritage",
          label: "Heritage Houses and Vernacular Architecture",
          icon: "museum",
        },
      ],

      Movables: [
        {
          id: "Archae",
          label: "Archaeological",
          icon: "local_florist",
        },
        {
          id: "Ethno",
          label: "Ethnographic Object",
          icon: "collections",
        },
        {
          id: "Religious",
          label: "Religious Object",
          icon: "local_hospital",
        },
        {
          id: "Works",
          label: "Works of Industrial Commercial",
          icon: "home_work",
        },
        {
          id: "Art",
          label: "Artwork",
          icon: "group_work",
        },
        {
          id: "Archival",
          label: "Archival Holdings",
          icon: "archive",
        },
        {
          id: "Natural",
          label: "Natural History Specimen",
          icon: "history",
        },
        {
          id: "Other",
          label: "Other",
          icon: "help",
        },
      ],
    };
  },

  computed: {
    addCulturalHeritage: {
      get() {
        return this.$store.state.siteNav.addCulturalHeritage;
      },
      set(val) {
        this.$store.dispatch("siteNav/addCulturalHeritage", val);
      },
    },

    closePopup: {
      get() {
        return this.$store.state.siteNav.closePopup;
      },
      set(val) {
        this.$store.dispatch("siteNav/closePopup", val);
      },
    },

    manageAddHeritage: {
      get() {
        return this.$store.state.siteNav.manageAddHeritage;
      },
      set(val) {
        this.$store.dispatch("siteNav/manageAddHeritage", val);
      },
    },
  },

  methods: {
    selectedCategory(category, uid, heritage) {
      this.$store.state.services.selectedValue = category;
      this.$store.state.services.selectedValue2 = heritage;
      this.$store.state.services.selectedCategory = uid;
      this.$router.push("/add-heritage");
    },

    backNav() {
      this.selectedValue = null;
    },

    confirm() {
      if (this.selectedValue != null) {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure to close this?",
            cancel: "No",
            ok: "Yes",
            color: "red",
            persistent: true,
          })
          .onOk(() => {
            this.selectedValue = null;
            this.addCulturalHeritage = false;
          });
      } else {
        // this.selectedValue = null;
        this.addCulturalHeritage = false;
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
