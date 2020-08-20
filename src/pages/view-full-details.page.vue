<template>
  <q-page class="q-pt-md">
    <title>View Full Details | Lanao Map</title>

    <div>
      <q-card
        class="shadow-24 my-card q-mb-lg bg-green text-white relative-position"
        :class="this.$q.platform.is.mobile ? 'q-mx-sm' : 'q-mx-xl'"
        :style="loading ? 'height: 570px;' : ''"
      >
        <q-linear-progress
          :indeterminate="loading"
          :hidden="!loading"
          color="white"
        />
        <q-card-section class="q-pa-none" v-show="showInnerText">
          <transition-group
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-card-actions
              key="editbutton"
              vertical
              :align="this.$q.platform.is.mobile ? 'center' : 'right'"
            >
              <q-btn
                v-if="position == 'Mapper'"
                dense
                color="white"
                text-color="black"
                label="Edit Heritage"
                icon="edit"
                @click="editHeritage"
              />
            </q-card-actions>

            <q-card-section
              key="titleSection"
              class="text-center  q-pa-none"
              :class="$q.platform.is.mobile ? 'text-h5' : 'text-h3'"
            >
              Tangible {{ heritageType }} Heritage
              <p class="text-h6 text-weight-light">
                Category: {{ categories }}
              </p>
            </q-card-section>

            <div key="textarea" class="row justify-between">
              <q-card-section class="col-6 q-gutter-y-xs">
                <p :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'">
                  Background Information
                </p>
                <div
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  <div class="text-weight-regular">
                    Type:
                    <small class="text-weight-light">{{ type }}</small>
                  </div>
                  <div class="text-weight-regular">
                    Ownership:
                    <small class="text-weight-light">{{ ownership }}</small>
                  </div>
                  <div class="text-weight-regular">
                    Municipality:
                    <small class="text-weight-light">{{
                      mapperLocation
                    }}</small>
                  </div>
                  <div class="text-weight-regular">
                    Baranggay Location:
                    <small class="text-weight-light">{{ location }}</small>
                  </div>
                  <div class="text-weight-regular">
                    Latitude:
                    <small class="text-weight-light">{{ latitude }}</small>
                  </div>
                  <div class="text-weight-regular">
                    Longitude:
                    <small class="text-weight-light">{{ longitude }}</small>
                  </div>
                  <div class="text-weight-regular">
                    Total Land Area:
                    <small class="text-weight-light">{{ totalArea }}</small>
                  </div>
                  <div class="text-weight-regular">
                    Structure:
                    <small class="text-weight-light">{{ structure }}</small>
                  </div>
                  <div class="text-weight-regular">
                    Year Constructed:
                    <small class="text-weight-light">{{ date }}</small>
                  </div>
                  <div class="text-weight-regular">
                    Ownership/Jurisdiction:
                    <small class="text-weight-light">{{
                      ownershipJurisdiction
                    }}</small>
                  </div>
                  <div class="text-weight-regular">
                    Declaration/Legislation:
                    <small class="ext-weight-light">{{
                      declarationLegislation
                    }}</small>
                  </div>
                  <div class=" text-weight-regular">
                    Example:
                    <small class="text-weight-light">Example</small>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div
                  class="q-pb-sm text-center 
                            text-uppercase 
                            text-weight-light"
                  :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'"
                >
                  {{ name }}
                </div>
                <q-img
                  v-if="photoURL != ''"
                  class="shadow-up-5"
                  :src="photoURL"
                  :style="
                    $q.platform.is.mobile
                      ? ''
                      : 'height: 400px; width: 550px; max-width: 100%'
                  "
                />
                <img
                  v-else
                  src="../assets/no-image.png"
                  :style="
                    $q.platform.is.mobile
                      ? ''
                      : 'height: 400px; width: 550px; max-width: 100%'
                  "
                />
                <div
                  class="q-ma-none row justify-between text-caption text-uppercase"
                >
                  <small>
                    Uploaded By:
                    <u> {{ uploadedBy }}</u>
                  </small>
                  <small> Uploaded Date: {{ timestamp }} </small>
                </div>
              </q-card-section>
              <q-card-section class="shadow-5 q-mx-md bg-white text-black">
                <p :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'">
                  Description
                </p>
                <p
                  class="text-weight-light text-justify"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  amet
                </p>
              </q-card-section>
              <q-card-section>
                <p :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'">
                  Stories
                </p>
                <p
                  class="text-weight-light text-justify"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  amet
                </p>
              </q-card-section>
              <q-card-section class="shadow-5 q-mx-md bg-white text-black">
                <p :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'">
                  Significance
                </p>
                <p
                  class="text-weight-light text-justify"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  amet
                </p>
              </q-card-section>
              <q-card-section>
                <p :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'">
                  Status/Condition of Structure
                </p>
                <div
                  class="text-weight-regular"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Status:
                  <small
                    class="text-weight-light"
                    :class="
                      $q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'
                    "
                    >Status</small
                  >
                </div>
                <div
                  class="text-weight-regular"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Remarks:
                  <small
                    class="text-weight-light"
                    :class="
                      $q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'
                    "
                    >Remarks</small
                  >
                </div>
                <p
                  class="text-weight-light text-justify"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit
                </p>
              </q-card-section>
              <q-card-section class="shadow-5 q-mx-md bg-white text-black">
                <p :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'">
                  Integrity of the Structure
                </p>
                <div
                  class="text-weight-regular"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Integrity:
                  <small
                    class="text-weight-light"
                    :class="
                      $q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'
                    "
                    >Integrity</small
                  >
                </div>
                <div
                  class="text-weight-regular"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Remarks:
                  <small
                    class="text-weight-light"
                    :class="
                      $q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'
                    "
                    >Remarks</small
                  >
                </div>
                <p
                  class="text-weight-light text-justify"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit
                </p>
              </q-card-section>
              <q-card-section>
                <p :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'">
                  Constraint / Threat / Issues
                </p>
                <p
                  class="text-weight-light text-justify"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  amet
                </p>
              </q-card-section>
              <q-card-section
                class="shadow-5 q-mx-md q-mb-lg bg-white text-black"
              >
                <p :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'">
                  Conservation Measures
                </p>
                <p
                  class="text-weight-light text-justify"
                  :class="$q.platform.is.mobile ? 'text-subtitle1' : 'text-h6'"
                >
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  amet
                </p>
              </q-card-section>
            </div>
          </transition-group>
        </q-card-section>
        <q-spinner
          class="absolute-center"
          v-show="loading"
          color="white"
          size="3em"
        />
      </q-card>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[6, 18]"
    >
      <q-btn dense icon="keyboard_arrow_up" color="blue" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../Firestore/firebaseInit";

export default {
  name: "view-full-detils",

  data() {
    return {
      heritage_id: "",
      heritageType: "",
      name: "",
      categories: "",
      //
      name: "",
      type: "",
      otherType: "",
      ownership: "",
      location: "",
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
      mapperLocation: "",
      uploadedBy: "",
      timestamp: "",
      photoURL: "",
      position: "",

      loading: true,
      showInnerText: false,
    };
  },

  created() {
    this.viewCulturalHeritageDetails = true;
    this.heritage_id = this.$route.params.heritage_id;
    this.getHeritageType();
    this.getPosition();
  },

  computed: {
    viewCulturalHeritageDetails: {
      get() {
        return this.$store.state.siteNav.viewCulturalHeritageDetails;
      },

      set(val) {
        this.$store.dispatch("siteNav/viewCulturalHeritageDetails", val);
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
  },

  methods: {
    getPosition() {
      var user = firebase.auth().currentUser;
      db.collection("profiles")
        .doc(user.uid)
        .get()
        .then((doc) => {
          this.position = doc.data().position;
        });
    },

    getHeritageType() {
      this.loading = true;
      this.showInnerText = false;
      db.collection("heritages")
        .doc(this.heritage_id)
        .get()
        .then((doc) => {
          this.heritageType = doc.data().heritageType;
          this.categories = doc.data().categories;
          this.name = doc.data().name;
          this.type = doc.data().type;
          this.ownership = doc.data().ownership;
          this.location = doc.data().baranggayLocation;
          this.latitude = doc.data().lat;
          this.longitude = doc.data().lng;
          this.totalArea = doc.data().totalArea;
          this.structure = doc.data().structure;
          this.date = doc.data().dateFoundProduce;
          this.ownershipJurisdiction = doc.data().ownershipJurisdiction;
          this.declarationLegislation = doc.data().declarationLegislation;
          this.keyInformants = doc.data().keyInformants;
          this.reference = doc.data().reference;
          this.mapperName = doc.data().mapperName;
          this.dateProfiled = doc.data().dateProfiled;
          this.mapperLocation = doc.data().mapperLocation;
          this.uploadedBy = doc.data().uploadedBy;
          this.timestamp = doc.data().timestamp;
          this.photoURL = doc.data().photoURL;

          this.loading = false;
          this.showInnerText = true;
        });
    },

    editHeritage() {
      this.viewCulturalHeritageDetails = false;
      this.manageHeritages = false;

      this.$router.push(
        `/mh/vd/edit-heritage/${this.heritageType}/${this.heritage_id}`
      );
    },
  },
};
</script>
