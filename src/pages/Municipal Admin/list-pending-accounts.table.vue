<template>
  <q-table
    title="List of New Mapper(s)"
    row-key="name"
    color="primary"
    :data="profiles"
    :columns="columns"
    :filter="filter"
    :loading="loading"
    :grid="this.$q.screen.lt.md"
    :hide-header="this.$q.screen.lt.md"
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
        <q-th auto-width class="bg-grey-3 text-blue">
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
              style="width: 120px"
              size="sm"
              color="red"
              icon="clear"
              label="Disapprove"
              @click="disapprove(props.row.id)"
            />
            <q-btn
              style="width: 120px"
              size="sm"
              color="blue"
              icon="check"
              label="Approve"
              @click="approve(props.row.id)"
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
            icon="done"
            @click.stop="approve(props.row.id)"
          >
            <q-tooltip content-class="bg-grey-9" :offset="[10, 10]">
              Approve
            </q-tooltip>
          </q-btn>
          <q-btn
            size="sm"
            color="red"
            round
            dense
            title="Disapprove"
            icon="clear"
            @click.stop="disapprove(props.row.id)"
          >
            <q-tooltip content-class="bg-grey-9" :offset="[10, 10]">
              Disapprove
            </q-tooltip>
          </q-btn>
        </q-td>
        <q-td
          class="cursor-pointer"
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.value }}
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

      loading: false,

      initialPagination: {
        rowsPerPage: 50,
      },

      columns: [
        {
          name: "desc",
          required: true,
          label: "Full Name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "email",
          label: "Emaill Address",
          field: "email",
          align: "left",
          sortable: true,
        },
        {
          name: "timestamp",
          label: "Date Registered",
          field: "timestamp",
          align: "left",
          sortable: true,
        },
      ],

      profiles: [],

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
    this.getProfiles();
  },

  methods: {
    approve(hid) {
      this.$q
        .dialog({
          title: "Approve?",
          message: "Are you want to assign this account as Mapper?",
          color: "blue",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$q.loading.show({
            message: `Some important is in progress. Please wait patiently.`,
          });
          this.loading = true;
          db.collection("profiles")
            .doc(hid)
            .update({
              position: "Mapper",
            })
            .then(() => {
              // console.err("List table Accounts");
              this.approveSuccessNotif();
              this.$q.loading.hide();
              this.loading = false;
            })
            .catch((error) => {
              // console.err("List table Accounts");
              this.hasErrorNotif(err);
            });
        })
        .onCancel(() => {});
    },

    disapprove(hid) {
      this.$q
        .dialog({
          title: "Disapprove?",
          message: "Are you want to disapprove this account as Mapper?",
          color: "red",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$q.loading.show({
            message: `Some important is in progress. Please wait patiently.`,
          });
          this.loading = true;
          db.collection("profiles")
            .doc(hid)
            .update({
              position: "Disapproved",
            })
            .then(() => {
              // console.err("List table Accounts");
              this.$q.notify({
                type: "negative",
                message: `Successfully Disapproved.`,
                position: "top-right",
              });
              this.$q.loading.hide();
              this.loading = false;
            })
            .catch((error) => {
              // console.err("List table Accounts");
              this.hasErrorNotif(err);
            });
        })
        .onCancel(() => {});
    },

    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      this.profiles = [];
      this.loading = false;
    },

    getProfiles() {
      var user = auth.currentUser;
      var location;

      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .get()
          .then((doc) => {
            location = doc.data().location;

            db.collection("profiles")
              .where("position", "==", "")
              .where("location", "==", location)
              .onSnapshot(
                (querySnapshot) => {
                  this.onRequest({
                    filter: this.filter,
                    pagination: this.pagination,
                  });

                  querySnapshot.forEach((doc) => {
                    const data = {
                      id: doc.id,
                      name: doc.data().firstname + " " + doc.data().lastname,
                      email: doc.data().email,
                      timestamp: doc.data().timestamp,
                    };
                    this.profiles.push(data);
                  });
                },
                (err) => {}
              );
          })
          .catch((err) => {});
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
        message: `Profile successfully updated as 'Mapper'.`,
        position: "bottom-left",
      });
    },
  },
};
</script>

<style></style>
