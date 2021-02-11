<template>
  <q-dialog persistent full-height full-width v-model="viewList">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <q-icon name="museum" size="md" />
        </q-avatar>

        <q-toolbar-title
          ><span class="text-weight-bold">Manage</span> Cultural
          Heritages</q-toolbar-title
        >

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
        <q-table
          title="My contribution"
          :data="heritages"
          :columns="columns"
          row-key="ownerName"
          :filter="filter"
        >
          <template v-slot:top-right="props">
            <q-input dense debounce="200" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  :name="filter == '' ? 'search' : 'close'"
                  @click="filter = ''"
                />
              </template>
            </q-input>

            <q-space />

            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-ml-sm"
            >
              <q-tooltip v-if="!props.inFullscreen">
                Full Screen
              </q-tooltip>
              <q-tooltip v-if="props.inFullscreen">
                Minimize Screen
              </q-tooltip>
            </q-btn>
          </template>

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  class="q-mx-xs"
                  size="sm"
                  color="blue"
                  round
                  dense
                  title="Edit heritage"
                  @click="edit"
                  icon="edit"
                />
                <q-btn
                  size="sm"
                  color="blue"
                  round
                  dense
                  :title="props.expand ? 'Hide' : 'View heritage picture'"
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'expand_less' : 'insert_photo'"
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">
                  <q-img :src="props.row.heritagePicture" />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>

import { db, auth } from "../../Firestore/firebaseInit";

export default {
  name: "ViewList",

  data() {
    return {
      filter: "",
      uid: null,
      fullname: null,

      columns: [
        {
          name: "desc",
          required: true,
          label: "Owner name",
          align: "left",
          field: (row) => row.ownerName,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "heritageName",
          label: "Heritage name",
          field: "heritageName",
          align: "left",
          sortable: true,
        },
        {
          name: "barangay",
          label: "Barangay",
          field: "barangay",
          align: "left",
          sortable: true,
        },
        {
          name: "municipality",
          label: "Municipality",
          field: "municipality",
          align: "left",
          sortable: true,
        },
        {
          name: "categories",
          label: "Categories",
          field: "categories",
          align: "left",
          sortable: true,
        },
        {
          name: "yearConstructed",
          label: "Year Constructed",
          field: "yearConstructed",
          align: "left",
          sortable: true,
        },
        {
          name: "latitude",
          label: "Latitude",
          field: "latitude",
          align: "left",
          sortable: true,
        },
        {
          name: "longitude",
          label: "Longitude",
          field: "longitude",
          align: "left",
          sortable: true,
        },
      ],

      heritages: [],
    };
  },

  created() {
    var user = auth.currentUser;
    this.getHeritages(user);
  },

  methods: {
    getHeritages(user) {
      db.collection("heritages")
        .where("uid", "==", user.uid)
        .onSnapshot(
          (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.uid = doc.data().uid;
              const data = {
                categories: doc.data().categories,
                heritageName: doc.data().heritage_name,
                ownerName: doc.data().owner_name,
                municipality: doc.data().municipality,
                barangay: doc.data().barangay,
                yearConstructed: doc.data().year_constructed,
                heritagePicture: doc.data().heritage_picture,
                latitude: doc.data().lat,
                longitude: doc.data().lng,
              };
              this.heritages.push(data);
            });
          },
          (err) => {}
        );
    },

    edit() {
      this.editCulturalHeritage = true;
    },
  },

  computed: {
    viewList: {
      get() {
        return this.$store.state.siteNav.viewList;
      },

      set(val) {
        this.$store.dispatch("siteNav/viewList", val);
      },
    },

    editCulturalHeritage: {
      get() {
        return this.$store.state.siteNav.addCulturalHeritage;
      },
      set(val) {
        this.$store.dispatch("siteNav/addCulturalHeritage", val);
      },
    },
  },
};
</script>

<style lang="css" scoped></style>
