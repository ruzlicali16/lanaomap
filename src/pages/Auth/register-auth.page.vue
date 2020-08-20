<template>
  <q-layout class="q-pa-md background">
    <title>Sign Up | Lanao Map</title>
    <q-btn
      push
      color="blue"
      text-color="white"
      label="Lanao Map"
      icon="map"
      to="/lanaomap"
    />
    <q-card class="my-card absolute-center">
      <q-linear-progress
        v-if="indeterminate"
        :indeterminate="indeterminate"
        color="red"
      />
      <q-banner
        v-if="internetLost"
        dense
        inline-actions
        class="text-white text-center bg-red-5"
      >
        Reconnecting
        <q-spinner-dots />
      </q-banner>
      <q-banner
        v-if="internetConnected"
        dense
        inline-actions
        class="text-white text-center bg-green-5"
      >
        Connected
      </q-banner>
      <div class="q-pa-lg">
        <div class="text-center" style="margin-bottom: 30px">
          <img
            src="../../assets/LanaoMapSmallest.png"
            style="max-width: 228px"
          />
          <div class="text-center q-pt-md">
            <strong class="text-h5 text-weight-bold"
              >Welcome. We're glad to see you.</strong
            >
            <br />
            <small class="text-overline text-grey-8"
              >Please fill in everything.</small
            >
          </div>
        </div>

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
                  (val) => (val !== null && val !== '') || 'Enter first name',
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
                  (val) => (val !== null && val !== '') || 'Enter last name',
                ]"
              />
            </div>

            <q-select
              class="q-pl-md full-width"
              v-model="location"
              input-debounce="0"
              label="Mapper location"
              behavior="menu"
              options-selected-class="text-green"
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
              label="Username"
              hint="'use a gmail address or any email address'"
              color="green"
              hide-bottom-space
              dense
              outlined
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Enter gmail or any email address',
              ]"
            >
              <template v-slot:append>
                <q-icon name="mail" />
              </template>
            </q-input>

            <div class="col">
              <q-input
                class="q-pb-xl"
                v-model="password"
                ref="password"
                label="Confirm"
                color="green"
                hint="Use 8 or more characters with a mix of letters, numbers & symbols"
                :type="showpassword ? 'password' : 'text'"
                hide-bottom-space
                dense
                outlined
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Enter a password',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="showpassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showpassword = !showpassword"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row justify-between">
            <q-btn
              flat
              color="green"
              label="Log In instead"
              to="/login"
              no-caps
            />

            <q-btn
              :class="indeterminate ? 'no-pointer-events	' : ''"
              :disable="indeterminate"
              :loading="indeterminate"
              type="submit"
              color="green"
              label="Create account"
              no-caps
              @click="register"
            />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-layout>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";
import { date } from "quasar";

const muncipalityOption = [];

export default {
  data() {
    return {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      location: null,
      currentDate: null,
      municipalities: null,
      munOptions: muncipalityOption,

      indeterminate: false,
      showpassword: true,
      internetLost: false,
      internetConnected: false,
    };
  },

  created() {
    this.extractMunicipalities();
    var connectedRef = firebase.database().ref(".info/connected");

    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        this.internetLost = false;
        this.internetConnected = true;
        setTimeout(() => {
          this.internetConnected = false;
        }, 1500);
      } else {
        this.internetLost = true;
      }
    });
  },

  methods: {
    getCurrentDate() {
      let timeStamp = Date.now();
      let formattedString = date.formatDate(
        timeStamp,
        "dddd, YYYY-MM-DD h:mm:ss A"
      );
      return (this.currentDate = formattedString);
    },

    extractMunicipalities() {
      this.muncipalityOption = [];
      const data = this.$store.state.ldsmap.municipality_list;
      for (let i = 0; i < data.length; i++) {
        this.munOptions.push(data[i]);
      }
      this.munOptions.sort();
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.munOptions = muncipalityOption;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();

        this.munOptions = muncipalityOption.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    register: function(e) {
      e.preventDefault();
      this.getCurrentDate();
      this.$refs.firstname.validate();
      this.$refs.lastname.validate();
      this.$refs.email.validate();
      this.$refs.password.validate();

      if (
        this.$refs.firstname.hasError ||
        this.$refs.lastname.hasError ||
        this.$refs.email.hasError ||
        this.$refs.password.hasError
      ) {
        this.formHasError = true;
      } else {
        this.indeterminate = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            return db
              .collection("profiles")
              .doc(user.user.uid)
              .set({
                firstname: this.firstname,
                lastname: this.lastname,
                location: this.location,
                email: this.email,
                birthday: "",
                position: "",
                timestamp: this.currentDate,
              });
          })
          .then(() => {
            this.indeterminate = false;
            this.$router.push("/");
            this.$q
              .dialog({
                title: "WELCOME TO LANAP MAP.",
                message: "Please wait for the verification of your account.",
              })
              .onOk(() => {});
          })
          .catch((error) => {
            this.indeterminate = false;
            this.$q.notify({
              type: "negative",
              message: `Something wrong when registering your Account.`,
              caption: `Error ${err.message}`,
              position: "bottom-left",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  /*mobile*/
  .my-card {
    width: 90%;
    position: absolute-center;
  }
}

@media screen and (min-width: 768px) {
  /*desktop*/
  .my-card {
    width: 100%;
    max-width: 510px;
  }
}

.background {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  background-color: #f5f5f5;
  height: 100%;
  background-image: url(../../assets/msu.jpg);
}
</style>
