<template>
  <q-layout class="q-pa-md background">
    <title>Login | Lanao Map</title>
    <q-ajax-bar ref="bar" position="top" size="4px" color="green" skip-hijack />
    <q-btn
      push
      color="green"
      text-color="white"
      label="Lanao Map"
      icon="map"
      to="/lanaomap"
    />

    <div
      class="flex flex-center"
      :style="
        $q.screen.lt.md
          ? ''
          : 'display: flex; justify-content: flex-end; margin-right: 50px; margin-top: 150px'
      "
    >
      <q-card :style="$q.screen.lt.md ? 'width: 85%' : 'width: 30%'">
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
          class="q-pt-md text-center"
          style="margin-bottom: 40px; margin-top: 10px"
        >
          <img src="../../assets/LanaoMapSmall.png" style="max-width: 250px" />
        </div>

        <q-card class="q-px-lg q-pb-lg">
          <q-form action>
            <q-input
              v-model="email"
              ref="uName"
              label="Email Address"
              color="green"
              hide-bottom-space
              autofocus
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter a valid email',
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
              color="green"
              hide-bottom-space
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Please enter a valid password',
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

            <template v-if="hasError">
              <div class="q-mt-md text-red text-center">
                <q-card-section class="q-py-none q-pb-sm">
                  <div class="text-subtitle2 text-weight-regular">
                    Invalid email address or password.
                  </div>
                </q-card-section>
              </div>
            </template>

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
                @click.stop="signup"
              />
            </div>
          </q-form>
        </q-card>
      </q-card>
    </div>
  </q-layout>
</template>

<script>
import { db, auth, fdb } from "../../Firestore/firebaseInit";

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
      hasError: false,
    };
  },

  created() {
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
    login() {
      this.indeterminate = true;
      this.hasError = false;
      this.$refs.uName.validate();
      this.$refs.pWord.validate();

      if (this.$refs.uName.hasError || this.$refs.pWord.hasError) {
        this.formHasError = true;
        this.indeterminate = false;
      } else {
        this.$q.loadingBar.start();
        auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
            (user) => {
              db.collection("profiles")
                .doc(user.user.uid)
                .get()
                .then((doc) => {
                  var disabled = doc.data().disabled;
                  if (disabled) {
                    auth.signOut().then(
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
                        this.hasError = true;
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
              this.hasError = true;
            }
          )
          .catch((err) => {
            this.$q.loadingBar.stop();
            this.indeterminate = false;
            this.hasError = true;
          });
      }
    },

    signup() {
      if (this.email != null && this.password != null) {
        this.$q
          .dialog({
            title: "Discard input?",
            message: "Are you sure you want to discard input?",
            color: "red",
            cancel: true,
          })
          .onOk(() => {
            this.$router.replace("/signup");
          })
          .onCancel(() => {});
      } else {
        this.$router.replace("/signup");
      }
    },

    logout() {
      auth.signOut().then(() => {
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
