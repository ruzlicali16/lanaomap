<template>
  <q-menu fit anchor="bottom left" self="top left">
    <q-card class="first-card text-black text-overline" style="width: 250px">
      <div class="no-wrap q-pa-md">
        <div class="column items-center">
          <q-avatar class="q-my-md" v-show="skeleton">
            <q-skeleton type="circle" />
          </q-avatar>

          <q-card-section
            class="q-py-none q-pb-md full-width"
            v-show="skeleton"
          >
            <q-skeleton type="rect" />
          </q-card-section>

          <q-avatar v-show="showSimulatedReturnData" size="72px">
            <img v-if="photoURL" :src="photoURL" />
            <img
              v-else
              @click="updateDialog = true"
              src="../../assets/NoAvailablePhoto.png"
              style="cursor: pointer"
            />
          </q-avatar>

          <q-card-section v-show="showSimulatedReturnData" class="text-center">
            <q-item-label
              class="text-subtitle1 text-weight-medium text-capitalize"
              >{{ fullname }}</q-item-label
            >
            <q-item-label class="text-overline text-grey-7">{{
              position
            }}</q-item-label>
          </q-card-section>

          <q-card-actions class="full-width" vertical align="center">
            <q-btn
              v-show="!updateProfile"
              class="full-width q-mb-xs"
              color="green"
              label="update profile"
              size="sm"
              @click="updateProfilePage"
            />
            <q-btn
              class="full-width"
              color="red"
              label="Logout"
              size="sm"
              @click="logout"
            />
          </q-card-actions>
        </div>
      </div>
    </q-card>
  </q-menu>
</template>

<script>
import { mapGetters } from "vuex";

import { db, auth } from "../../Firestore/firebaseInit";

export default {
  name: "LoginMenu",

  data() {
    return {
      fullname: null,
      position: null,
      photoURL: null,

      skeleton: true,
      showSimulatedReturnData: false,
    };
  },

  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.getCurrentUser(user);
      }
    });
  },

  computed: {
    ...mapGetters(["admin/getCurrentUserProfile"]),

    updateProfile: {
      get() {
        return this.$store.state.siteNav.updateProfile;
      },

      set(val) {
        this.$store.dispatch("siteNav/updateProfile", val);
      },
    },

    viewMyContribution: {
      get() {
        return this.$store.state.siteNav.viewMyContribution;
      },

      set(val) {
        this.$store.commit("siteNav/viewMyContribution", val);
      },
    },

    miniState: {
      get() {
        return this.$store.state.siteNav.miniState;
      },

      set(val) {
        this.$store.commit("siteNav/miniState", val);
      },
    },

    drawerState: {
      get() {
        return this.$store.state.siteNav.drawerState;
      },

      set(val) {
        this.$store.commit("siteNav/drawerState", val);
      },
    },

    notificationsCounter: {
      get() {
        return this.$store.state.admin.notificationsCounter;
      },
      set(val) {
        this.$store.dispatch("admin/notificationsCounter", val);
      },
    },

    viewCulturalHeritageDetails: {
      get() {
        return this.$store.state.siteNav.viewCulturalHeritageDetails;
      },

      set(val) {
        this.$store.dispatch("siteNav/viewCulturalHeritageDetails", val);
      },
    },
  },

  methods: {
    updateProfilePage() {
      this.$router.push("/update-profile");
      this.updateProfile = true;
      this.viewMyContribution = false;
    },

    logout() {
      auth.signOut().then(
        () => {
          this.miniState = true;
          this.updateProfile = false;
          this.drawerState = false;
          this.viewMyContribution = false;
          this.viewCulturalHeritageDetails = false;
          this.notificationsCounter = 0;
          this.$router.push("/login");
        },
        (err) => {}
      );
    },

    getCurrentUser(user) {
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .onSnapshot(
            (doc) => {
              var firstname = doc.data().firstname;
              var lastname = doc.data().lastname;
              this.position = doc.data().position;
              this.photoURL = doc.data().profilepicture;

              this.fullname = firstname + " " + lastname;

              this.skeleton = false;
              this.showSimulatedReturnData = true;
            },
            (err) => {}
          );
      } else {
        this.fullname = null;
        this.position = null;
        this.photoURL = null;
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
