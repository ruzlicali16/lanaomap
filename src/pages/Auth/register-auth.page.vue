<template>
  <q-layout class="q-pa-md background">
    <title>Sign Up | Lanao Map</title>
    <q-btn
      push
      color="green"
      text-color="white"
      label="Lanao Map"
      icon="map"
      to="/lanaomap"
    />
    <q-card class="my-card absolute-center">
      <q-linear-progress
        v-if="indeterminate"
        :indeterminate="indeterminate"
        color="green"
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
              color="green"
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
              label="Email address"
              hint="Use a gmail address or any email address"
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
                class="q-pb-md"
                v-model="password"
                ref="password"
                label="Password"
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

          <template v-if="hasError">
            <div class="q-pb-md">
              <q-card-section class="bg-red-5 text-white ">
                <div class="text-subtitle2 text-weight-regular">
                  {{ hasError }}
                </div>
              </q-card-section>
            </div>
          </template>

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
import { db, auth, fdb } from "../../Firestore/firebaseInit";
import { date } from "quasar";

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
      hasError: null,
      munOptions: [],
      indeterminate: false,
      showpassword: true,
      internetLost: false,
      internetConnected: false,
    };
  },

  created() {
    this.extractMunicipalities();
    var connectedRef = fdb.ref(".info/connected");

    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        this.internetLost = false;
        this.internetConnected = true;
        setTimeout(() => {
          this.internetConnected = false;
        }, 1500);
      } else {
        this.internetLost = true;
        this.internetConnected = false;
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
      let munArry = [];
      const data = this.$store.state.ldsmap.municipality_list;
      for (let i = 0; i < data.length; i++) {
        munArry.push(data[i]);
      }
      this.munOptions = munArry;
      this.munOptions.sort();
    },

    filterFn(val, update) {
      if (val == "") {
        console.log("Here!");
        update(() => {
          this.extractMunicipalities();
        });
        return;
      }

      console.log("HERE!");
      update(() => {
        const needle = val.toLowerCase();
        this.munOptions = this.munOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    register: function(e) {
      this.hasError = null;
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
        auth
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
              })
              .catch((err) => {
                user
                  .delete()
                  .then(function() {
                    this.indeterminate = false;
                    this.hasError = err;
                  })
                  .catch(function(error) {
                    console.log(error.message);
                  });
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
          .catch((err) => {
            this.indeterminate = false;
            this.hasError = err;
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
