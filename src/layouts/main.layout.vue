<template>
  <q-layout view="hHh LpR fFf">
    <title>Lanao Map</title>
    <div v-if="loading">
      <q-page-container>
        <q-page>
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
          <div class="absolute-center q-pb-xl">
            <img src="../assets/LanaoMapSmall.png" />
            <q-linear-progress
              :indeterminate="loading"
              color="red"
              class="q-mt-md"
            />
          </div>
        </q-page>
      </q-page-container>
    </div>
    <transition-group
      v-else
      appear
      enter-active-class="bounceInLeft"
      leave-active-class="bounceInLeft"
    >
      <div key="main container">
        <Header :position="position" />
        <q-page-container>
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
          <router-view />
        </q-page-container>
        <Drawer
          :position="position"
          v-if="
            !updateProfile &&
              !manageHeritages &&
              !viewCulturalHeritageDetails &&
              !editHeritages
          "
        />
      </div>
    </transition-group>
  </q-layout>
</template>

<script>
import Drawer from "../components/Drawer/drawer.components.vue";
import Header from "../components/Header/header.components.vue";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../Firestore/firebaseInit";

export default {
  components: {
    Drawer,
    Header,
  },

  data() {
    return {
      internetLost: false,
      internetConnected: false,
      loading: true,
      position: "",
    };
  },

  created() {
    this.internetStatus();
  },

  computed: {
    updateProfile: {
      get() {
        return this.$store.state.siteNav.updateProfile;
      },

      set(val) {
        this.$store.dispatch("siteNav/updateProfile", val);
      },
    },

    manageHeritages: {
      get() {
        return this.$store.state.siteNav.manageHeritages;
      },

      set(val) {
        this.$store.dispatch("siteNav/manageHeritages", val);
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

    editHeritages: {
      get() {
        return this.$store.state.siteNav.editHeritages;
      },

      set(val) {
        this.$store.dispatch("siteNav/editHeritages", val);
      },
    },
  },

  methods: {
    getAccountStatus() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("profiles")
            .doc(user.uid)
            .onSnapshot((doc) => {
              var accountStatus = doc.data().disabled;
              if (accountStatus) {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    console.log("disabled account");
                  });
              }
            });
        } else {
        }
      });
    },

    getPosition() {
      var user = firebase.auth().currentUser;
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .onSnapshot(
            (doc) => {
              var useruid = user.uid;
              var docid = doc.id;
              var updatePassword = "";
              var position = "";
              position = doc.data().position;
              updatePassword = doc.data().updatePassword;
              this.position = position;
              if (useruid == docid) {
                if (updatePassword == false) {
                  if (this.$route.name !== "update-profile") {
                    this.updateAccountDialog();
                  }
                }
              }
              this.loading = false;
            },
            (err) => {
              // console.log(err.message);
            }
          );
      } else {
      }
    },

    internetStatus() {
      var connectedRef = firebase.database().ref(".info/connected");

      connectedRef.on("value", (snap) => {
        if (snap.val() === true) {
          this.getPosition();
          this.getAccountStatus();
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

    updateAccountDialog() {
      this.$q
        .dialog({
          title: "PLEASE UPDATE YOUR PASSWORD.",
          message:
            "Click OK to redirect to other page where you can update your password.",
          persistent: true,
        })
        .onOk(() => {
          this.$router.push("/update-profile");
        });
    },
  },
};
</script>
