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
              v-model="name"
              label="Name of Movable Heritage"
              color="green"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Field is required']"
            />
          </div>
          <div v-if="selectedCategory == 'Other'" class="col">
            <q-input
              outlined
              dense
              v-model="type"
              label="Type"
              color="green"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Field is required']"
            />
          </div>
          <div v-if="selectedCategory == 'Religious'" class="col">
            <q-input
              outlined
              dense
              v-model="religion"
              label="Religion / Denomination"
              color="green"
              hide-bottom-space
              hide-hint
              hint="Religion/Denomination where Object is Associated"
            />
          </div>
          <div
            v-if="selectedCategory != 'Other' && selectedCategory != 'Natural'"
            class="col"
            :class="showInputIfOther ? 'row col-auto' : 'col'"
          >
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
              hide-hint
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Field is required']"
            >
              <template v-if="type" v-slot:append>
                <q-icon
                  name="clear"
                  @click.stop="clearClassField()"
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

          <div
            v-if="selectedCategory == 'Natural'"
            class="col"
            :class="showInputIfOther ? 'row col-auto' : 'col'"
          >
            <q-select
              outlined
              dense
              use-input
              v-model="naturalType"
              :options="optionFirst"
              label="Classification"
              color="green"
              @filter="filterFn"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Field is required']"
            >
              <template v-if="naturalType" v-slot:append>
                <q-icon
                  name="clear"
                  @click.stop="clearClassField()"
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

          <div
            v-if="
              (selectedCategory == 'Natural' && naturalType == 'Biological') ||
                naturalType == 'Geological' ||
                naturalType == 'Paleontological' ||
                naturalType == 'Environmental'
            "
            class="col"
            :class="showInputIfOther ? 'row col-auto' : 'col'"
          >
            <q-select
              outlined
              dense
              use-input
              v-model="type"
              :options="optionSecond"
              label="Types"
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
          <div class="col" :hidden="!showInputOtherNatural">
            <q-input
              dense
              v-model="naturalOtherType"
              placeholder="Please specify the other type"
              label="Type: Other"
              color="green"
              stack-label
              hide-bottom-space
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Field is required']"
            />
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
          v-if="selectedCategory == 'Natural'"
          class="q-gutter-sm q-pt-sm"
          :class="this.$q.screen.lt.md ? '' : 'row'"
        >
          <div class="col">
            <q-input
              outlined
              dense
              v-model="scientificName"
              label="Scientific Name (if applicable)"
              color="green"
              hide-bottom-space
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="commonName"
              label="Other Common Name (if applicable)"
              color="green"
              hide-bottom-space
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
              use-input
              v-model="location"
              :options="locationOption"
              @filter="filterFn"
              label="Place Found"
              color="green"
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
              hide-bottom-space
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
              hide-bottom-space
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="date"
              mask="date"
              :label="dateLabelControl"
              hint="Format: YYYY/MM/DD"
              color="green"
              hide-hint
              hide-bottom-space
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDate"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="date"
                      @input="() => $refs.qDate.hide()"
                      color="green"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div
            v-if="selectedCategory != 'Art' && selectedCategory != 'Archival'"
            class="col-1"
          >
            <q-input
              dense
              v-model="estimatedAge"
              mask="########################"
              label="Age"
              color="green"
              hide-hint
              hint="Estimated Age"
              hide-bottom-space
            />
          </div>
        </div>
        <div
          v-if="selectedCategory == 'Archival'"
          class="q-gutter-sm q-pt-sm"
          :class="this.$q.screen.lt.md ? '' : 'row'"
        >
          <div class="col">
            <q-input
              outlined
              dense
              v-model="volumeSize"
              label="Volume / Size of Record"
              color="green"
              hide-bottom-space
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="arrangement"
              label="Arrangement"
              color="green"
              hide-bottom-space
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="officeOrigin"
              label="Office of Origin / Creator"
              color="green"
              hide-bottom-space
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="contactPerson"
              label="Contact Person"
              color="green"
              hide-bottom-space
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
              v-model="nameOfOwner"
              :label="inputLabelNameControl"
              hide-bottom-space
              color="green"
            />
          </div>
          <div v-if="selectedCategory == 'Natural'" class="col">
            <q-input
              outlined
              dense
              v-model="addressOfOwner"
              label="Address of Owner / Collector"
              color="green"
              hide-bottom-space
            />
          </div>
          <div v-if="selectedCategory != 'Art'" class="col">
            <q-input
              outlined
              dense
              v-model="typeOfAquisition"
              label="Type of Aquisition"
              color="green"
              hide-bottom-space
            />
          </div>
          <div v-if="selectedCategory == 'Art'" class="col">
            <q-input
              outlined
              dense
              v-model="nationalityOfArtist"
              label="Nationality of Artist"
              color="green"
              hide-bottom-space
            />
          </div>
          <div v-if="selectedCategory == 'Art'" class="col">
            <q-input
              outlined
              dense
              v-model="ownerCollector"
              label="Owner / Collector / Origin"
              color="green"
              hide-bottom-space
            />
          </div>
        </div>
        <div
          v-if="selectedCategory == 'Art'"
          class="q-gutter-sm q-pt-sm"
          :class="this.$q.screen.lt.md ? '' : 'row'"
        >
          <div class="col">
            <q-input
              outlined
              dense
              v-model="prevOwner"
              label="Previous Owner"
              color="green"
              hide-bottom-space
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="currentOwner"
              label="Current Owner"
              color="green"
              hide-bottom-space
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="address"
              label="Address"
              color="green"
              hide-bottom-space
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
              hide-bottom-space
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="reference"
              label="Reference"
              color="green"
              hide-bottom-space
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
              hide-bottom-space
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
              hide-bottom-space
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
  name: "archae-info",

  data() {
    return {
      name: "", // s
      type: "", // s
      otherType: "", // s
      location: "", // s
      locationOption: locationOption, // s
      latitude: "", // s
      longitude: "", // s
      date: "", // s
      estimatedAge: "", // e art, archival
      nameOfOwner: "", // all
      typeOfAquisition: "", // e art
      files: "", // s
      keyInformants: "", // s
      reference: "", // s
      mapperName: "", // s
      dateProfiled: "", // s
      //
      religion: "", // religious
      nationalityOfArtist: "", // art
      ownerCollector: "", // art
      prevOwner: "", // art
      currentOwner: "", // art
      address: "", // art

      volumeSize: "", // archival
      arrangement: "", // archival
      officeOrigin: "", // archival
      contactPerson: "", // archival

      naturalType: "", // natural
      naturalOtherType: "",
      addressOfOwner: "", // natural
      scientificName: "", // natural
      commonName: "", // natural
      //
      selectedCategory: "",
      selectedFile: "",
      photoURL: null,
      url: null,
      hid: "",

      optionFirst: [],
      optionSecond: [],
      showInputIfOther: false,
      showInputOtherNatural: false,
      loading: false,
    };
  },

  created() {
    this.hid = this.$route.params.heritage_id;
    if (this.hid != undefined) {
      this.getData();
    }
    this.selectedCategory = this.$store.state.services.selectedCategory;
    this.extractBarangays();
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

    if (this.naturalType == "Other") {
      this.showInputOtherNatural = true;
      this.$store.state.services.naturalType = this.$store.state.services.naturalOtherType;
    } else {
      this.showInputOtherNatural = false;
      this.naturalOtherType = "";
    }
  },

  computed: {
    setInputs() {
      this.$store.state.services.name = this.name;
      this.$store.state.services.type = this.type;
      this.$store.state.services.keyInformants = this.keyInformants;
      this.$store.state.services.reference = this.reference;
      this.$store.state.services.mapperName = this.mapperName;
      this.$store.state.services.dateProfiled = this.dateProfiled;
      this.$store.state.services.location = this.location;
      this.$store.state.services.latitude = this.latitude;
      this.$store.state.services.longitude = this.longitude;
      this.$store.state.services.date = this.date;
      this.$store.state.services.nameOfOwner = this.nameOfOwner;
      // this.$store.state.services.files = this.files;
      this.$store.state.services.otherType = this.otherType;
      this.$store.state.services.estimatedAge = this.estimatedAge;
      this.$store.state.services.typeOfAquisition = this.typeOfAquisition;
      this.$store.state.services.religion = this.religion;
      this.$store.state.services.nationalityOfArtist = this.nationalityOfArtist;
      this.$store.state.services.ownerCollector = this.ownerCollector;
      this.$store.state.services.prevOwner = this.prevOwner;
      this.$store.state.services.currentOwner = this.currentOwner;
      this.$store.state.services.address = this.address;
      this.$store.state.services.volumeSize = this.volumeSize;
      this.$store.state.services.arrangement = this.arrangement;
      this.$store.state.services.officeOrigin = this.officeOrigin;
      this.$store.state.services.contactPerson = this.contactPerson;
      this.$store.state.services.naturalType = this.naturalType;
      this.$store.state.services.naturalOtherType = this.naturalOtherType;
      this.$store.state.services.addressOfOwner = this.addressOfOwner;
      this.$store.state.services.scientificName = this.scientificName;
      this.$store.state.services.commonName = this.commonName;
    },

    dateLabelControl() {
      if (this.selectedCategory == "Archae") {
        return "Date Found";
      } else if (
        this.selectedCategory == "Ethno" ||
        this.selectedCategory == "Religious" ||
        this.selectedCategory == "Works" ||
        this.selectedCategory == "Other"
      ) {
        return "Date Produced";
      } else if (this.selectedCategory == "Art") {
        return "Date Created";
      } else if (this.selectedCategory == "Archival") {
        return "Date of Record";
      } else if (this.selectedCategory == "Natural") {
        return "Date Collected";
      } else {
        return "Date Found";
      }
    },

    inputLabelNameControl() {
      if (this.selectedCategory == "Art") {
        return "Artist";
      } else if (this.selectedCategory == "Natural") {
        return "Name of Owner / Collector";
      } else {
        return "Name of Owner";
      }
    },

    inputLabelTypeControl() {
      if (this.selectedCategory == "Art") {
        return "Nationality of Artist";
      } else {
        return "Type of Aquisition";
      }
    },
  },

  methods: {
    getData() {
      this.name = this.$store.state.services.name;
      this.type = this.$store.state.services.type;
      this.location = this.$store.state.services.location;
      this.latitude = this.$store.state.services.latitude;
      this.longitude = this.$store.state.services.longitude;
      this.date = this.$store.state.services.date;
      this.estimatedAge = this.$store.state.services.estimatedAge;
      this.nameOfOwner = this.$store.state.services.nameOfOwner;
      this.typeOfAquisition = this.$store.state.services.typeOfAquisition;
      this.files = this.$store.state.services.files;
      this.photoURL = this.$store.state.services.photoURL;
      //
      this.religion = this.$store.state.services.religion;
      this.nationalityOfArtist = this.$store.state.services.nationalityOfArtist;
      this.ownerCollector = this.$store.state.services.ownerCollector;
      this.prevOwner = this.$store.state.services.prevOwner;
      this.currentOwner = this.$store.state.services.currentOwner;
      this.address = this.$store.state.services.address;
      this.volumeSize = this.$store.state.services.volumeSize;
      this.arrangement = this.$store.state.services.arrangement;
      this.officeOrigin = this.$store.state.services.officeOrigin;
      this.contactPerson = this.$store.state.services.contactPerson;
      this.naturalType = this.$store.state.services.naturalType;
      this.naturalOtherType = this.$store.state.services.naturalOtherType;
      this.addressOfOwner = this.$store.state.services.addressOfOwner;
      this.scientificName = this.$store.state.services.scientificName;
      this.commonName = this.$store.state.services.commonName;

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

    clearClassField() {
      this.type = "";
      this.naturalType = "";
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
      this.optionSecond = [];
      var selectedCategory = this.$store.state.services.selectedCategory;
      if (this.hid != undefined) {
        selectedCategory = this.selectedCategory;
      }

      const archaeOption = this.$store.state.services.archaeOption;
      const ethnoOption = this.$store.state.services.ethnoOption;
      const religiousOption = this.$store.state.services.religiousOption;
      const worksOption = this.$store.state.services.worksOption;
      const artworkOption = this.$store.state.services.artworkOption;
      const archivalOption = this.$store.state.services.archivalOption;
      const naturalClassOption = this.$store.state.services.naturalClassOption;
      const naturalBioOption = this.$store.state.services.naturalBioOption;
      const naturalGeoOption = this.$store.state.services.naturalGeoOption;
      const naturalPaleonOption = this.$store.state.services
        .naturalPaleonOption;
      const naturalEnvironmentalOption = this.$store.state.services
        .naturalEnvironmentalOption;

      if (val === "") {
        update(() => {
          this.extractBarangays();
          this.locationOption = locationOption;
          if (selectedCategory == "Archae") {
            this.optionFirst = archaeOption;
          } else if (selectedCategory == "Ethno") {
            this.optionFirst = ethnoOption;
          } else if (selectedCategory == "Religious") {
            this.optionFirst = religiousOption;
          } else if (selectedCategory == "Works") {
            this.optionFirst = worksOption;
          } else if (selectedCategory == "Art") {
            this.optionFirst = artworkOption;
          } else if (selectedCategory == "Archival") {
            this.optionFirst = archivalOption;
          } else if (selectedCategory == "Natural") {
            this.optionFirst = naturalClassOption;
          }

          if (this.naturalType == "Biological") {
            this.optionSecond = naturalBioOption;
          } else if (this.naturalType == "Geological") {
            this.optionSecond = naturalGeoOption;
          } else if (this.naturalType == "Paleontological") {
            this.optionSecond = naturalPaleonOption;
          } else {
            this.optionSecond = naturalEnvironmentalOption;
          }
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.locationOption = locationOption.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
        if (selectedCategory == "Archae") {
          this.optionFirst = archaeOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Ethno") {
          this.optionFirst = ethnoOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Religious") {
          this.optionFirst = religiousOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Works") {
          this.optionFirst = worksOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Art") {
          this.optionFirst = artworkOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Archival") {
          this.optionFirst = archivalOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (selectedCategory == "Natural") {
          this.optionFirst = naturalClassOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }

        if (this.naturalType == "Biological") {
          this.optionSecond = naturalBioOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (this.naturalType == "Geological") {
          this.optionSecond = naturalGeoOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else if (this.naturalType == "Paleontological") {
          this.optionSecond = naturalPaleonOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        } else {
          this.optionSecond = naturalEnvironmentalOption.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
  },
};
</script>
