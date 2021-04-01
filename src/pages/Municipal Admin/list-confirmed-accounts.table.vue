<template>
  <q-table
    title="Mapper Active Accounts"
    row-key="name"
    color="green"
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
      <q-input dense debounce="200" v-model="filter" placeholder="Search" color="green">
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
        <q-th auto-width class="bg-grey-3 text-green">Action</q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
        <q-th auto-width>Account Status</q-th>
      </q-tr>
    </template>

    <template v-if="$q.screen.lt.md" v-slot:item="props">
      <div
        class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        :style="props.selected ? 'transform: scale(0.95);' : ''"
      >
        <q-card :class="props.selected ? 'bg-grey-2' : ''">
          <q-card-section>
            <div class="text-weight-bold">{{ props.row.name }}</div>
            <div class="row items-center">
              Account Status
              <q-space />
              <div>
                <q-chip
                  v-if="props.row.disabled"
                  class="text-caption text-bold"
                  color="red"
                  text-color="white"
                  label="Disabled"
                />
                <q-chip
                  v-else
                  class="text-caption text-bold"
                  color="green"
                  text-color="white"
                  label="Enabled"
                />
              </div>
            </div>
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
              <q-item-section side class="col-6 overflow-auto">
                <q-item-label caption>{{ col.value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator />
          <q-card-actions class="q-gutter-y-sm" align="center">
            <q-btn
              :disable="props.row.disabled"
              :class="props.row.disabled ? 'no-pointer-events' : ''"
              :color="props.row.disabled ? 'grey-5' : 'red'"
              size="sm"
              icon="clear"
              label="Disable Account"
              @click="deactiveAccount(props.row.id)"
            />
            <q-btn
              :disable="!props.row.disabled"
              :class="!props.row.disabled ? 'no-pointer-events' : ''"
              :color="!props.row.disabled ? 'grey-5' : 'green'"
              size="sm"
              icon="check"
              label="Enable Account"
              @click="activeAccount(props.row.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </template>

    <template v-else v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width class="text-center">
          <q-btn
            icon="more_horiz"
            text-color="grey-8"
            size="sm"
            dense
            round
            flat
          >
            <q-menu>
              <q-list class="text-center" style="min-width: 100px">
                <q-item
                  class="text-green"
                  :disable="!props.row.disabled"
                  :class="!props.row.disabled ? 'no-pointer-events' : ''"
                  clickable
                  @click="activeAccount(props.row.id)"
                >
                  <q-item-section>Enable</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  class="text-red"
                  :disable="props.row.disabled"
                  :class="props.row.disabled ? 'no-pointer-events' : ''"
                  clickable
                  @click="deactiveAccount(props.row.id)"
                >
                  <q-item-section>Disable</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
        <q-td auto-width class="text-center">
          <q-chip
            v-if="props.row.disabled"
            class="text-caption text-bold"
            color="red"
            text-color="white"
            label="Disabled"
          />
          <q-chip
            v-else
            class="text-caption text-bold"
            color="green"
            text-color="white"
            label="Enabled"
          />
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
    activeAccount(uid) {
      this.$q
        .dialog({
          title: "Enable Account?",
          message: "Are you sure you want to enable this account?",
          color: "green",
          cancel: true,
        })
        .onOk(() => {
          db.collection("profiles")
            .doc(uid)
            .update({
              disabled: false,
            })
            .catch((err) => {
              this.hasErrorNotif(err);
            });
          this.$q.notify({
            type: "positive",
            message: `Enabled account.`,
            position: "top-right",
          });
        })
        .onCancel(() => {});
    },

    deactiveAccount(uid) {
      this.$q
        .dialog({
          title: "Disable Account?",
          message: "Are you sure you want to disable this account?",
          color: "red",
          cancel: true,
        })
        .onOk(() => {
          db.collection("profiles")
            .doc(uid)
            .update({
              disabled: true,
            })
            .catch((err) => {
              this.hasErrorNotif(err);
            });
          this.$q.notify({
            type: "warning",
            message: `Disabled account.`,
            position: "top-right",
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
              .where("position", "==", "Mapper")
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
                      disabled: doc.data().disabled,
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
