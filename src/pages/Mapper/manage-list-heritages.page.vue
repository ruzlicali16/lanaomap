<template>
  <q-page class="q-px-md">
    <title>Manage Heritages | Lanao Map</title>
    <q-card class="my-card">
      <q-table
        :class="this.$q.platform.is.mobile ? 'q-mt-md' : ''"
        title="My contribution"
        row-key="name"
        color="primary"
        :data="heritages"
        :columns="columns"
        :filter="filter"
        :loading="loading"
        :grid="this.$q.platform.is.mobile"
        :hide-header="this.$q.platform.is.mobile"
        @request="onRequest"
      >
        <template v-slot:top-right="props">
          <AddFormDialog :manageHeritage="manageHeritage" />
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
            v-if="!$q.platform.is.mobile"
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
            <q-th auto-width class="bg-blue-3 text-white">
              Action
            </q-th>
            <q-th auto-width class="bg-red-3 text-white">
              Status
            </q-th>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-if="$q.platform.is.mobile" v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card :class="props.selected ? 'bg-grey-2' : ''">
              <q-card-section class="text-center">
                <div class="text-weight-bold">{{ props.row.name }}</div>
                <q-space />
                <q-chip
                  v-if="props.row.verified == true"
                  size="sm"
                  color="green"
                  text-color="white"
                  label="Aprroved"
                />
                <q-chip
                  v-else
                  size="sm"
                  color="red"
                  text-color="white"
                  label="Pending"
                />
              </q-card-section>
              <q-separator />
              <q-list dense>
                <q-item
                  v-for="col in props.cols.filter((col) => col.name !== 'desc')"
                  :key="col.name"
                  class="row"
                >
                  <q-item-section class="col-6">
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side class="col-6">
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-separator />
              <q-card-actions class="q-py-md" align="center">
                <q-btn
                  style="width: 120px"
                  size="sm"
                  color="green"
                  dense
                  label="View heritage"
                  icon="visibility"
                  @click="viewFullDetails(props.row.id)"
                />
                <q-btn
                  style="width: 120px"
                  size="sm"
                  color="blue"
                  dense
                  label="Edit heritage"
                  icon="edit"
                  @click.stop="editHeritage(props.row.id)"
                />
              </q-card-actions>
            </q-card>
          </div>
        </template>

        <template v-else v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                class="q-mx-xs"
                size="sm"
                color="blue"
                round
                dense
                title="Edit heritage"
                icon="edit"
                @click.stop="editHeritage(props.row.id)"
              />
            </q-td>
            <q-td auto-width>
              <q-chip
                v-if="props.row.verified == true"
                size="sm"
                color="green"
                text-color="white"
                label="Aprroved"
              />
              <q-chip
                v-else-if="props.row.verified == 'disapproved'"
                size="sm"
                color="red"
                text-color="white"
                label="Disapproved"
              />
              <q-chip
                v-else
                size="sm"
                color="orange"
                text-color="white"
                label="Pending"
              />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="cursor:pointer"
              @click="viewFullDetails(props.row.id)"
            >
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
    </q-card>
  </q-page>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";

import AddFormDialog from "../../components/Dialog/add-form.dialog";

export default {
  components: {
    AddFormDialog,
  },

  data() {
    return {
      filter: "",
      uid: null,
      fullname: null,
      status: "",
      heritage_id: null,
      refresh: null,
      loading: false,
      manageHeritage: true,

      columns: [
        {
          name: "desc",
          required: true,
          label: "Heritage Name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "heritageType",
          label: "Heritage Type",
          field: "heritageType",
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
          name: "baranggayLocation",
          label: "Barangay",
          field: "baranggayLocation",
          align: "left",
          sortable: true,
        },
        {
          name: "mapperName",
          label: "Mapper Name",
          field: "mapperName",
          align: "left",
          sortable: true,
        },
        {
          name: "dateProfiled",
          label: "Date Profiled",
          field: "dateProfiled",
          align: "left",
          sortable: true,
        },
        {
          name: "uploadedBy",
          label: "Uploaded By",
          field: "uploadedBy",
          align: "left",
          sortable: true,
        },
        {
          name: "timestamp",
          label: "Uploaded On",
          field: "timestamp",
          align: "left",
          sortable: true,
        },
      ],


      heritages: [],

      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10,
      },

      loading: false,
    };
  },

  created() {
    this.loading = true;
    this.manageHeritages = true;
    this.getHeritages();
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

    viewCulturalHeritageDetails: {
      get() {
        return this.$store.state.siteNav.viewCulturalHeritageDetails;
      },
      set(val) {
        this.$store.dispatch("siteNav/viewCulturalHeritageDetails", val);
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
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      this.heritages = [];
      this.loading = false;
    },

    getHeritages() {
      var user = firebase.auth().currentUser;

      if (user) {
        db.collection("heritages")
          .where("uid", "==", user.uid)
          .onSnapshot(
            (querySnapshot) => {
              this.onRequest({
                filter: this.filter,
                pagination: this.pagination,
              });
              querySnapshot.forEach((doc) => {
                this.uid = doc.data().uid;
                const data = {
                  id: doc.id,
                  heritageType: doc.data().heritageType,
                  categories: doc.data().categories,
                  name: doc.data().name,
                  ownershipJurisdiction: doc.data().ownershipJurisdiction,
                  baranggayLocation: doc.data().baranggayLocation,
                  mapperName: doc.data().mapperName,
                  dateProfiled: doc.data().dateProfiled,
                  uploadedBy: doc.data().uploadedBy,
                  timestamp: doc.data().timestamp,
                  verified: doc.data().verified,
                };
                this.heritages.push(data);
              });
            },
            (err) => {
              // console.log(err.message);
              // this.hasErrorNotif(err);
            }
          );
      }
    },

    viewFullDetails(hid) {
      this.$router.push(`/mh/view-details/${hid}`);
      this.viewCulturalHeritageDetails = true;
    },

    addheritage() {
      this.addCulturalHeritage = true;
    },

    editHeritage(hid) {
      this.$q.loading.show({
        message: `Some important is in progress. Please wait patiently.`,
      });
      this.loading = true;
      db.collection("heritages")
        .doc(hid)
        .get()
        .then((doc) => {
          var heritageType = doc.data().heritageType;
          this.viewCulturalHeritageDetails = false;
          this.manageHeritages = false;
          this.$router.replace(`/mh/vd/edit-heritage/${heritageType}/${hid}`);
          this.$q.loading.hide();
          this.loading = false;
        });
    },

    hasErrorNotif(err) {
      // this.loading = false;
      this.$q.notify({
        type: "negative",
        message: `Something went wrong. Error (${err.message})`,
        position: "bottom-left",
        timeout: 2500,
      });
    },
  },
};
</script>
