<template>
  <q-page>
    <title v-if="selectedValue != ''">Add Heritages | Lanao Map</title>
    <title v-else>Edit Heritages | Lanao Map</title>
    <q-breadcrumbs
      v-if="manageHeritage"
      :class="
        this.$q.platform.is.mobile
          ? 'q-pt-xl q-pl-sm text-caption'
          : 'q-pl-md q-py-md'
      "
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
        this.$q.platform.is.mobile
          ? 'q-py-sm q-px-xs text-caption'
          : 'q-pl-md q-py-md'
      "
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
    <Stepper :selectedValue="selectedValue" :selectedValue2="selectedValue2" />
  </q-page>
</template>

<script>
import Stepper from "../../components/Form/stepper-form";

export default {
  name: "AddHeritage",

  components: {
    Stepper,
  },

  data() {
    return {
      selectedValue: this.$store.state.services.selectedValue, // selectedCatID
      selectedValue2: this.$store.state.services.selectedValue2, // selectedHeritageType
      hid: "",
      manageHeritage: "",
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
      console.log("created ", this.selectedValue2, this.selectedValue);
      this.editHeritages = true;
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

  destroyed() {
    console.log(this.manageHeritage);
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
