<template>
  <q-card class="q-pa-none no-shadow full-width full-height">
    <q-form>
      <p class="text-caption text-center text-grey-8">
        Please fill the information about this
        <span class="text-weight-bold">cultural heritage</span>. This
        <span class="text-weight-bold">cultural heritage</span> will be publicly
        visible.
      </p>
      <q-card-section class="q-pa-none q-gutter-y-md">
        <q-select
          v-model="categories"
          input-debounce="0"
          label="Categories*"
          behavior="menu"
          options-selected-class="text-green"
          :options="catOptions"
          use-input
          options-dense
          dense
          use-chips
          @filter="filterFn"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>

          <template v-slot:before>
            <q-icon icon-left name="category" color="grey" size="xs" />
          </template>
        </q-select>

        <q-input
          :value="municipalities"
          label="Location Assigned*"
          disable
          options-dense
          dense
          @input="extractBarangays"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>

          <template v-slot:before>
            <q-icon icon-left name="location_city" color="grey" size="xs" />
          </template>
        </q-input>

        <q-select
          v-model="barangays"
          input-debounce="0"
          label="Barangays*"
          behavior="menu"
          options-selected-class="text-green"
          :options="brgyOptions"
          use-input
          options-dense
          dense
          use-chips
          @filter="filterFn"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>

          <template v-slot:before>
            <q-icon icon-left name="house" color="grey" size="xs" />
          </template>
        </q-select>

        <div class="row q-pb-md">
          <div class="col">
            <q-input
              class="input-number"
              v-model="lat"
              label="Latitude °N*"
              type="number"
              step="any"
              dense
            >
              <template v-slot:before>
                <q-icon icon-left name="add_location" color="grey" size="xs" />
              </template>

              <template v-if="lat" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop="lat = 7.849097589482096"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </div>

          <div class="col">
            <q-input
              class="input-number"
              v-model="lng"
              label="Longitude °E*"
              type="number"
              step="any"
              dense
            >
              <template v-slot:before>
                <q-space />
              </template>

              <template v-if="lng" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop="lng = 124.34394836425783"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <div class="q-px-md">
        <ToogleMap />
      </div>

      <q-card-section class="q-pa-none">
        <q-input
          v-model="ownerName"
          label="Owner name*"
          hint="Ex. FirstName MiddleName LastName - (Amenah Panolong Solaiman)"
          placeholder="Add owner complete name"
          hide-hint
          dense
        >
          <template v-slot:before>
            <q-icon icon-left name="person" color="grey" size="xs" />
          </template>

          <template v-if="ownerName" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop="ownerName = null"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <q-input
          v-model="heritageName"
          label="Heritage name*"
          hint="Ex. Turogan, Masjid, Debakan"
          placeholder="Add cultural heritage name"
          hide-hint
          dense
        >
          <template v-slot:before>
            <q-icon icon-left name="museum" color="grey" size="xs" />
          </template>

          <template v-if="heritageName" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop="heritageName = null"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <q-input
          v-model="yearConstructed"
          label="Year Constructed*"
          hint="Ex. YYYY/MM/DD"
          placeholder="Add year constructed"
          mask="date"
          hide-hint
          dense
        >
          <template v-slot:before>
            <q-icon icon-left name="date_range" color="grey" size="xs" />
          </template>

          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  :landscape="$q.screen.lt.md ? false : true"
                  v-model="yearConstructed"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          v-if="heritage_id == null"
          dense
          filled
          type="file"
          @change="onFileChanged"
        />
      </q-card-section>

      <div class="float-right q-py-md q-pr-md">
        <q-btn color="green" label="Cancle" @click="confirm" flat no-caps />

        <q-btn
          v-if="heritage_id == null"
          type="submit"
          color="green"
          label="Submit"
          :disable="disable"
          :loading="loading"
          @click="submitData"
          no-caps
        />

        <q-btn
          v-else
          type="submit"
          color="green"
          label="Update"
          :disable="disable"
          :loading="loading"
          @click="update"
          no-caps
        />
      </div>
    </q-form>
  </q-card>
</template>

<script>
import { Platform } from "quasar";
import { QSpinnerOval } from "quasar";

import { db, auth, firebaseStorage } from "../../Firestore/firebaseInit";
const ToogleMap = () => import("../Dialog/toggle-map.dialog.vue");

const categoriesOption = ["MOVABLE", "IMMOVABLE", "ARTIFACTS"];
const muncipalityOption = [];
const barangayOption = [];

export default {
  name: "MovableForm",

  components: {
    ToogleMap,
  },

  props: ["heritage_id", "selectedValue"],

  data() {
    return {
      categories: null,
      catOptions: categoriesOption,

      latitude: 0,
      longitude: 0,
      heritageName: null,
      ownerName: null,
      yearConstructed: null,
      mapperName: null,

      municipalities: null,
      munOptions: muncipalityOption,
      barangays: null,
      brgyOptions: barangayOption,

      disable: false,
      loading: false,
    };
  },

  created() {

    if (this.heritage_id == null || this.heritage_id == "undefined") {
      this.extractMunicipalities();
      this.extractBarangays();
    } else {

      this.getDocToEdit();
    }
  },

  computed: {
    addCulturalHeritage: {
      get() {
        return this.$store.state.siteNav.addCulturalHeritage;
      },
      set(val) {
        this.$store.dispatch("siteNav/addCulturalHeritage", val);
      },
    },

    lat: {
      get() {
        return this.$store.state.admin.lat;
      },
      set(val) {
        this.$store.commit("admin/lat", val);
      },
    },

    lng: {
      get() {
        return this.$store.state.admin.lng;
      },
      set(val) {
        this.$store.commit("admin/lng", val);
      },
    },
  },

  methods: {
    showLoading() {
      /* This is for Codepen (using UMD) to work */
      const spinner =
        typeof QSpinnerOval !== "undefined"
          ? QSpinnerOval // Non-UMD, imported above
          : Quasar.components.QSpinnerOval; // eslint-disable-line
      /* End of Codepen workaround */

      this.$q.loading.show({
        spinner,
        spinnerColor: "blue",
        spinnerSize: 70,
      });
    },

    getDocToEdit() {
      this.showLoading();

      db.collection("heritages")
        .doc(this.heritage_id)
        .get()
        .then((doc) => {
          this.categories = doc.data().categories;
          this.municipalities = doc.data().municipality;
          this.barangays = doc.data().barangay;
          this.lat = doc.data().lat;
          this.lng = doc.data().lng;
          this.ownerName = doc.data().owner_name;
          this.heritageName = doc.data().heritage_name;
          this.yearConstructed = doc.data().year_constructed;
          this.$q.loading.hide();
        });
    },

    extractMunicipalities() {
      var user = auth.currentUser;

      db.collection("profiles")
        .doc(user.uid)
        .get()
        .then((doc) => {
          this.municipalities = doc.data().location;
        });
    },

    extractBarangays() {
      var brgy = this.$store.state.ldsmap[this.municipalities];
      var brgyNew = brgy;
      if (this.municipalities) {
        for (let i = 0; i < brgy.length; i++) {
          this.brgyOptions.splice(brgy[i]);
        }
        for (let i = 0; i < brgyNew.length; i++) {
          this.brgyOptions.unshift(brgyNew[i]);
        }
        this.brgyOptions.sort();
      } else if ((brgy = "undefined")) {
        this.barangays = null;
        for (let i = 0; i < brgy.length; i++) {
          this.brgyOptions.splice(brgy[i]);
        }
      }
    },

    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    },

    update() {
      this.loading = true;
      this.disable = true;
      db.collection("heritages")
        .doc(this.heritage_id)
        .update({
          categories: this.categories,
          heritage_name: this.heritageName,
          owner_name: this.ownerName,
          municipality: this.municipalities,
          barangay: this.barangays,
          year_constructed: this.yearConstructed,
          lat: this.lat,
          lng: this.lng,
        })
        .then(() => {
          this.$nextTick(() => {
            this.$q.notify({
              type: "positive",
              message: `Heritage successfully updated.`,
              position: "bottom-left",
            });
            this.addCulturalHeritage = false;
            this.loading = false;
            this.disable = false;
          });
        })
        .catch((error) => {
          this.$q.notify({
            type: "negative",
            message: error.message,
            position: "bottom-left",
          });
        });
    },

    submitData() {
      var user = auth.currentUser;

      var today = new Date();
      var date =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;

      if (this.selectedFile == undefined) {
        this.loading = true;
        this.disable = true;

        db.collection("profiles")
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.mapperName = doc.data().firstname + " " + doc.data().lastname;

            return db.collection("heritages").add({
              uid: user.uid,
              categories: this.categories,
              municipality: this.municipalities,
              barangay: this.barangays,
              lat: this.lat,
              lng: this.lng,
              heritage_name: this.heritageName,
              owner_name: this.ownerName,
              mapper_name: this.mapperName,
              year_constructed: this.yearConstructed,
              verified: false,
              timestamp: dateTime,
            });
          })
          .then(() => {
            this.loading = false;
            this.disable = false;
            this.$q.notify({
              type: "positive",
              message: `Heritage you added will be reviewed by the official.`,
              position: "bottom-left",
            });
            this.addCulturalHeritage = false;
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
      } else {
        const storageRef = firebaseStorage
          .ref(`heritagepic/${this.selectedFile.name}`)
          .put(this.selectedFile);
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.loading = true;
            this.disable = true;
          },
          (error) => {
            this.loading = false;
            this.disable = false;
            this.$q.notify({
              type: "negative",
              message: error.message,
              position: "bottom-left",
            });
          },
          () => {
            storageRef.snapshot.ref
              .getDownloadURL()
              .then((url) => {
                db.collection("profiles")
                  .doc(user.uid)
                  .get()
                  .then((doc) => {
                    this.mapperName =
                      doc.data().firstname + " " + doc.data().lastname;

                    return db.collection("heritages").add({
                      heritage_picture: url,
                      uid: user.uid,
                      categories: this.categories,
                      municipality: this.municipalities,
                      barangay: this.barangays,
                      lat: this.lat,
                      lng: this.lng,
                      heritage_name: this.heritageName,
                      owner_name: this.ownerName,
                      mapper_name: this.mapperName,
                      year_constructed: this.yearConstructed,
                      verified: false,
                      timestamp: dateTime,
                    });
                  });
              })
              .then(() => {
                this.loading = false;
                this.disable = false;
                this.$q.notify({
                  type: "positive",
                  message: `Heritage you added will be reviewed by the official.`,
                  position: "bottom-left",
                });
                this.addCulturalHeritage = false;
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
          }
        );
      }
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.munOptions = muncipalityOption;
          this.brgyOptions = barangayOption;
          this.catOptions = categoriesOption;
          this.extractBarangays();
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.catOptions = categoriesOption.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
        this.munOptions = muncipalityOption.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
        this.brgyOptions = barangayOption.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    confirm() {
      if (
        this.categories == null &&
        this.municipalities == null &&
        this.barangays == null
      ) {
        this.addCulturalHeritage = false;
      } else {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Discard the changes you made?",
            cancel: "Keep editing",
            ok: "Discard",
            color: "red",
            persistent: true,
          })
          .onOk(() => {
            //discard
            this.addCulturalHeritage = false;
          });
      }
    },
  },

  beforeDestroy() {
    const data = this.$store.state.ldsmap.municipality_list;
    for (let i = 0; i < data.length; i++) {
      this.munOptions.pop(data[i]);
    }

    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }

    this.lat = 7.849097589482096;
    this.lng = 124.34394836425783;
  },
};
</script>

<style lang="css" scoped>
.input-number[type="number"]::-webkit-inner-spin-button,
.input-number[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
