<template>
  <q-page>
    <title v-if="selectedValue != ''">Add Heritages | Lanao Map</title>
    <title v-else>Edit Heritages | Lanao Map</title>
    <q-linear-progress
      v-show="loading"
      :indeterminate="loading"
      color="green"
    />
    <q-breadcrumbs
      v-if="manageHeritage"
      :class="
        this.$q.screen.lt.md
          ? 'q-pt-xl q-pl-sm text-caption'
          : 'q-pl-md q-py-md'
      "
      active-color="green"
    >
      <q-breadcrumbs-el icon="home" to="/" />
      <q-breadcrumbs-el
        label="Manage Heritages"
        icon="dashboard"
        to="/manage-heritages"
      />
      <q-breadcrumbs-el label="Add Heritage" icon="edit" />
    </q-breadcrumbs>
    <q-breadcrumbs
      v-if="editHeritages"
      :class="
        this.$q.screen.lt.md
          ? 'q-py-sm q-px-xs text-caption'
          : 'q-pl-md q-py-md'
      "
      active-color="green"
    >
      <q-breadcrumbs-el icon="home" to="/" />
      <q-breadcrumbs-el
        label="Manage Heritages"
        icon="dashboard"
        to="/manage-heritages"
      />
      <q-breadcrumbs-el
        label="View Details"
        icon="details"
        :to="`/mh/view-details/${hid}`"
      />
      <q-breadcrumbs-el label="Edit Heritage" icon="edit" />
    </q-breadcrumbs>
    <Stepper v-if="!loading" />
    <q-spinner
      v-show="loading"
      color="green"
      size="3em"
      class="absolute-center"
    />
  </q-page>
</template>

<script>

import { db, auth } from "../../Firestore/firebaseInit";
const Stepper = () => import("../../components/Form/stepper-form");

export default {
  name: "AddHeritage",

  components: {
    Stepper,
  },

  data() {
    return {
      selectedValue: this.$store.state.services.selectedValue, // selectedCatID
      hid: "",
      manageHeritage: "",
      loading: false,
    };
  },

  created() {
    this.hid = this.$route.params.heritage_id;
    if (this.hid == undefined) {
      if (this.selectedValue == "") {
        this.addCulturalHeritage = true;
        this.$router.push("/");
      } else {
        this.addHeritage = true;
      }
    } else {
      this.editHeritages = true;
      this.getDataById();
    }
  },

  computed: {
    editHeritages: {
      get() {
        return this.$store.state.siteNav.editHeritages;
      },

      set(val) {
        this.$store.dispatch("siteNav/editHeritages", val);
      },
    },

    addHeritage: {
      get() {
        return this.$store.state.siteNav.manageHeritages;
      },

      set(val) {
        this.$store.dispatch("siteNav/manageHeritages", val);
      },
    },

    addCulturalHeritage: {
      get() {
        return this.$store.state.siteNav.addCulturalHeritage;
      },
      set(val) {
        this.$store.dispatch("siteNav/addCulturalHeritage", val);
      },
    },
  },

  methods: {
    getDataById() {
      this.loading = true;
      db.collection("heritages")
        .doc(this.hid)
        .get()
        .then((doc) => {
          this.$store.state.services.ownership = doc.data().ownership;
          this.$store.state.services.totalArea = doc.data().totalArea;
          this.$store.state.services.structure = doc.data().structure;
          this.$store.state.services.ownershipJurisdiction = doc.data().ownershipJurisdiction;
          this.$store.state.services.declarationLegislation = doc.data().declarationLegislation;

          this.$store.state.services.name = doc.data().name;
          this.$store.state.services.type = doc.data().type;
          this.$store.state.services.location = doc.data().baranggayLocation;
          this.$store.state.services.latitude = doc.data().lat;
          this.$store.state.services.longitude = doc.data().lng;
          this.$store.state.services.date = doc.data().dateFoundProduce;
          this.$store.state.services.nameOfOwner = doc.data().nameOfOwner;
          this.$store.state.services.typeOfAquisition = doc.data().typeOfAquisition;
          this.$store.state.services.estimatedAge = doc.data().estimatedAge;

          this.$store.state.services.religion = doc.data().religion;

          this.$store.state.services.nationalityOfArtist = doc.data().nationalityOfArtist;
          this.$store.state.services.ownerCollector = doc.data().ownerCollector;
          this.$store.state.services.prevOwner = doc.data().prevOwner;
          this.$store.state.services.currentOwner = doc.data().currentOwner;
          this.$store.state.services.address = doc.data().address;

          this.$store.state.services.volumeSize = doc.data().volumeSize;
          this.$store.state.services.arrangement = doc.data().arrangement;
          this.$store.state.services.officeOrigin = doc.data().officeOrigin;
          this.$store.state.services.contactPerson = doc.data().contactPerson;

          this.$store.state.services.naturalType = doc.data().naturalType;
          this.$store.state.services.naturalOtherType = doc.data().naturalOtherType;
          this.$store.state.services.addressOfOwner = doc.data().addressOfOwner;
          this.$store.state.services.scientificName = doc.data().scientificName;
          this.$store.state.services.commonName = doc.data().commonName;
          this.$store.state.services.photoURL = doc.data().photoURL;

          this.$store.state.services.keyInformants = doc.data().keyInformants;
          this.$store.state.services.reference = doc.data().reference;
          this.$store.state.services.mapperName = doc.data().mapperName;
          this.$store.state.services.dateProfiled = doc.data().dateProfiled;

          this.$store.state.services.physicalDescription = doc.data().physicalDescription;
          this.$store.state.services.historyStructure = doc.data().historyStructure;
          this.$store.state.services.stories = doc.data().stories;
          this.$store.state.services.significance = doc.data().significance;

          this.$store.state.services.description = doc.data().description;
          this.$store.state.services.primaryCriteria = doc.data().primaryCriteria;
          this.$store.state.services.comparativeCriteria = doc.data().comparativeCriteria;

          this.$store.state.services.mediumMaterial = doc.data().mediumMaterial;
          this.$store.state.services.height = doc.data().height;
          this.$store.state.services.width = doc.data().width;
          this.$store.state.services.length = doc.data().length;
          this.$store.state.services.diameter = doc.data().diameter;
          this.$store.state.services.edition = doc.data().edition;
          this.$store.state.services.subject = doc.data().subject;
          this.$store.state.services.provenance = doc.data().provenance;

          this.$store.state.services.descMaterial = doc.data().descMaterial;
          this.$store.state.services.descRemarks = doc.data().descRemarks;

          this.$store.state.services.rawMaterial = doc.data().rawMaterial;
          this.$store.state.services.sizeDimension = doc.data().sizeDimension;
          this.$store.state.services.surface = doc.data().surface;
          this.$store.state.services.storage = doc.data().storage;
          this.$store.state.services.original = doc.data().original;

          this.$store.state.services.selectedCategory = doc.data().selectedCategory;
          this.$store.state.services.selectedValue = doc.data().categories;
          this.$store.state.services.selectedValue2 = doc.data().heritageType;

          this.$store.state.services.status = doc.data().status;
          this.$store.state.services.statusRemarks = doc.data().statusRemarks;
          this.$store.state.services.statusDes = doc.data().statusDes;
          this.$store.state.services.integrity = doc.data().integrity;
          this.$store.state.services.integrityRemarks = doc.data().integrityRemarks;
          this.$store.state.services.constraints = doc.data().constraints;
          this.$store.state.services.conservation = doc.data().conservation;

          this.$store.state.services.physicalConditionType = doc.data().physicalConditionType;
          this.$store.state.services.physicalConditionOtherType = doc.data().physicalConditionOtherType;
          this.$store.state.services.generalCondition = doc.data().generalCondition;
          this.loading = false;
        });
    },
  },

  destroyed() {
    this.editHeritages = false;
    this.$store.state.services.selectedValue2 = "";
    this.$store.state.services.selectedValue = "";
    this.$store.state.services.name = "";
    this.$store.state.services.type = "";
    this.$store.state.services.otherType = "";
    this.$store.state.services.ownership = "";
    this.$store.state.services.location = "";
    this.$store.state.services.latitude = "";
    this.$store.state.services.longitude = "";
    this.$store.state.services.totalArea = "";
    this.$store.state.services.structure = "";
    this.$store.state.services.date = "";
    this.$store.state.services.ownershipJurisdiction = "";
    this.$store.state.services.declarationLegislation = "";
    this.$store.state.services.files = "";
    this.$store.state.services.photoURL = "";
    this.$store.state.services.keyInformants = "";
    this.$store.state.services.reference = "";
    this.$store.state.services.mapperName = "";
    this.$store.state.services.dateProfiled = "";
    this.$store.state.services.physicalDescription = "";
    this.$store.state.services.historyStructure = "";
    this.$store.state.services.stories = "";
    this.$store.state.services.significance = "";

    this.$store.state.services.estimatedAge = "";
    this.$store.state.services.nameOfOwner = "";
    this.$store.state.services.typeOfAquisition = "";
    this.$store.state.services.religion = "";
    this.$store.state.services.nationalityOfArtist = "";
    this.$store.state.services.ownerCollector = "";
    this.$store.state.services.prevOwner = "";
    this.$store.state.services.currentOwner = "";
    this.$store.state.services.address = "";
    this.$store.state.services.volumeSize = "";
    this.$store.state.services.arrangement = "";
    this.$store.state.services.officeOrigin = "";
    this.$store.state.services.contactPerson = "";
    this.$store.state.services.naturalType = "";
    this.$store.state.services.addressOfOwner = "";
    this.$store.state.services.scientificName = "";
    this.$store.state.services.commonName = "";

    this.$store.state.services.description = "";
    this.$store.state.services.primaryCriteria = "";
    this.$store.state.services.comparativeCriteria = "";
    this.$store.state.services.mediumMaterial = "";
    this.$store.state.services.height = "";
    this.$store.state.services.width = "";
    this.$store.state.services.length = "";
    this.$store.state.services.diameter = "";
    this.$store.state.services.edition = "";
    this.$store.state.services.subject = "";
    this.$store.state.services.provenance = "";
    this.$store.state.services.descMaterial = "";
    this.$store.state.services.descRemarks = "";
    this.$store.state.services.rawMaterial = "";
    this.$store.state.services.sizeDimension = "";
    this.$store.state.services.surface = "";
    this.$store.state.services.storage = "";
    this.$store.state.services.original = "";

    this.$store.state.services.status = "";
    this.$store.state.services.immdescription = "";
    this.$store.state.services.statusDes = "";
    this.$store.state.services.statusRemarks = "";
    this.$store.state.services.integrity = "";
    this.$store.state.services.integrityRemarks = "";
    this.$store.state.services.constraints = "";
    this.$store.state.services.conservation = "";

    this.$store.state.services.physicalConditionType = "";
    this.$store.state.services.physicalConditionOtherType = "";
    this.$store.state.services.generalCondition = "";
  },
};
</script>
