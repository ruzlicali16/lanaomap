<template>
  <div :class="selectedValue2 != '' ? 'q-pt-md' : ''">
    <div
      class="text-center"
      :class="this.$q.platform.is.mobile ? 'text-h5' : 'text-h4'"
    >
      <div v-if="selectedValue2 != '' && selectedValue2 != ''">
        Mapping of Significant Tangible {{ selectedValue2 }} Heritage
        <p
          class="text-h6 text-weight-light"
          :class="this.$q.platform.is.mobile ? 'q-px-md' : ''"
        >
          Category: {{ selectedValue }}
        </p>
      </div>
      <div v-else>
        <div v-show="!loading">
          Mapping of Significant Tangible {{ heritageType }} Heritage
          <p
            class="text-h6 text-weight-light"
            :class="this.$q.platform.is.mobile ? 'q-px-md' : ''"
          >
            Category: {{ categories }}
          </p>
        </div>
        <q-card
          v-show="loading"
          class="q-ml-auto q-mr-auto no-shadow"
          :style="loading ? 'width: 30em' : ''"
        >
          <q-card-section>
            <q-skeleton type="rect" />
            <q-skeleton type="text" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-stepper
      class="no-shadow"
      keep-alive
      v-model="step"
      :header-nav="error ? false : true"
      ref="stepper"
      color="primary"
      animated
      @transition="scrollToTop"
    >
      <q-step
        v-for="stepper in steppers"
        :key="stepper.currentStep"
        :name="stepper.currentStep"
        :title="stepper.title"
        :icon="stepper.icon"
        :error="stepper.error"
        :caption="stepper.error ? '*Fill all required fields' : stepper.caption"
        :done="step > stepper.currentStep"
      >
        <AddImmovableHeritageInfo
          v-if="
            (step === 1 && selectedValue2 == 'Immovable') ||
              (step === 1 && heritage_type == 'Immovable')
          "
          :hid="hid"
        />
        <AddMovableHeritageInfo
          v-if="
            (step === 1 && selectedValue2 == 'Movable') ||
              (step === 1 && heritage_type == 'Movable')
          "
          :hid="hid"
        />

        <AddDescription v-else-if="step === 2" :hid="hid" />
        <AddConservation v-else-if="step === 3" :hid="hid" />
      </q-step>
    </q-stepper>

    <div v-show="!loading" class="float-right q-px-lg q-pb-lg">
      <q-btn
        v-if="step == 3"
        @click="submit()"
        color="primary"
        :label="hid == '' ? 'Submit' : 'Save'"
      />
      <q-btn
        v-if="step <= 2"
        @click="$refs.stepper.next()"
        color="primary"
        label="Continue"
      />
      <q-btn
        v-if="step > 1"
        flat
        color="primary"
        @click="$refs.stepper.previous()"
        label="Back"
        class="q-ml-sm"
      />
    </div>

    <ReviewFormDialog :hid="hid" />
  </div>
</template>

<script>
import AddImmovableHeritageInfo from "./immovable-form/immovable-heritage-info.form";
import AddMovableHeritageInfo from "./movable-form/movable-heritage-info.form";
import AddDescription from "./description-heritage.form";
import AddConservation from "./conservation-heritage.form";
import ReviewFormDialog from "../Dialog/review-form.dialog";

import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";

export default {
  name: "Stepper",

  props: ["selectedValue", "selectedValue2"],

  components: {
    AddImmovableHeritageInfo,
    AddDescription,
    AddConservation,
    AddMovableHeritageInfo,
    ReviewFormDialog,
  },

  data() {
    return {
      // step 1
      name: "",
      type: "",
      otherType: "",
      ownership: "",
      location: "",
      latitude: "",
      longitude: "",
      longitude: "",
      totalArea: "",
      structure: "",
      date: "",
      ownershipJuri: "",
      declaration: "",
      keyInformants: "",
      reference: "",
      mapperName: "",
      dateProfiled: "",
      // step 2
      physicalDescription: "",
      historyStructure: "",
      stories: "",
      significance: "",
      // step 3
      status: "",
      statusDes: "",
      integrity: "",
      integrityRemarks: "",
      constraints: "",
      conservation: "",

      estimatedAge: "",
      nameOfOwner: "",
      typeOfAquisition: "",

      religion: "",
      nationalityOfArtist: "",
      ownerCollector: "",
      prevOwner: "",
      currentOwner: "",
      address: "",

      volumeSize: "",
      arrangement: "",
      officeOrigin: "",
      contactPerson: "",

      naturalType: "",
      addressOfOwner: "",
      scientificName: "",
      commonName: "",

      description: "",
      primaryCriteria: "",
      comparativeCriteria: "",
      mediumMaterial: "",
      height: "",
      width: "",
      length: "",
      diameter: "",
      edition: "",
      subject: "",
      provenance: "",
      descMaterial: "",
      descRemarks: "",
      rawMaterial: "",
      sizeDimension: "",
      surface: "",
      storage: "",
      original: "",

      physicalConditionType: "",
      physicalConditionOtherType: "",

      step: 1,
      steppers: [
        {
          currentStep: 1,
          title: "Information & References",
          caption: "Step 1",
          icon: "info",
          error: false,
        },
        {
          currentStep: 2,
          title: "Description, Stories & Significance",
          caption: "Step 2",
          icon: "description",
          error: false,
        },
        {
          currentStep: 3,
          title: "Conservation",
          caption: "Step 3",
          icon: "help",
          error: false,
        },
      ],

      hid: "",
      heritage_type: "",
      categories: "",
      heritageType: "",
      loading: false, // default should true
      error: false,
    };
  },

  created() {
    this.hid = this.$route.params.heritage_id;
    this.heritage_type = this.$route.params.heritage_type;

    if (this.hid != undefined) {
      this.loading = true;
      db.collection("heritages")
        .doc(this.hid)
        .get()
        .then((doc) => {
          this.categories = doc.data().categories;
          this.heritageType = doc.data().heritageType;
          this.loading = false;
        });
    }
  },

  computed: {
    reviewFormDialog: {
      get() {
        return this.$store.state.siteNav.reviewFormDialog;
      },
      set(val) {
        this.$store.dispatch("siteNav/reviewFormDialog", val);
      },
    },
  },

  methods: {
    setInputsFromStore() {
      this.name = this.$store.state.services.name;
      this.type = this.$store.state.services.type;
      this.ownership = this.$store.state.services.ownership;
      this.location = this.$store.state.services.location;
      this.latitude = this.$store.state.services.latitude;
      this.longitude = this.$store.state.services.longitude;
      this.totalArea = this.$store.state.services.totalArea;
      this.structure = this.$store.state.services.structure;
      this.date = this.$store.state.services.date;
      this.ownershipJuri = this.$store.state.services.ownershipJurisdiction;
      this.declaration = this.$store.state.services.declarationLegislation;
      this.keyInformants = this.$store.state.services.keyInformants;
      this.reference = this.$store.state.services.reference;
      this.mapperName = this.$store.state.services.mapperName;
      this.dateProfiled = this.$store.state.services.dateProfiled;
      // step 2
      this.physicalDescription = this.$store.state.services.physicalDescription;
      this.historyStructure = this.$store.state.services.historyStructure;
      this.stories = this.$store.state.services.stories;
      this.significance = this.$store.state.services.significance;
      //step 3
      this.status = this.$store.state.services.status;
      this.statusDes = this.$store.state.services.statusDes;
      this.statusRemarks = this.$store.state.services.statusRemarks;
      this.integrity = this.$store.state.services.integrity;
      this.integrityRemarks = this.$store.state.services.integrityRemarks;
      this.constraints = this.$store.state.services.constraints;
      this.conservation = this.$store.state.services.conservation;

      this.estimatedAge = this.$store.state.services.estimatedAge;
      this.nameOfOwner = this.$store.state.services.nameOfOwner;
      this.typeOfAquisition = this.$store.state.services.typeOfAquisition;

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

      this.description = this.$store.state.services.description;
      this.primaryCriteria = this.$store.state.services.primaryCriteria;
      this.comparativeCriteria = this.$store.state.services.comparativeCriteria;
      this.mediumMaterial = this.$store.state.services.mediumMaterial;
      this.height = this.$store.state.services.height;
      this.width = this.$store.state.services.width;
      this.length = this.$store.state.services.length;
      this.diameter = this.$store.state.services.diameter;
      this.edition = this.$store.state.services.edition;
      this.subject = this.$store.state.services.subject;
      this.provenance = this.$store.state.services.provenance;
      this.descMaterial = this.$store.state.services.descMaterial;
      this.descRemarks = this.$store.state.services.descRemarks;
      this.rawMaterial = this.$store.state.services.rawMaterial;
      this.sizeDimension = this.$store.state.services.sizeDimension;
      this.surface = this.$store.state.services.surface;
      this.storage = this.$store.state.services.storage;
      this.original = this.$store.state.services.original;

      this.physicalConditionType = this.$store.state.services.physicalConditionType;
      this.physicalConditionOtherType = this.$store.state.services.physicalConditionOtherType;
    },

    submit() {
      this.setInputsFromStore();
      this.reviewFormDialog = true;
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
