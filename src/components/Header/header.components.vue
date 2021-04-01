/*
<template>
  <q-header elevated class="bg-grey-3 text-black">
    <q-toolbar>
      <q-btn
        v-if="$route.name == 'view-heritage'"
        color="black"
        icon="arrow_back"
        flat
        dense
        to="/lanaomap"
      />
      <q-btn
        v-if="
          viewCulturalHeritageDetails &&
            !culturalHeritages &&
            !viewHeritageFromNotif
        "
        color="black"
        icon="arrow_back"
        flat
        dense
        @click="goBack"
      >
      </q-btn>
      <q-btn
        v-if="viewCulturalHeritageDetails && culturalHeritages"
        color="black"
        icon="arrow_back"
        flat
        dense
        @click="goBack1"
      />
      <q-btn
        v-if="updateProfile || manageHeritages || viewCulturalHeritageDetails"
        color="black"
        icon="home"
        flat
        dense
        @click="goHome"
      />
      <q-btn
        v-if="
          (position == 'Municipal Admin' &&
            !updateProfile &&
            !viewCulturalHeritageDetails) ||
            (position == 'Provincial Admin' &&
              !updateProfile &&
              !viewCulturalHeritageDetails) ||
            (this.$q.screen.lt.md &&
              !updateProfile &&
              !manageHeritages &&
              !viewCulturalHeritageDetails &&
              !editHeritages &&
              position == 'Mapper') ||
            (!this.$q.screen.lt.md &&
              !updateProfile &&
              !manageHeritages &&
              !viewCulturalHeritageDetails &&
              !editHeritages &&
              position == 'Mapper')
        "
        flat
        @click="miniDrawerState()"
        round
        dense
        :icon="miniState || !$q.screen.lt.md ? 'menu' : 'menu_open'"
      >
        <q-tooltip
          content-class="bg-grey-9"
          transition-show="scale"
          transition-hide="scale"
          anchor="center right"
          self="center left"
        >
          <span v-if="miniState">Show</span>
          <span v-else>Hide</span>
        </q-tooltip>
      </q-btn>
      <LanaoMapLogo
        v-show="!this.$q.screen.lt.md"
        :class="!this.$q.screen.lt.md ? 'q-pl-lg q-pr-xs' : ''"
      />
      <!-- <q-space v-if="this.$q.screen.lt.md" /> -->
      <!-- if mobile -->
      <LanaoMapLogo
        :class="$q.screen.lt.md ? 'absolute-center' : ''"
        v-show="
          (this.$q.screen.lt.md && updateProfile) ||
            (this.$q.screen.lt.md && manageHeritages) ||
            (this.$q.screen.lt.md && viewCulturalHeritageDetails) ||
            (this.$q.screen.lt.md &&
              culturalHeritages &&
              this.position == 'Municipal Admin') ||
            (this.$q.screen.lt.md &&
              culturalHeritages &&
              this.position == 'Provincial Admin') ||
            (this.$q.screen.lt.md && editHeritages && this.position == 'Mapper')
        "
      />
      <SearchBar
        :class="$q.screen.lt.md ? 'q-pl-xs' : ''"
        v-if="
          !updateProfile &&
            !culturalHeritages &&
            !manageHeritages &&
            !viewCulturalHeritageDetails &&
            !editHeritages &&
            $route.name != 'view-heritage'
        "
      />
      <q-space />

      <div v-if="currentUser && position != 'Provincial Admin'" class="q-pr-sm">
        <q-btn
          dense
          round
          flat
          color="black"
          icon="notifications"
          @click="NotifDrawer = !NotifDrawer"
        >
          <q-badge v-if="notificationsCounter" color="red" floating transparent>
            {{ notificationsCounter }}
          </q-badge>
          <q-tooltip :offset="[10, 10]" content-class="bg-grey-9">
            Notifications
          </q-tooltip>
        </q-btn>
        <NotifDrawer />
      </div>

      <div v-if="currentUser">
        <q-btn dense round size="10px">
          <ProfileMenu />

          <q-avatar color="grey-4" text-color="grey-8" size="28px">
            <img v-if="photoURL" :src="photoURL" />
            <q-icon v-else name="person" color="black" />
          </q-avatar>
          <q-tooltip
            anchor="bottom middle"
            self="top right"
            :offset="[10, 10]"
            content-class="bg-grey-9"
          >
            <div class="text-caption">{{ email }}</div>
            <div class="text-caption">{{ position }} - {{ location }}</div>
          </q-tooltip>
        </q-btn>
      </div>

      <div v-else class="q-gutter-x-sm">
        <q-btn
          size="md"
          push
          color="white"
          text-color="green"
          label="Login"
          to="/login"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { db, auth } from "../../Firestore/firebaseInit";
const LanaoMapLogo = () => import("./lanaomap-logo.components");
const SearchBar = () => import("./search-bar.components");
const ProfileMenu = () => import("./profile-menu.components");
const NotifDrawer = () => import("../Drawer/notifications-drawer.components");

export default {
  name: "Header",

  props: ["position"],

  components: {
    SearchBar,
    ProfileMenu,
    LanaoMapLogo,
    NotifDrawer,
  },

  data() {
    return {
      photoURL: null,
      location: null,
      email: null,
      timestamp: null,

      currentUser: null,
      rightDrawer: false,
      // notificationsCounter: 0,
      heritages: [],

      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },

      heritage_id: null,
      heritage_type: null,
    };
  },

  created() {
    this.heritage_id = this.$route.params.heritage_id;
    this.heritage_type = this.$route.params.heritage_type;
    // this.getNotification();
    var user = "";
    user = auth.currentUser;

    this.currentUser = user;
    if (user) {
      db.collection("profiles")
        .doc(user.uid)
        .onSnapshot(
          (doc) => {
            this.photoURL = doc.data().profilepicture;
            this.location = doc.data().location;
            this.email = doc.data().email;
          },
          (err) => {}
        );
    } else {
      this.photoURL = "";
    }
  },

  computed: {
    notificationsCounter: {
      get() {
        return this.$store.state.admin.notificationsCounter;
      },
      set(val) {
        this.$store.dispatch("admin/notificationsCounter", val);
      },
    },

    miniState: {
      get() {
        return this.$store.state.siteNav.miniState;
      },

      set(val) {
        this.$store.dispatch("siteNav/miniState", val);
      },
    },

    drawerState: {
      get() {
        return this.$store.state.siteNav.drawerState;
      },

      set(val) {
        this.$store.dispatch("siteNav/drawerState", val);
      },
    },

    NotifDrawer: {
      get() {
        return this.$store.state.siteNav.notifDrawerState;
      },

      set(val) {
        this.$store.dispatch("siteNav/notifDrawerState", val);
      },
    },

    updateProfile: {
      get() {
        return this.$store.state.siteNav.updateProfile;
      },

      set(val) {
        this.$store.dispatch("siteNav/updateProfile", val);
      },
    },

    culturalHeritages: {
      get() {
        return this.$store.state.siteNav.culturalHeritages;
      },

      set(val) {
        this.$store.dispatch("siteNav/culturalHeritages", val);
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

    viewHeritageFromNotif: {
      get() {
        return this.$store.state.siteNav.viewHeritageFromNotif;
      },

      set(val) {
        this.$store.dispatch("siteNav/viewHeritageFromNotif", val);
      },
    },
  },

  methods: {
    miniDrawerState() {
      if (!this.$q.screen.lt.md) {
        if (this.position == "Mapper") {
          this.drawerState = !this.drawerState;
        } else {
          this.miniState = !this.miniState;
        }
      } else {
        this.drawerState = !this.drawerState;
      }
    },

    getNotification() {
      var user = auth.currentUser;
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .onSnapshot((doc) => {
            var location = doc.data().location;

            if (this.position == "Municipal Admin") {
              return db
                .collection("heritages")
                .where("mapperLocation", "==", location)
                .where("verified", "==", false)
                .onSnapshot(
                  (querySnapshot) => {
                    var heritages = [];
                    this.heritages = [];

                    querySnapshot.forEach((doc) => {
                      const data = {
                        id: doc.id,
                        categories: doc.data().categories,
                        name: doc.data().name,
                        ownerName: doc.data().ownerName,
                        mapperLocation: doc.data().mapperLocation,
                        baranggayLocation: doc.data().baranggayLocation,
                        yearConstructed: doc.data().yearConstructed,
                        photoURL: doc.data().heritage_picture,
                        latitude: doc.data().lat,
                        longitude: doc.data().lng,
                        mapperName: doc.data().mapperName,
                        timestamp: doc.data().timestamp,
                        mid: doc.data().uid,
                      };
                      heritages.push(data);
                    });

                    for (let i = 0; i < heritages.length; i++) {
                      this.heritages.unshift(heritages[i]);
                    }
                  },
                  (err) => {}
                );
            }
          });
      } else {
      }
    },

    hasErrorNotif(err) {
      this.$q.notify({
        type: "negative",
        message: `Something Went Wrong.`,
        caption: `ERROR: ${err.message}`,
        position: "bottom-left",
        timeout: 10000,
        actions: [
          {
            dense: true,
            icon: "close",
            color: "white",
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    },

    uploadSuccessNotif() {
      this.$q.notify({
        type: "positive",
        message: "Cultural heritage successfully approved.",
        position: "bottom-left",
      });
    },

    goHome() {
      this.$router.push("/");
      this.updateProfile = false;
      this.culturalHeritages = false;
      this.manageHeritages = false;
      this.viewHeritageFromNotif = false;
      this.viewCulturalHeritageDetails = false;
    },

    goBack() {
      this.$router.push(`/manage-heritages`);
      this.updateProfile = false;
      this.culturalHeritages = false;
      this.manageHeritages = false;
      this.viewCulturalHeritageDetails = false;
    },

    goBack1() {
      this.$router.push(`/cultural-heritages`);
      this.updateProfile = false;
      this.culturalHeritages = false;
      this.manageHeritages = false;
      this.viewCulturalHeritageDetails = false;
    },
  },
};
</script>
