<template>
  <q-table
    title="Approved Cultural Heritages"
    row-key="name"
    color="primary"
    :data="heritages"
    :columns="columns"
    :filter="filter"
    :loading="loading"
    selection="multiple"
    :selected.sync="selected"
    :grid="$q.screen.lt.md"
    :hide-header="$q.screen.lt.md"
    :pagination="initialPagination"
    @request="onRequest"
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
        v-if="!$q.screen.lt.md"
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
        <q-th auto-width class="bg-grey-3 text-green">
          Action
        </q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-if="$q.screen.lt.md" v-slot:item="props">
      <div
        class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        :style="props.selected ? 'transform: scale(0.95);' : ''"
      >
        <q-card :class="props.selected ? 'bg-grey-2' : ''">
          <q-card-section>
            <span class="text-weight-bold">{{ props.row.name }}</span>
            <q-space />
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
              style="width: 150px"
              size="sm"
              color="green"
              icon="pageview"
              label="View Heritages"
              @click.stop="viewFullDetails(props.row.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </template>

    <template v-else v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width class="text-center">
          <q-btn
            size="sm"
            color="green"
            icon="pageview"
            round
            dense
            @click.stop="viewFullDetails(props.row.id)"
          >
            <q-tooltip content-class="bg-grey-9" :offset="[10, 10]">
              View Heritage
            </q-tooltip>
          </q-btn>
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
</template>

<script>
import { db, auth } from "../../Firestore/firebaseInit";

export default {
  props: ["grid"],

  data() {
    return {
      filter: "",
      uid: null,
      fullname: null,
      location: null,

      loading: false,
      selected: [],

      initialPagination: {
        rowsPerPage: 50,
      },

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
          name: "location",
          label: "Located At",
          field: "location",
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
    };
  },

  created() {
    this.loading = true;
    this.getHeritages();
  },

  methods: {
    viewFullDetails(hid) {
      this.$router.push(`/mh/view-details/${hid}`);
    },

    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      this.heritages = [];
      this.loading = false;
    },

    getHeritages() {
      var user = auth.currentUser;
      if (user) {
        db.collection("heritages")
          .where("verified", "==", true)
          .onSnapshot(
            (querySnapshot) => {
              this.onRequest({
                filter: this.filter,
                pagination: this.pagination,
              });

              querySnapshot.forEach((doc) => {
                const data = {
                  id: doc.id,
                  heritageType: doc.data().heritageType,
                  categories: doc.data().categories,
                  name: doc.data().name,
                  ownershipJurisdiction: doc.data().ownershipJurisdiction,
                  location: doc.data().mapperLocation,
                  baranggayLocation: doc.data().baranggayLocation,
                  mapperName: doc.data().mapperName,
                  dateProfiled: doc.data().dateProfiled,
                  uploadedBy: doc.data().uploadedBy,
                  timestamp: doc.data().timestamp,
                };
                this.heritages.push(data);
              });
            },
            (err) => {
              this.hasErrorNotif(err);
            }
          );
      }
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

    approveSuccessNotif() {
      // this.loading = false;
      this.$q.notify({
        type: "positive",
        message: `Cultural heritage successfully approved.`,
        position: "bottom-left",
      });
    },
  },
};
</script>

<style></style>
