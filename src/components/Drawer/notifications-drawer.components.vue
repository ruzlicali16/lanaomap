<template>
  <q-drawer
    v-model="notifDrawerState"
    side="right"
    overlay
    behavior="mobile"
    :width="350"
    @hide="hide"
  >
    <q-toolbar
      class="shadow-2"
      :class="showNotifList ? 'bg-blue' : 'bg-grey'"
    >
      <q-toolbar-title
        v-if="showNotifList"
        class="text-white q-ml-xs"
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
        >{{ mapperLocation }}
      </q-toolbar-title>
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
    <!-- New Heritages -->
    <div
      v-if="newHeritagesCounter != 0 && showNotifList"
      class="q-pl-sm text-overline"
    >
      <q-chip class="bg-blue text-white text-caption" label="New Heritages" />
    </div>
    <q-list v-show="showNotifList" bordered separator>
      <q-item
        v-for="heritage in newHeritages"
        :key="heritage.id"
        v-ripple
        clickable
        @click="viewDoc(heritage.id)"
      >
        <q-item-section>
          <q-item-label
            class="text-overline text-weight-bold text-blue"
            style="font-size: 15px"
            >{{ heritage.name }}</q-item-label
          >
          <q-item-label
            class="text-caption text-grey-8 text-weight-medium text-uppercase"
          >
            Uploaded by: {{ heritage.uploadedBy }}
          </q-item-label>
          <q-item-label
            caption
            class="text-grey-10 text-caption text-weight-regular"
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
    </q-list>
    <!-- Changes Heritages -->
    <div
      v-if="newChangesCounter != 0 && showNotifList"
      class="q-pl-sm text-overline"
    >
      <q-chip
        class="bg-deep-orange text-white text-caption"
        label="New Changes"
      />
    </div>
    <q-list v-show="newChangesCounter != 0 && showNotifList" bordered separator>
      <q-item
        v-for="heritage in newChanges"
        :key="heritage.id"
        v-ripple
        clickable
        @click="viewDoc(heritage.id)"
        @mouseover="show = true"
        @mouseout="show = false"
      >
        <q-item-section>
          <q-item-label
            class="text-overline text-weight-bold text-deep-orange"
            style="font-size: 15px"
            >{{ heritage.name }}</q-item-label
          >
          <q-item-label
            class="text-caption text-grey-8 text-weight-medium text-uppercase"
          >
            Edited by: {{ heritage.uploadedBy }}
          </q-item-label>
          <q-item-label
            caption
            class="text-grey-10 text-caption text-weight-regular"
          >
            {{ heritage.timestamp }}
          </q-item-label>
        </q-item-section>
        <q-item-section v-show="show" side>
          <q-btn
            flat
            round
            icon="close"
            text-color="black"
            size="sm"
            @click.stop="closeChanges(heritage.id, 'changes')"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- Approved heritages -->
    <div
      v-if="approveHeritagesCounter != 0 && showNotifList"
      class="q-pl-sm text-overline"
    >
      <q-chip
        class="bg-green text-white text-caption"
        label="New approved heritage(s)"
      />
    </div>
    <q-list
      v-show="approveHeritagesCounter != 0 && showNotifList"
      bordered
      separator
    >
      <q-item
        v-for="heritage in approveHeritages"
        :key="heritage.id"
        v-ripple
        clickable
        @click="viewDoc(heritage.id)"
        @mouseover="show = true"
        @mouseout="show = false"
      >
        <q-item-section>
          <q-item-label
            class="text-overline text-weight-bold text-grey-10"
            style="font-size: 15px"
            >{{ heritage.name }}</q-item-label
          >
          <!-- <q-item-label
            class="text-caption text-red text-weight-medium text-uppercase"
          >
            Message: {{ heritage.message }}
          </q-item-label> -->
          <q-item-label
            caption
            class="text-grey-8 text-caption text-weight-regular"
          >
            {{ heritage.timestamp }}
          </q-item-label>
        </q-item-section>
        <q-item-section v-show="show" side>
          <q-btn
            flat
            round
            icon="close"
            text-color="black"
            size="sm"
            @click.prevent="closeChanges(heritage.id, 'approve')"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- Disapproved heritages -->
    <div
      v-if="disapproveHeritagesCounter != 0 && showNotifList"
      class="q-pl-sm text-overline"
    >
      <q-chip
        class="bg-red text-white text-caption"
        label="New disapproved heritage(s)"
      />
    </div>
    <q-list
      v-show="disapproveHeritagesCounter != 0 && showNotifList"
      bordered
      separator
    >
      <q-item
        v-for="heritage in disapproveHeritages"
        :key="heritage.id"
        v-ripple
        clickable
        @click="viewDoc(heritage.id)"
        @mouseover="show = true"
        @mouseout="show = false"
      >
        <q-item-section>
          <q-item-label
            class="text-overline text-weight-bold text-grey-10"
            style="font-size: 15px"
            >{{ heritage.name }}</q-item-label
          >
          <q-item-label
            class="text-caption text-red text-weight-medium text-uppercase"
          >
            Message: {{ heritage.message }}
          </q-item-label>
          <q-item-label
            caption
            class="text-grey-8 text-caption text-weight-regular"
          >
            {{ heritage.timestamp }}
          </q-item-label>
        </q-item-section>
        <q-item-section v-show="show" side>
          <q-btn
            flat
            round
            icon="close"
            text-color="black"
            size="sm"
            @click.prevent="closeChanges(heritage.id, 'disapprove')"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div
      v-if="
        newChangesCounter == 0 &&
          newHeritagesCounter == 0 &&
          disapproveHeritagesCounter == 0 &&
          approveHeritagesCounter == 0
      "
      class="text-overline text-grey-8 absolute-center"
    >
      No notifications
    </div>
    <!-- View Doc -->
    <q-linear-progress v-show="loading" :indeterminate="loading" />

    <div v-show="!showNotifList && hidden">
      <q-card class="my-card no-shadow text-justify">
        <img v-if="photoURL != ''" :src="photoURL" />
        <img v-else src="../../assets/no-image.png" />

        <q-card-section class="q-pb-none">
          <div
            class="text-uppercase text-caption text-bold text-red"
            v-show="verified == 'disapproved'"
          >
            Message: {{ message }}
          </div>
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

        <q-card-actions
          v-if="position != 'Mapper'"
          class="q-pt-md"
          align="around"
        >
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

import { db, auth } from "../../Firestore/firebaseInit";

export default {
  name: "NotificationDrawer",

  data() {
    return {
      photoURL: null,
      timestamp: null,
      hid: null,
      position: null,

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
      changes: null,
      verified: null,
      message: null,

      selectedHeritage: null,

      currentUser: false,
      rightDrawer: false,
      showNotifList: false,
      hidden: true,
      loading: false,
      show: false,
      newHeritagesCounter: 0,
      newChangesCounter: 0,
      approveHeritagesCounter: 0,
      disapproveHeritagesCounter: 0,
      // notificationsCounter: 0,
      heritages: [],
      newHeritages: [],
      newChanges: [],
      approveHeritages: [],
      disapproveHeritages: [],
    };
  },

  created() {
    this.showNotifList = true;
    this.hidden = true;
    this.loading = false;
    this.selectedHeritage = this.$store.state.services.selectedValue2;
    this.getNewHeritageNotif();
    this.getChangesHeritageNotif();
    this.getApprovedHeritageNotif();
    this.getDisapprovedHeritageNotif();
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
    closeChanges(hid, type) {
      if (type == "changes") {
        db.collection("heritages")
          .doc(hid)
          .update({
            changes: false,
          })
          .catch((err) => {
          });
      } else if (type == "approve") {
        db.collection("heritages")
          .doc(hid)
          .update({
            viewed: true,
          })
          .catch((err) => {
          });
      } else if (type == "disapprove") {
        db.collection("heritages")
          .doc(hid)
          .update({
            viewed: true,
          })
          .catch((err) => {
          });
      }
    },

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
              viewed: false,
              message: "",
            })
            .then(() => {
              this.approveSuccessNotif();
              this.$q.loading.hide();
              this.loading = false;
              this.showNotifList = true;
            })
            .catch((err) => {
              this.hasErrorNotif(err);
            });
        })
        .onCancel(() => {
        });
    },

    disapprove() {
      this.$q
        .dialog({
          title: "Disapprove?",
          message: "Need Feedback (Minimum 10 characters)",
          prompt: {
            model: "",
            isValid: (val) => val.length > 10, // << here is the magic
            type: "text", // optional
          },
          cancel: true,
          persistent: true,
          color: "red",
        })
        .onOk((message) => {
          this.$q.loading.show({
            message: `Some important is in progress. Please wait patiently.`,
          });
          this.loading = true;
          db.collection("heritages")
            .doc(this.hid)
            .update({
              verified: "disapproved",
              message: message,
              viewed: false,
            })
            .then(() => {
              this.$q.notify({
                type: "negative",
                message: `Successfully Disapprove.`,
                position: "top-right",
              });
              this.$q.loading.hide();
              this.loading = false;
              this.backHandling();
            })
            .catch((err) => {
              this.hasErrorNotif(err);
            });
        })
        .onCancel(() => {
        });
    },

    viewFullDetails() {
      if (this.$router.currentRoute.path != `/mh/view-details/${this.hid}`) {
        this.$router.push(`/mh/view-details/${this.hid}`);
        this.viewHeritageFromNotif = true;
      } else {
        this.notifDrawerState = false;
      }
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
          this.changes = doc.data().changes;
          this.verified = doc.data().verified;
          this.message = doc.data().message;

          this.hidden = true;
          this.loading = false;
        })
        .catch((err) => {
          this.hasErrorNotif(err);
        });
    },

    getNewHeritageNotif() {
      var user = auth.currentUser;
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .get()
          .then((doc) => {
            var location = doc.data().location;
            this.position = doc.data().position;

            if (this.position == "Municipal Admin") {
              return db
                .collection("heritages")
                .where("mapperLocation", "==", location)
                .where("verified", "==", false)
                .onSnapshot(
                  (querySnapshot) => {
                    var newHeritages = [];
                    this.newHeritages = [];

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
                      newHeritages.push(data);
                    });

                    for (let i = 0; i < newHeritages.length; i++) {
                      this.newHeritages.unshift(newHeritages[i]);
                    }

                    this.newHeritagesCounter = newHeritages.length;
                    this.notificationsCounter =
                      this.newHeritagesCounter + this.newChangesCounter;
                  },
                  (err) => {
                  }
                );
            }
          })
          .catch((err) => {
          });
      }
    },

    getChangesHeritageNotif() {
      var user = auth.currentUser;
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
                .where("verified", "==", true)
                .where("changes", "==", true)
                .onSnapshot(
                  (querySnapshot) => {
                    var newChanges = [];
                    this.newChanges = [];

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
                      newChanges.push(data);
                    });

                    for (let i = 0; i < newChanges.length; i++) {
                      this.newChanges.unshift(newChanges[i]);
                    }

                    this.newChangesCounter = newChanges.length;

                    this.notificationsCounter =
                      this.newHeritagesCounter + this.newChangesCounter;
                  },
                  (err) => {
                  }
                );
            }
          })
          .catch((err) => {
          });
      }
    },

    getApprovedHeritageNotif() {
      var user = auth.currentUser;
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .get()
          .then((doc) => {
            var location = doc.data().location;
            var position = doc.data().position;

            if (position == "Mapper") {
              return db
                .collection("heritages")
                .where("mapperLocation", "==", location)
                .where("verified", "==", true)
                .where("viewed", "==", false)
                .onSnapshot(
                  (querySnapshot) => {
                    var approveHeritages = [];
                    this.approveHeritages = [];

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
                      approveHeritages.push(data);
                    });

                    for (let i = 0; i < approveHeritages.length; i++) {
                      this.approveHeritages.unshift(approveHeritages[i]);
                    }

                    this.approveHeritagesCounter = approveHeritages.length;
                    this.notificationsCounter =
                      this.approveHeritagesCounter +
                      this.disapproveHeritagesCounter;
                  },
                  (err) => {
                  }
                );
            }
          })
          .catch((err) => {
          });
      }
    },

    getDisapprovedHeritageNotif() {
      var user = auth.currentUser;
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .get()
          .then((doc) => {
            var location = doc.data().location;
            var position = doc.data().position;

            if (position == "Mapper") {
              return db
                .collection("heritages")
                .where("mapperLocation", "==", location)
                .where("verified", "==", "disapproved")
                .where("viewed", "==", false)
                .onSnapshot(
                  (querySnapshot) => {
                    var disapproveHeritages = [];
                    this.disapproveHeritages = [];

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
                        message: doc.data().message,
                      };
                      disapproveHeritages.push(data);
                    });

                    for (let i = 0; i < disapproveHeritages.length; i++) {
                      this.disapproveHeritages.unshift(disapproveHeritages[i]);
                    }

                    this.disapproveHeritagesCounter =
                      disapproveHeritages.length;

                    this.notificationsCounter =
                      this.approveHeritagesCounter +
                      this.disapproveHeritagesCounter;
                  },
                  (err) => {
                  }
                );
            }
          })
          .catch((err) => {
          });
      }
    },

    hasErrorNotif(err) {
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

    hide() {
      this.showNotifList = true;
    },
  },
};
</script>
