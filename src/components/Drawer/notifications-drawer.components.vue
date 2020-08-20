<template>
  <q-drawer
    v-model="notifDrawerState"
    side="right"
    overlay
    behavior="mobile"
    :width="350"
  >
    <q-toolbar
      class="shadow-2"
      :class="showNotifList ? 'bg-green-6' : 'bg-grey'"
    >
      <q-toolbar-title
        v-if="showNotifList"
        class="text-white q-ml-xs"
        style="font-family: ubuntu"
        >Notifications</q-toolbar-title
      >

      <q-btn
        v-show="!showNotifList"
        dense
        round
        flat
        color="white"
        icon="arrow_back"
        @click="backHandling"
      />

      <q-toolbar-title
        v-show="!showNotifList"
        class="text-white text-subtitle2 q-ml-xs"
        >{{ mapperLocation }}</q-toolbar-title
      >
      <q-btn
        v-show="showNotifList"
        dense
        round
        flat
        color="white"
        icon="close"
        @click="notifDrawerState = !notifDrawerState"
      />
    </q-toolbar>
    <div
      v-if="notificationsCounter != 0 && showNotifList"
      class="q-pl-sm text-overline text-green"
    >
      New Heritages
    </div>
    <q-list v-show="showNotifList" bordered separator>
      <q-item
        v-for="heritage in heritages"
        :key="heritage.id"
        v-ripple
        clickable
        @click="viewDoc(heritage.id)"
      >
        <q-item-section>
          <q-item-label class="text-h6 text-weight-regular">{{
            heritage.name
          }}</q-item-label>
          <q-item-label class="text-caption text-grey-6 text-weight-medium">
            Uploaded By: {{ heritage.uploadedBy }}
          </q-item-label>
          <q-item-label
            caption
            class="text-grey text-caption text-weight-light"
          >
            {{ heritage.timestamp }}
          </q-item-label>
        </q-item-section>

        <q-item-section
          v-if="heritage.photoURL != ''"
          thumbnail
          class="q-mx-auto"
        >
          <img :src="heritage.photoURL" />
        </q-item-section>
        <q-item-section v-else thumbnail class="q-mx-auto">
          <img src="../../assets/no-image.png" />
        </q-item-section>
      </q-item>

      <div
        v-if="notificationsCounter == 0"
        class="text-overline text-grey-8 absolute-center"
      >
        No notifications
      </div>
    </q-list>

    <!-- View Doc -->
    <q-linear-progress :hidden="hidden" :indeterminate="loading" />
    <div v-show="!showNotifList && hidden">
      <q-card class="my-card no-shadow text-justify">
        <img v-if="photoURL != ''" :src="photoURL" />
        <img v-else src="../../assets/no-image.png" />

        <q-card-section class="q-pb-none">
          <!-- <q-btn
            fab
            color="green"
            icon="near_me"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
            @click="locateHeritage()"
          /> -->

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ name }}
            </div>
            <div
              class="col-auto text-grey text-caption row no-wrap items-center"
            >
              <q-icon name="place" />
              Brgy. {{ baranggayLocation }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle2 text-grey-8">- {{ categories }}</div>
          <div class="text-subtitle2 text-grey-8">- {{ heritageType }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div
            class="text-caption text-weight-light
          "
          >
            Uploaded On:
            <span class="text-weight-bold text-grey-10">{{ createdAt }}</span>
          </div>
        </q-card-section>

        <q-separator />

        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="person" />
            </q-item-section>

            <q-item-section v-if="heritageType == 'Movable'">
              <q-item-label class="text-caption">{{
                nameOfOwner
              }}</q-item-label>
              <q-item-label caption>Owner</q-item-label>
            </q-item-section>

            <q-item-section v-else-if="heritageType == 'Immovable'">
              <q-item-label class="text-caption">{{
                ownershipJurisdiction
              }}</q-item-label>
              <q-item-label caption>Ownership/Jurisdiction</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="amber" name="date_range" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-caption">{{
                dateFoundProduce
              }}</q-item-label>
              <q-item-label caption>Year constructed</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="green" name="person_pin" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-caption">{{ mapperName }}</q-item-label>
              <q-item-label caption>Mapper</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-card-actions class="q-pt-md q-pa-none" align="center">
          <q-btn
            class="full-width text-grey-10"
            label="View Full Details"
            icon-right="more_horiz"
            dense
            flat
            @click="viewFullDetails()"
          />
        </q-card-actions>
        <q-separator />

        <q-card-actions class="q-pt-md" align="around">
          <q-btn
            outline
            color="red"
            label="Disapprove"
            icon="clear"
            style="width: 150px"
            dense
            @click="disapprove()"
          />
          <q-btn
            align="center"
            color="blue"
            label="Approve"
            icon="check"
            style="width: 150px"
            dense
            @click="approve()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-drawer>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";

export default {
  name: "NotificationDrawer",

  data() {
    return {
      photoURL: null,
      timestamp: null,
      hid: null,

      photoURL: null,
      name: null,
      dateFoundProduce: null,
      categories: null,
      heritageType: null,
      baranggayLocation: null,
      latitude: null,
      longitude: null,
      mapperName: null,
      nameOfOwner: null,
      ownershipJurisdiction: null,
      mapperLocation: null,
      createdAt: null,

      selectedHeritage: null,

      currentUser: false,
      rightDrawer: false,
      showNotifList: false,
      hidden: true,
      loading: false,
      notificationsCounter: 0,
      heritages: [],
    };
  },

  created() {
    this.showNotifList = true;
    this.hidden = true;
    this.loading = false;
    this.selectedHeritage = this.$store.state.services.selectedValue2;
    this.getNotification();
  },

  computed: {
    lat: {
      get() {
        // console.log("get lat - 1", this.$store.state.admin.lat);
        return this.$store.state.admin.lat;
      },
      set(val) {
        // console.log("set lat - 1");
        this.$store.dispatch("admin/lat", val);
      },
    },

    lng: {
      get() {
        // console.log("get lng - 2", this.$store.state.admin.lng);
        return this.$store.state.admin.lng;
      },
      set(val) {
        // console.log("set lng - 2", this.$store.state.admin.lng);
        this.$store.dispatch("admin/lng", val);
      },
    },

    notifDrawerState: {
      get() {
        return this.$store.state.siteNav.notifDrawerState;
      },

      set(val) {
        this.$store.dispatch("siteNav/notifDrawerState", val);
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
    // locateHeritage() {
    //   this.lat = this.latitude;
    //   this.lng = this.longitude;
    // },

    approve() {
      this.$q
        .dialog({
          title: "Approve?",
          message: "Are you sure you want to approve this heritage?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$q.loading.show({
            message: `Some important is in progress. Please wait patiently.`,
          });
          this.loading = true;
          db.collection("heritages")
            .doc(this.hid)
            .update({
              verified: true,
            })
            .then(() => {
              this.approveSuccessNotif();
              this.$q.loading.hide();
              this.loading = false;
            })
            .catch((err) => {
              this.hasErrorNotif(err);
            });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },

    disapprove() {
      this.$q
        .dialog({
          title: "Disapprove?",
          message: "Are you sure you want to disapprove this heritage?",
          color: "red",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$q.loading.show({
            message: `Some important is in progress. Please wait patiently.`,
          });
          this.loading = true;
          db.collection("heritages")
            .doc(this.hid)
            .update({
              verified: "disapproved",
            })
            .then(() => {
              this.$q.notify({
                type: "negative",
                message: `Successfully Disapprove.`,
                position: "top-right",
              });
              this.$q.loading.hide();
              this.loading = false;
            })
            .catch((err) => {
              this.hasErrorNotif(err);
            });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },

    viewFullDetails() {
      this.$router.push(`/mh/view-details/${this.hid}`);
      this.viewHeritageFromNotif = true;
    },

    viewDoc(hid) {
      this.hid = hid;
      this.showNotifList = false;
      this.hidden = false;
      this.loading = true;
      db.collection("heritages")
        .doc(hid)
        .get()
        .then((doc) => {
          this.name = doc.data().name;
          this.nameOfOwner = doc.data().nameOfOwner;
          this.mapperName = doc.data().mapperName;
          this.mapperLocation = "MUNICIPALITY OF " + doc.data().mapperLocation;
          this.baranggayLocation = doc.data().baranggayLocation;
          this.latitude = doc.data().lat;
          this.longitude = doc.data().lng;
          this.photoURL = doc.data().photoURL;
          this.heritageType = doc.data().heritageType;
          this.ownershipJurisdiction = doc.data().ownershipJurisdiction;
          this.dateFoundProduce = doc.data().dateFoundProduce;
          this.categories = doc.data().categories;
          this.createdAt = doc.data().timestamp;

          this.hidden = true;
          this.loading = false;
        })
        .catch((err) => {
          console.log("notifications");
          this.hasErrorNotif(err);
        });
    },

    getNotification() {
      var user = firebase.auth().currentUser;
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .get()
          .then((doc) => {
            var location = doc.data().location;
            var position = doc.data().position;

            if (position == "Municipal Admin") {
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
                        heritageType: doc.data().heritageType,
                        name: doc.data().name,
                        nameOfOwner: doc.data().nameOfOwner,
                        ownershipJurisdiction: doc.data().ownershipJurisdiction,
                        mapperLocation: doc.data().mapperLocation,
                        baranggayLocation: doc.data().baranggayLocation,
                        dateFoundProduce: doc.data().dateFoundProduce,
                        photoURL: doc.data().photoURL,
                        latitude: doc.data().lat,
                        longitude: doc.data().lng,
                        uploadedBy: doc.data().uploadedBy,
                        timestamp: doc.data().timestamp,
                        mid: doc.data().uid,
                      };
                      heritages.push(data);
                    });

                    for (let i = 0; i < heritages.length; i++) {
                      this.heritages.unshift(heritages[i]);
                    }

                    this.notificationsCounter = heritages.length;
                  },
                  (err) => {
                    console.log(err.message);
                    // this.hasErrorNotif(err);
                  }
                );
            }
          })
          .catch((err) => {
            console.log(err.message);
            // this.hasErrorNotif(err);
          });
      }
    },

    hasErrorNotif(err) {
      console.log("error here");
      this.$q.notify({
        type: "negative",
        message: `Something went wrong. ERROR ${err.message}`,
        position: "bottom-left",
      });
    },

    approveSuccessNotif() {
      // this.loading = false;
      this.$q.notify({
        type: "positive",
        message: `Cultural heritage successfully approved.`,
        position: "bottom-left",
      });
    },

    backHandling() {
      this.showNotifList = true;
      this.hidden = true;
      this.loading = false;
    },
  },
};
</script>
