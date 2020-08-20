<template>
  <q-table
    title="Municipal Admin Accounts"
    row-key="name"
    color="primary"
    :data="profiles"
    :columns="columns"
    :filter="filter"
    :loading="loading"
    :grid="$q.platform.is.mobile"
    :hide-header="$q.platform.is.mobile"
    @request="onRequest"
  >
    <template v-slot:top-right="props">
      <q-btn
        icon="group_add"
        color="primary"
        label="Add Account"
        class="q-mr-lg"
        @click="addAcctDialog = true"
      />

      <q-dialog v-model="addAcctDialog" transition-show="" transition-hide="">
        <q-card>
          <q-linear-progress
            v-if="indeterminate"
            :indeterminate="indeterminate"
            color="red"
          />
          <q-toolbar>
            <q-avatar>
              <q-icon name="group_add" size="md" color="blue" />
            </q-avatar>

            <q-toolbar-title
              ><span class="text-weight-bold">Add</span>
              Account</q-toolbar-title
            >

            <q-btn flat round dense icon="close" @click="closeDialog" />
          </q-toolbar>
          <q-card-section
            class="q-pt-none text-center text-grey-8 text-overline"
          >
            This account is for municipal admin only.
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-form>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    v-model="firstname"
                    ref="firstname"
                    label="First name"
                    color="green"
                    hide-bottom-space
                    autofocus
                    dense
                    outlined
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Enter first name',
                    ]"
                  />
                </div>

                <div class="col">
                  <q-input
                    v-model="lastname"
                    ref="lastname"
                    label="Last name"
                    color="green"
                    hide-bottom-space
                    dense
                    outlined
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Enter last name',
                    ]"
                  />
                </div>

                <q-select
                  class="q-pl-md full-width"
                  v-model="location"
                  input-debounce="0"
                  label="Municipal admin location"
                  behavior="menu"
                  options-selected-class="text-blue"
                  :options="munOptions"
                  hide-bottom-space
                  use-input
                  options-dense
                  dense
                  outlined
                  lazy-rules
                  @filter="filterFn"
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') || 'Enter assigned location',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      v-if="location !== null"
                      class="cursor-pointer"
                      name="clear"
                      @click.stop="location = null"
                    />
                  </template>
                </q-select>

                <q-input
                  class="q-pl-md full-width"
                  v-model="email"
                  ref="email"
                  label="Email Address"
                  hint="You can use letters, numbers & periods"
                  color="blue"
                  hide-bottom-space
                  dense
                  outlined
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') || 'Enter email address',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="mail" />
                  </template>
                </q-input>
              </div>

              <q-card-actions class="q-pb-none" align="between">
                <q-btn
                  flat
                  color="blue"
                  label="Cancle"
                  no-caps
                  @click="closeDialog"
                />

                <q-btn
                  :class="indeterminate ? 'no-pointer-events	' : ''"
                  :disable="indeterminate"
                  :loading="indeterminate"
                  type="submit"
                  color="blue"
                  label="Create account"
                  no-caps
                  @click="addNewAccount"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

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
        align="right"
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
        <q-th auto-width class="bg-grey-3 text-blue">Action</q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
        <q-th auto-width>Account Status</q-th>
      </q-tr>
    </template>

    <template v-if="$q.platform.is.mobile" v-slot:item="props">
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
              label="Active"
              @click.stop="activeAccount(props.row.id)"
            />
            <q-btn
              style="width: 120px"
              size="sm"
              color="green"
              icon="Deactive"
              @click.stop="activeAccount(props.row.id)"
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
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";
import { date } from "quasar";

const munOptions = [];

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      location: "",
      email: "",
      password: "",
      filter: "",
      currentDate: "",
      currentYear: "",
      municipalities: "",
      munOptions: munOptions,

      indeterminate: false,
      uid: null,
      fullname: null,
      loading: false,
      showpassword: false,
      addAcctDialog: false,

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
          label: "Email Address",
          field: "email",
          align: "left",
          sortable: true,
        },
        {
          name: "location",
          label: "Location",
          field: "location",
          align: "left",
          sortable: true,
        },
        {
          name: "createdBy",
          label: "Created By",
          field: "createdBy",
          align: "left",
          sortable: true,
        },
        {
          name: "timestamp",
          label: "Created On",
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
    closeDialog() {
      if (
        this.firstname != "" ||
        this.lastname != "" ||
        this.location != "" ||
        this.email != ""
      ) {
        this.$q
          .dialog({
            title: "Discard",
            message: "Are you sure you want to discard inputs?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            this.firstname = "";
            this.lastname = "";
            this.location = "";
            this.email = "";
            this.password = "";
            this.addAcctDialog = false;
          });
      } else {
        this.addAcctDialog = false;
      }
    },
    getCurrentYear() {
      let timeStamp = Date.now();
      let formattedString = date.formatDate(timeStamp, "YYYY");
      // console.log(formattedString);
      return (this.currentYear = formattedString);
    },
    getCurrentDate() {
      let timeStamp = Date.now();
      let formattedString = date.formatDate(
        timeStamp,
        "dddd, YYYY-MM-DD h:mm:ss A"
      );
      // console.log(formattedString);
      return (this.currentDate = formattedString);
    },

    extractMunicipalities() {
      var data = this.$store.state.ldsmap.municipality_list;
      for (let i = 0; i < data.length; i++) {
        this.munOptions.unshift(data[i]);
      }
      this.munOptions.sort();
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.extractMunicipalities();
          // console.log(this.munOptions);
          this.munOptions = munOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();

        this.munOptions = munOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    addNewAccount: function(e) {
      e.preventDefault();
      this.getCurrentDate();
      this.getCurrentYear();
      this.$refs.firstname.validate();
      this.$refs.lastname.validate();
      this.$refs.email.validate();

      if (
        this.$refs.firstname.hasError ||
        this.$refs.lastname.hasError ||
        this.$refs.email.hasError
      ) {
        this.formHasError = true;
      } else {
        this.indeterminate = true;
        this.password = this.lastname.toLowerCase() + "@" + this.currentYear;
        let originalUser = firebase.auth().currentUser;
        // console.log(originalUser.uid);
        db.collection("profiles")
          .doc(originalUser.uid)
          .get()
          .then((doc) => {
            this.fullname = doc.data().firstname + " " + doc.data().lastname;
            // console.log(this.fullname);
            return firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(
                (user) => {
                  return db
                    .collection("profiles")
                    .doc(user.user.uid)
                    .set({
                      firstname: this.firstname,
                      lastname: this.lastname,
                      location: this.location,
                      email: this.email,
                      timestamp: this.currentDate,
                      createdBy: this.fullname,
                      birthday: "",
                      position: "Municipal Admin",
                      updatePassword: false,
                    })
                    .then(() => {
                      // console.log("third");
                      firebase.auth().updateCurrentUser(originalUser);
                      this.indeterminate = false;
                      this.addAcctDialog = false;
                      this.firstname = "";
                      this.lastname = "";
                      this.location = "";
                      this.email = "";
                      this.password = "";
                      this.$q.notify({
                        type: "positive",
                        icon: "check_circle_outline",
                        message: `Municiapal admin account created successfully`,
                        position: "top-right",
                      });
                    });
                },
                (err) => {
                  this.indeterminate = false;
                  this.$q.notify({
                    type: "negative",
                    message: `Something wrong when adding new account.`,
                    caption: `Error ${err.message}`,
                    position: "bottom-left",
                  });
                }
              )
              .catch((err) => {
                this.indeterminate = false;
                this.$q.notify({
                  type: "negative",
                  message: `Something wrong when adding new account.`,
                  caption: `Error ${err.message}`,
                  position: "bottom-left",
                });
              });
          })
          .catch((err) => {
            this.indeterminate = false;
            this.$q.notify({
              type: "negative",
              message: `Something wrong when adding new account.`,
              caption: `Error ${err.message}`,
              position: "bottom-left",
            });
          });
      }
    },

    activeAccount(uid) {
       this.$q
        .dialog({
          title: "Enable Account?",
          message: "Are you sure you want to enable this account?",
          color: "blue",
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
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
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
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },

    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      this.profiles = [];
      this.loading = false;
    },

    getProfiles() {
      db.collection("profiles")
        .where("position", "==", "Municipal Admin")
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
                location: doc.data().location,
                email: doc.data().email,
                createdBy: doc.data().createdBy,
                timestamp: doc.data().timestamp,
                disabled: doc.data().disabled,
              };
              this.profiles.push(data);
            });
          },
          (err) => {
            // console.log("list-table-accounts.table.vue " + err.message);
          }
        );
    },
  },

  destroyed() {
    // console.log("destroyed");
    var data = this.$store.state.ldsmap.municipality_list;
    for (let i = 0; i < data.length; i++) {
      this.munOptions.splice(data[i]);
    }
  },
};
</script>
