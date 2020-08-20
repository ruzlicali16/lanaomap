<template>
  <q-layout class="q-pa-md background">
    <title>Login | Lanao Map</title>
    <q-ajax-bar ref="bar" position="top" color="red" size="4px" skip-hijack />
    <q-btn
      push
      color="blue"
      text-color="white"
      label="Lanao Map"
      icon="map"
      to="/lanaomap"
    />

    <q-card
      class="my-card absolute-top-right shadow-10"
      style="margin-top: 140px; margin-right: 60px;"
    >
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

      <div
        class="q-mb-xl q-pt-md text-center"
        style="margin-bottom: 40px; margin-top: 10px"
      >
        <img src="../../assets/LanaoMapSmall.png" style="max-width: 250px" />
      </div>

      <q-card class="q-px-lg q-pb-lg">
        <q-form action>
          <q-input
            v-model="email"
            ref="uName"
            label="Username"
            hide-bottom-space
            autofocus
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please enter a valid g-email',
            ]"
          >
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            ref="pWord"
            label="Password"
            :type="showpassword ? 'password' : 'text'"
            hide-bottom-space
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please enter a valid password',
            ]"
            @keypress.enter="login"
          >
            <template v-slot:append>
              <q-icon
                :name="showpassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showpassword = !showpassword"
              />
            </template>
          </q-input>

          <div class="q-mt-md">
            <q-btn
              :class="indeterminate ? 'no-pointer-events' : ''"
              :disable="indeterminate"
              :loading="indeterminate"
              class="full-width"
              size="20px"
              color="green-8"
              label="Log In"
              no-caps
              @click="login"
            />
            <q-btn
              class="full-width"
              size="20px"
              flat
              label="Sign Up"
              color="green"
              no-caps
              to="/signup"
            />
            <div class="text-center q-mt-lg">
              <q-btn
                outline
                size="10px"
                color="red-4"
                label="Forget passowrd?"
                no-caps
              />
            </div>
          </div>
        </q-form>
      </q-card>
    </q-card>
  </q-layout>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";

export default {
  name: "Login",

  data() {
    return {
      email: null,
      password: null,
      showpassword: true,
      indeterminate: false,
      internetLost: true,
      internetConnected: false,
    };
  },

  created() {
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
    login: function(e) {
      this.indeterminate = true;
      e.preventDefault();

      this.$refs.uName.validate();
      this.$refs.pWord.validate();

      if (this.$refs.uName.hasError || this.$refs.pWord.hasError) {
        this.formHasError = true;
        this.indeterminate = false;
      } else {
        this.$q.loadingBar.start();
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
            (user) => {
              var connectedRef = firebase.database().ref(".info/connected");
              connectedRef.on("value", (snap) => {
                if (snap.val() === false) {
                  this.logout();
                }
              });
              db.collection("profiles")
                .doc(user.user.uid)
                .get()
                .then((doc) => {
                  var disabled = doc.data().disabled;
                  if (disabled) {
                    firebase
                      .auth()
                      .signOut()
                      .then(
                        () => {
                          this.logout();
                          this.$q
                            .dialog({
                              title: "ACCOUNT DISABLED",
                              message: "Please contact your adminisitrator.",
                              color: "red",
                            })
                            .onOk(() => {});
                        },
                        (err) => {     
                          this.$q.loadingBar.stop();
                          this.indeterminate = false;
                          console.log(err.message);
                        }
                      );
                  } else {
                    this.email = "";
                    this.password = "";
                    this.$refs.uName.resetValidation();
                    this.$refs.pWord.resetValidation();
                    this.$q.loadingBar.stop();
                    this.indeterminate = false;
                    this.$router.push("/");
                  }
                });
            },
            (err) => {
              this.$q.loadingBar.stop();
              this.indeterminate = false;
              this.$q.notify({
                type: "negative",
                message: `Something Went Wrong.`,
                caption: `ERROR: ${err.message}`,
                position: "bottom-left",
                timeout: 5000,
              });
            }
          )
          .catch((err) => {
            this.$q.loadingBar.stop();
            this.indeterminate = false;
            this.$q.notify({
              type: "negative",
              message: `Something Went Wrong.`,
              caption: `ERROR: ${err.message}`,
              position: "bottom-left",
              timeout: 5000,
            });
          });
      }
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("no net");
          this.email = "";
          this.password = "";
          this.$refs.uName.resetValidation();
          this.$refs.pWord.resetValidation();
          this.$q.loadingBar.stop();
          this.indeterminate = false;
        });
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  /*mobile*/
  .my-card {
    width: 100%;
    position: relative;
  }
}

@media screen and (min-width: 768px) {
  /*desktop*/
  .my-card {
    width: 100%;
    max-width: 400px;
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
