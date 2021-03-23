<template>
  <q-layout view="hHh LpR fFf">
    <transition-group
      appear
      enter-active-class="bounceInLeft"
      leave-active-class="bounceInLeft"
    >
      <div key="main container">
        <Header />
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
      </div>
    </transition-group>
  </q-layout>
</template>

<script>
const Drawer = () => import("../components/Drawer/drawer.components.vue");
const Header = () => import("../components/Header/header.components.vue");

import { db, auth, fdb } from "../Firestore/firebaseInit";

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
    getPosition() {
      var user = auth.currentUser;
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .get()
          .then(
            (doc) => {
              var useruid = user.uid;
              var docid = doc.id;
              var updatePassword = "";
              var position = "";
              position = doc.data().position;
              updatePassword = doc.data().updatePassword;

              if (useruid == docid) {
                if (updatePassword == false) {
                  if (this.$route.name !== "update-profile") {
                    this.updateAccountDialog();
                  }
                }
              }

              if (position != undefined) {
                setTimeout(() => {
                  this.loading = false;
                }, 2000);
              }
            },
            (err) => {}
          );
      }
    },

    internetStatus() {
      var connectedRef = fdb.ref(".info/connected");

      connectedRef.on("value", (snap) => {
        if (snap.val() === true) {
          this.getPosition();
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
