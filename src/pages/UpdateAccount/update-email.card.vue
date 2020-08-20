<template>
  <q-card
    bordered
    :class="
      this.$q.platform.is.mobile
        ? 'q-mt-xl q-mx-sm'
        : 'q-ml-auto q-mr-auto q-mt-lg'
    "
    style="max-width: 700px;"
  >
    <q-card-section class="text-center">
      <q-icon
        name="mail"
        :size="this.$q.platform.is.mobile ? 'md' : 'lg'"
        color="green"
        class="float-left"
      />
      <span
        class="text-grey-9"
        :class="this.$q.platform.is.mobile ? 'text-h6' : 'text-h4'"
        style="font-family: ubuntu"
        >Change Email</span
      >
    </q-card-section>
    <q-card-section class="full-width q-gutter-y-md">
      <q-field
        v-if="renderComponent"
        dense
        outlined
        stack-label
        label="Current Email"
        color="blue"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ email }}
          </div>
        </template>
      </q-field>

      <!-- <q-input
        v-if="renderComponent"
        v-model="email"
        disable
        dense
        outlined
        stack-label
        label="Current Email"
        color="blue"
      /> -->

      <q-input
        v-model="newemail"
        hide-bottom-space
        dense
        outlined
        stack-label
        hide-hint
        label="New Email"
        hint="Please enter a new valid email"
        color="blue"
      />

      <q-input
        v-model="currenpassword"
        hide-bottom-space
        dense
        outlined
        stack-label
        label="Current Password"
        color="blue"
        type="password"
      >
      </q-input>

      <q-btn
        class="full-width text-overline"
        color="blue"
        label="Change Email"
        :loading="loading"
        :percentage="percentage"
        :disable="disable"
        dense
        no-caps
        @click="save"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";

export default {
  name: "EditProfilePage",

  data() {
    return {
      email: null,
      newemail: null,
      currenpassword: null,

      renderComponent: true,
      disable: false,
      showpassword: true,
      loading: false,
      percentage: 0,
    };
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getCurrentUser(user);
      }
    });
  },

  computed: {},

  methods: {
    getCurrentUser(user) {
      if (user) {
        this.email = user.email;
      }
    },

    updateemail() {
      var user = firebase.auth().currentUser;
      var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.currenpassword
      );

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          user
            .updateEmail(this.newemail)
            .then(() => {
              this.disable = false;
              this.newemail = "";
              this.currenpassword = "";
              this.renderComponent = false;

              this.$nextTick(() => {
                this.$q.notify({
                  type: "positive",
                  message: `Email successfully updated.`,
                  position: "bottom-left",
                });
                this.loading = false;
                this.email = user.email;
                this.renderComponent = true;
              });
            })
            .catch((error) => {
              this.loading = false;
              this.disable = false;
              this.$q.notify({
                type: "negative",
                message: error.message,
                position: "bottom-left",
              });
            });
        })
        .catch((error) => {
          console.log(error.message);
          this.loading = false;
          this.disable = false;
          this.$q.notify({
            type: "negative",
            message: `The current password is invalid. Please try again.`,
            position: "bottom-left",
          });
        });
    },

    save() {
      this.disable = true;
      this.loading = true;
      this.percentage = 0;
      this.interval = setInterval(() => {
        this.percentage += Math.floor(Math.random() * 8 + 10);
        if (this.percentage >= 100) {
          clearInterval(this.interval);
          this.updateemail();
        }
      }, 700);
    },
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style></style>
