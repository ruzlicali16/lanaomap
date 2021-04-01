<template>
<q-card>
  <!-- Undone -->
  <q-card-section class="text-center">
    <q-avatar v-if="renderComponent" size="100px">
      <img :src="picture" />
    </q-avatar>

    <q-btn
      color="primary"
      icon="add_a_photo"
      class="absolute"
      style="top: 0; right: 300px; transform: translateY(300%);"
      size="sm"
      title="Update picture"
      round
      @click="updateDialog = true"
    />

    <q-dialog persistent v-model="updateDialog" position="top">
      <q-card square class="q-mt-lg" style="">
        <q-bar class="bg-green text-white">
          <span class="text-subtitle1">Change Picture</span>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-linear-progress
          v-if="indeterminate"
          :indeterminate="indeterminate"
          color="green"
        />
        <q-card-section class="row items-center no-wrap justify-between">
          <div>
            <q-input filled type="file" @change="onFileChanged" />
          </div>
        </q-card-section>
        <q-separator color="grey-5" inset />
        <q-card-actions align="right">
          <q-btn
            flat
            dense
            color="primary"
            label="Cancle"
            no-caps
            v-close-popup
          />
          <q-btn
            v-if="selectedFile != null"
            :disable="disable"
            dense
            color="primary"
            label="Update Picture"
            @click="uploadPhoto"
            no-caps
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card-section>
  </q-card>
</template>

<script>

import { db, auth } from "../../Firestore/firebaseInit";

export default {
  name: "EditProfilePage",

  data() {
    return {
      username: null,
      password: null,

      disable: false,
      showpassword: true,
      loading: false,
      percentage: 0
    };
  },

  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.getCurrentUser(user);
      }
    });
  },

  computed: {},

  methods: {
    getCurrentUser(user) {
      if (user) {
        this.username = user.username;
      }
    },

    updateUserProfile() {
    },

    save() {
      this.disable = true;
      this.loading = true;
      this.percentage = 0;
      this.interval = setInterval(() => {
        this.percentage += Math.floor(Math.random() * 8 + 10);
        if (this.percentage >= 100) {
          clearInterval(this.interval);
          this.disable = false;
          this.loading = false;
          this.updateUserProfile();
          this.$q.notify({
            type: "positive",
            message: `Changed username successfully`,
            position: "bottom-left"
          });
        }
      }, 700);
    }
  },

  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style></style>
