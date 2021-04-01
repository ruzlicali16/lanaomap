<template>
  <q-card :style="loading ? 'height: 250px;' : ''">
    <q-spinner
      v-show="loading"
      class="absolute-center"
      color="green"
      size="3em"
    />
    <q-form v-show="!loading">
      <q-card-section>
        <p class="text-h5 text-weight-regular">I. Background Information</p>
        <div class="q-gutter-sm" :class="this.$q.screen.lt.md ? '' : 'row'">
          <div class="col">
            <q-input
              outlined
              dense
              ref="input"
              v-model="name"
              label="Name of Immovable Heritage"
              color="green"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Field is required']"
            />
          </div>
          <div :class="showInputIfOther ? 'row col-auto' : 'col'">
            <q-select
              outlined
              dense
              use-input
              v-model="type"
              :options="optionFirst"
              label="Type"
              color="green"
              @filter="filterFn"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Field is required']"
            >
              <template v-if="type" v-slot:append>
                <q-icon
                  name="clear"
                  @click.stop="type = ''"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col" :hidden="!showInputIfOther">
            <q-input
              dense
              v-model="otherType"
              placeholder="Please specify the other type"
              label="Type: Other"
              color="green"
              stack-label
              hide-bottom-space
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Field is required']"
            />
          </div>
        </div>
        <div
          class="q-gutter-sm q-pt-sm"
          :class="this.$q.screen.lt.md ? '' : 'row'"
        >
          <div class="col">
            <q-select
              outlined
              dense
              v-model="ownership"
              :options="ownershipOption"
              label="Ownership"
              color="green"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Field is required']"
            >
              <template v-if="ownership" v-slot:append>
                <q-icon
                  name="clear"
                  @click.stop="ownership = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-select>
          </div>
          <div class="col">
            <q-select
              outlined
              dense
              use-input
              v-model="location"
              :options="locationOption"
              label="Barangay location"
              color="green"
              @filter="filterFn"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Field is required']"
            >
              <template v-if="location" v-slot:append>
                <q-icon
                  name="clear"
                  @click.stop="location = ''"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="latitude"
              type="number"
              label="Latitude"
              color="green"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="longitude"
              type="number"
              label="Longitude"
              color="green"
            />
          </div>
        </div>
        <div
          class="q-gutter-sm q-pt-sm"
          :class="this.$q.screen.lt.md ? '' : 'row'"
        >
          <div class="col">
            <q-input
              outlined
              dense
              v-model="totalArea"
              label="Total Land Area"
              color="green"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="structure"
              label="Structure"
              color="green"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="date"
              mask="####"
              label="Year Constructed"
              color="green"
              hide-bottom-space
              hide-hint
            />
          </div>
        </div>
        <div
          class="q-gutter-sm q-pt-sm"
          :class="this.$q.screen.lt.md ? '' : 'row'"
        >
          <div class="col">
            <q-input
              outlined
              dense
              v-model="ownershipJurisdiction"
              label="Owership / Jurisdiction"
              color="green"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="declarationLegislation"
              label="Declaration / Legislation"
              color="green"
            />
          </div>
        </div>
        <div class="q-pt-sm" :class="this.$q.screen.lt.md ? '' : 'row'">
          <div class="col-4">
            <q-file
              v-model="url"
              outlined
              dense
              label="Choose an image"
              color="green"
              @input="inputFile"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
              <template v-slot:after>
                <q-btn
                  v-if="url"
                  dense
                  flat
                  round
                  icon="close"
                  @click="clearImage"
                />
              </template>
            </q-file>
          </div>
        </div>
        <div v-if="url || photoURL" :class="this.$q.screen.lt.md ? '' : 'row'">
          <div class="q-mt-sm shadow-3">
            <q-img
              v-if="url"
              :style="
                this.$q.screen.lt.md
                  ? ''
                  : 'width: 600px; max-height: 400px; max-width: 100%;'
              "
              :src="selectedFile"
            ></q-img>
            <q-img
              v-if="!url"
              :style="
                this.$q.screen.lt.md
                  ? ''
                  : 'width: 600px; max-height: 400px; max-width: 100%;'
              "
              :src="photoURL"
            ></q-img>
          </div>
        </div>
        <p
          class="q-mt-md text-h6 text-weight-medium text-center text-white bg-green"
        >
          References
        </p>
        <div class="q-gutter-sm" :class="this.$q.screen.lt.md ? '' : 'row'">
          <div class="col">
            <q-input
              outlined
              dense
              v-model="keyInformants"
              label="Key Informant(s)"
              color="green"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="reference"
              label="Reference"
              color="green"
            />
          </div>
        </div>
        <div
          class="q-pt-sm q-gutter-sm"
          :class="this.$q.screen.lt.md ? '' : 'row'"
        >
          <div class="col">
            <q-input
              outlined
              dense
              v-model="mapperName"
              label="Name of Profiler/Mapper"
              color="green"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="dateProfiled"
              mask="date"
              label="Date Profiled"
              color="green"
              hint="Format: YYYY/MM/DD"
              hide-hint
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="dateProfiled"
                      @input="() => $refs.qDateProxy.hide()"
                      color="green"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import { db, auth } from "../../../Firestore/firebaseInit";

const locationOption = [];
export default {
  name: "bg-information",

  data() {
    return {
      name: "",
      type: "",
      otherType: "",
      ownership: "",
      location: "",
      locationOption: locationOption,
      latitude: "",
      longitude: "",
      totalArea: "",
      structure: "",
      date: "",
      ownershipJurisdiction: "",
      declarationLegislation: "",
      files: "",
      keyInformants: "",
      reference: "",
      mapperName: "",
      dateProfiled: "",

      selectedFile: "",
      photoURL: null,
      url: null,

      optionFirst: [],
      ownershipOption: ["Public", "Private"],

      showInputIfOther: false,
      hid: null,
      loading: false, // default should true
    };
  },

  created() {
    this.extractBarangays();
    this.hid = this.$route.params.heritage_id;
    if (this.hid != undefined) {
      this.getData();
    }

    if (this.$q.screen.lt.md) {
    }
  },

  updated() {
    this.setInputs;
    if (this.type == "Other") {
      this.showInputIfOther = true;
      this.$store.state.services.type = this.$store.state.services.otherType;
    } else {
      this.showInputIfOther = false;
      this.otherType = "";
    }
  },

  computed: {
    setInputs() {
      this.$store.state.services.name = this.name;
      this.$store.state.services.type = this.type;
      this.$store.state.services.otherType = this.otherType;
      this.$store.state.services.ownership = this.ownership;
      this.$store.state.services.location = this.location;
      this.$store.state.services.latitude = this.latitude;
      this.$store.state.services.longitude = this.longitude;
      this.$store.state.services.totalArea = this.totalArea;
      this.$store.state.services.structure = this.structure;
      this.$store.state.services.date = this.date;
      this.$store.state.services.ownershipJurisdiction = this.ownershipJurisdiction;
      this.$store.state.services.declarationLegislation = this.declarationLegislation;
      // this.$store.state.services.files = this.files;
      this.$store.state.services.keyInformants = this.keyInformants;
      this.$store.state.services.reference = this.reference;
      this.$store.state.services.mapperName = this.mapperName;
      this.$store.state.services.dateProfiled = this.dateProfiled;
    },
  },

  methods: {
    getData() {
      this.name = this.$store.state.services.name;
      this.type = this.$store.state.services.type;
      this.ownership = this.$store.state.services.ownership;
      this.location = this.$store.state.services.location;
      this.latitude = this.$store.state.services.latitude;
      this.longitude = this.$store.state.services.longitude;
      this.totalArea = this.$store.state.services.totalArea;
      this.structure = this.$store.state.services.structure;
      this.date = this.$store.state.services.date;
      this.ownershipJurisdiction = this.$store.state.services.ownershipJurisdiction;
      this.declarationLegislation = this.$store.state.services.declarationLegislation;
      this.files = this.$store.state.services.files;
      this.photoURL = this.$store.state.services.photoURL;
      this.keyInformants = this.$store.state.services.keyInformants;
      this.reference = this.$store.state.services.reference;
      this.mapperName = this.$store.state.services.mapperName;
      this.dateProfiled = this.$store.state.services.dateProfiled;
    },

    clearImage() {
      this.url = null;
      this.$store.state.services.files = "";
    },

    inputFile(val) {
      this.selectedFile = URL.createObjectURL(val);
      if (this.url != null) {
        this.$store.state.services.files = val;
      }
    },

    extractBarangays() {
      var user = auth.currentUser;
      var mapperLocation = null;

      db.collection("profiles")
        .doc(user.uid)
        .get()
        .then((doc) => {
          mapperLocation = doc.data().location;
          var brgy = this.$store.state.ldsmap[mapperLocation];
          var brgyNew = brgy;
          if (brgy !== "undefined") {
            for (let i = 0; i < brgy.length; i++) {
              this.locationOption.splice(brgy[i]);
            }
            for (let i = 0; i < brgyNew.length; i++) {
              this.locationOption.unshift(brgyNew[i]);
            }
            this.locationOption.sort();
          } else {
            this.location = "";
            for (let i = 0; i < brgy.length; i++) {
              this.locationOption.splice(brgy[i]);
            }
          }
        });
    },

    filterFn(val, update) {
      this.optionFirst = [];
      var selectedCategory = this.$store.state.services.selectedCategory;
      // if (this.hid != undefined) {
      //   selectedCategory = this.selectedCategory;
      // }

      const govtOption = this.$store.state.services.govtOption;
      const schoolOption = this.$store.state.services.schoolOption;
      const hospitalOption = this.$store.state.services.hospitalOption;
      const churchesOption = this.$store.state.services.churchesOption;
      const monumentsOption = this.$store.state.services.monumentsOption;
      const sitesOption = this.$store.state.services.sitesOption;
      const heritageOption = this.$store.state.services.heritageOption;

      if (val === "") {
        update(() => {
          this.locationOption = locationOption;
          this.extractBarangays();
          if (selectedCategory == "Govt") {
            this.optionFirst = govtOption;
          } else if (selectedCategory == "School") {
            this.optionFirst = schoolOption;
          } else if (selectedCategory == "Hospital") {
            this.optionFirst = hospitalOption;
          } else if (selectedCategory == "Churches") {
            this.optionFirst = churchesOption;
          } else if (selectedCategory == "Monuments") {
            this.optionFirst = monumentsOption;
          } else if (selectedCategory == "Sites") {
            this.optionFirst = sitesOption;
          } else if (selectedCategory == "Heritage") {
            this.optionFirst = heritageOption;
          }
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.locationOption = locationOption.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
        if (selectedCategory == "Govt") {
          this.optionFirst = govtOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "School") {
          this.optionFirst = schoolOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Hospital") {
          this.optionFirst = hospitalOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Churches") {
          this.optionFirst = churchesOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Monuments") {
          this.optionFirst = monumentsOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Sites") {
          this.optionFirst = sitesOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Heritage") {
          this.optionFirst = heritageOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
  },
};
</script>
