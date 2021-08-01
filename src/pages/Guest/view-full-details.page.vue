<template>
  <q-page class="q-pt-md" :key="$route.fullPath">
    <title>View Heritage | Lanao Map</title>
    <div>
      <q-card
        class="shadow-10 my-card q-mb-xl q-mt-lg bg-grey-3 text-grey-9 relative-position"
        :class="this.$q.screen.lt.md ? 'q-mx-sm' : 'q-mx-xl'"
        :style="loading ? 'height: 570px;' : ''"
      >
        <q-linear-progress
          :indeterminate="loading"
          :hidden="!loading"
          color="green"
        />
        <q-card-section class="q-pa-none" v-show="showInnerText">
          <transition-group
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-card-section
              key="titleSection"
              class="text-center  q-pa-none"
              :class="$q.screen.lt.md ? 'text-h5' : 'text-h3'"
            >
              Tangible {{ heritageType }} Heritage
              <p class="text-h6 text-weight-light">
                Category: {{ categories }}
              </p>
            </q-card-section>

            <div key="textarea" class="row justify-between">
              <q-card-section
                v-if="message"
                class="col-12 q-gutter-y-xs bg-red-5 text-white"
              >
                <span class="row no-wrap items-center">
                  <q-icon name="feedback" size="sm" class="q-mr-xs" />
                  <span :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'"
                    >Message:</span
                  ><span
                    class="q-pl-sm text-weight-light"
                    :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'"
                    >{{ message }}</span
                  >
                </span>
              </q-card-section>
              <q-card-section
                :class="
                  $q.screen.lt.md
                    ? 'col-12 q-gutter-y-xs'
                    : 'col-6  q-gutter-y-xs'
                "
              >
                <p :class="$q.screen.lt.md ? 'text-h6' : 'text-h4'">
                  Background Information
                </p>

                <div :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'">
                  <div v-if="type" class="text-weight-light">
                   Type:
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="type"
                      outline
                    />
                  </div>
                  <div v-if="ownership" class="text-weight-light">
                      Ownership:
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="ownership"
                      outline
                    />
                  </div>
                  <div v-if="mapperLocation" class="text-weight-light">
                    Municipality:
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="mapperLocation"
                      outline
                    />
                  </div>
                  <div v-if="location" class="text-weight-light">
                    Baranggay Location:
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="location"
                      outline
                    />
                  </div>
                  <div v-if="latitude" class="text-weight-light">
                    Latitude:
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="latitude"
                      outline
                    />
                  </div>
                  <div v-if="longitude" class="text-weight-light">
                    Longitude:

                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="longitude"
                      outline
                    />
                  </div>
                  <div v-if="totalArea" class="text-weight-light">
                    Total Land Area:

                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="totalArea"
                      outline
                    />
                  </div>
                  <div v-if="structure" class="text-weight-light">
                    Structure:

                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="structure"
                      outline
                    />
                  </div>
                  <div v-if="date" class="text-weight-light">
                    Date/Year Produced:
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="date"
                      outline
                    />
                  </div>
                  <div v-if="ownershipJurisdiction" class="text-weight-light">
                    Ownership/Jurisdiction:
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="ownershipJurisdiction"
                      outline
                    />
                  </div>
                  <div
                    v-if="declarationLegislation"
                    class="text-weight-light"
                  >
                    Declaration/Legislation:
                      <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="declarationLegislation"
                      outline
                    />
                  </div>
                  <div v-if="estimatedAge" class="text-weight-light">
                    Estimated Age:
                     <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="estimatedAge"
                      outline
                    />
                  </div>
                  <div v-if="nameOfOwner" class="text-weight-light">
                    Name of Owner:
                     <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="nameOfOwner"
                      outline
                    />
                  </div>
                  <div v-if="typeOfAquisition" class="text-weight-light">
                    Type of Aquisition:
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="typeOfAquisition"
                      outline
                    />
                  </div>
                  <div v-if="religion" class="text-weight-light">
                    Religion/Denomination:
                      <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="religion"
                      outline
                    />
                  </div>
                  <div v-if="nationalityOfArtist" class="text-weight-light">
                    Nationality of Artist:
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="nationalityOfArtist"
                      outline
                    />
                  </div>
                  <div v-if="ownerCollector" class="text-weight-light">
                    Owner/Collector/Origin:
                     <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="ownerCollector"
                      outline
                    />
                  </div>
                  <div v-if="prevOwner" class="text-weight-light">
                    Previous Owner:
                    <small class="text-weight-light">{{ prevOwner }}</small>
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="prevOwner"
                      outline
                    />
                  </div>
                  <div v-if="currentOwner" class="text-weight-light">
                    Current Owner:
                     <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="currentOwner"
                      outline
                    />
                  </div>
                  <div v-if="address" class="text-weight-light">
                    Address:
                    <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="address"
                      outline
                    />
                  </div>
                  <div v-if="volumeSize" class="text-weight-light">
                    Volume Size:
                     <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="volumeSize"
                      outline
                    />
                  </div>
                  <div v-if="arrangement" class="text-weight-light">
                    Arrangement:
                     <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="arrangement"
                      outline
                    />
                   
                  </div>
                  <div v-if="contactPerson" class="text-weight-light">
                    Contact Person:
                      <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="contactPerson"
                      outline
                    />
                  
                  </div>
                  <div v-if="naturalType" class="text-weight-light">
                    Natural Type:
                        <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="naturalType"
                      outline
                    />
                  </div>
                  <div v-if="addressOfOwner" class="text-weight-light">
                    Address Of Owner:
                      <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="addressOfOwner"
                      outline
                    />
                   
                  </div>
                  <div v-if="scientificName" class="text-weight-light">
                    Scientific Name:
                       <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="scientificName"
                      outline
                    />
                 
                  </div>
                  <div v-if="commonName" class="text-weight-light">
                    Common Name:
                        <q-chip
                      class="green"
                      color="green"
                      text-color="white"
                      :label="commonName"
                      outline
                    />
                  </div>
                </div>
              </q-card-section>
              <q-card-section :class="$q.screen.lt.md ? 'q-pt-none' : ''">
                <div
                  v-if="name"
                  class="q-pb-sm text-center 
                            text-uppercase 
                            text-weight-light"
                  :class="$q.screen.lt.md ? 'text-h6' : 'text-h5'"
                >
                  {{ name }}
                </div>
                <q-img
                  v-if="photoURL"
                  class="shadow-up-5"
                  :src="photoURL"
                  :style="
                    $q.screen.lt.md
                      ? 'height: 300px; width: 330px; max-width: 100%'
                      : 'height: 400px; width: 550px; max-width: 100%'
                  "
                />
                <img
                  v-else
                  src="../../assets/no-image.png"
                  :style="
                    $q.screen.lt.md
                      ? 'height: 300px; width: 330px; max-width: 100%'
                      : 'height: 400px; width: 550px; max-width: 100%'
                  "
                />
                <div
                  v-if="uploadedBy || timestamp"
                  class="q-ma-none row justify-between text-caption text-uppercase"
                >
                  <small>
                    Uploaded By:
                    <u> {{ uploadedBy }}</u>
                  </small>
                  <small> Uploaded Date: {{ timestamp }} </small>
                </div>
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
      <q-card
        v-if="!loading"
        class="shadow-10 my-card q-mb-xl bg-grey-3 text-grey-9 relative-position"
        :class="this.$q.screen.lt.md ? 'q-mx-sm' : 'q-mx-xl'"
        :style="loading ? 'height: 570px;' : ''"
      >
        <q-card-section
          :class="
            $q.screen.lt.md ? 'col-12 q-gutter-y-xs' : 'col-12  q-gutter-y-xs'
          "
        >
          <p :class="$q.screen.lt.md ? 'text-h6' : 'text-h4'">
            Description
          </p>

          <div :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'">
            <div v-if="physicalDescription" class="text-weight-regular">
              Physical Description:
              <small class="text-weight-light">{{ physicalDescription }}</small>
            </div>
            <div v-if="historyStructure" class="text-weight-regular">
              History Structure:
              <small class="text-weight-light">{{ historyStructure }}</small>
            </div>
            <div v-if="stories" class="text-weight-regular">
              Stories:
              <small class="text-weight-light">{{ stories }}</small>
            </div>
            <div v-if="significance" class="text-weight-regular">
              Significance:
              <small class="text-weight-light">{{ significance }}</small>
            </div>
            <div v-if="description" class="text-weight-regular">
              Description:
              <small class="text-weight-light">{{ description }}</small>
            </div>
            <div v-if="primaryCriteria" class="text-weight-regular">
              Primary Criteria:
              <small class="text-weight-light">{{ primaryCriteria }}</small>
            </div>
            <div v-if="comparativeCriteria" class="text-weight-regular">
              Comparative Criteria:
              <small class="text-weight-light">{{ comparativeCriteria }}</small>
            </div>
            <div v-if="mediumMaterial" class="text-weight-regular">
              Medium Material:
              <small class="text-weight-light">{{ mediumMaterial }}</small>
            </div>
            <div v-if="height" class="text-weight-regular">
              Height:
              <small class="text-weight-light">{{ height }}</small>
            </div>
            <div v-if="width" class="text-weight-regular">
              Width:
              <small class="text-weight-light">{{ width }}</small>
            </div>
            <div v-if="length" class="text-weight-regular">
              Length:
              <small class="text-weight-light">{{ length }}</small>
            </div>
            <div v-if="diameter" class="text-weight-regular">
              Diameter:
              <small class="text-weight-light">{{ diameter }}</small>
            </div>
            <div v-if="edition" class="text-weight-regular">
              Edition:
              <small class="text-weight-light">{{ edition }}</small>
            </div>
            <div v-if="subject" class="text-weight-regular">
              Subject:
              <small class="text-weight-light">{{ subject }}</small>
            </div>
            <div v-if="provenance" class="text-weight-regular">
              Provenance:
              <small class="text-weight-light">{{ provenance }}</small>
            </div>
            <div v-if="descMaterial" class="text-weight-regular">
              Description of Material:
              <small class="text-weight-light">{{ descMaterial }}</small>
            </div>
            <div v-if="descRemarks" class="text-weight-regular">
              Description Remarks:
              <small class="text-weight-light">{{ descRemarks }}</small>
            </div>
            <div v-if="rawMaterial" class="text-weight-regular">
              Raw Material:
              <small class="text-weight-light">{{ rawMaterial }}</small>
            </div>
            <div v-if="sizeDimension" class="text-weight-regular">
              Size Dimension:
              <small class="text-weight-light">{{ sizeDimension }}</small>
            </div>
            <div v-if="surface" class="text-weight-regular">
              Surface:
              <small class="text-weight-light">{{ surface }}</small>
            </div>
            <div v-if="storage" class="text-weight-regular">
              Storage:
              <small class="text-weight-light">{{ storage }}</small>
            </div>
            <div v-if="original" class="text-weight-regular">
              Original:
              <small class="text-weight-light">{{ original }}</small>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card
        v-if="!loading"
        class="shadow-10 my-card q-mb-xl bg-grey-3 text-grey-9 relative-position"
        :class="this.$q.screen.lt.md ? 'q-mx-sm' : 'q-mx-xl'"
        :style="loading ? 'height: 570px;' : ''"
      >
        <q-card-section
          :class="
            $q.screen.lt.md ? 'col-12 q-gutter-y-xs' : 'col-12  q-gutter-y-xs'
          "
        >
          <p :class="$q.screen.lt.md ? 'text-h6' : 'text-h4'">
            Conservation
          </p>

          <div :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'">
            <div v-if="status" class="text-weight-regular">
              Status/Condition of structure:
              <small class="text-weight-light">{{ status }}</small>
            </div>
            <div v-if="statusRemarks" class="text-weight-regular">
              Status Remarks:
              <small class="text-weight-light">{{ statusRemarks }}</small>
            </div>
            <div v-if="statusDes" class="text-weight-regular">
              Physical Description:
              <small class="text-weight-light">{{ statusDes }}</small>
            </div>
            <div v-if="integrity" class="text-weight-regular">
              Integrity:
              <small class="text-weight-light">{{ integrity }}</small>
            </div>
            <div v-if="integrityRemarks" class="text-weight-regular">
              Integrity Remarks:
              <small class="text-weight-light">{{ integrityRemarks }}</small>
            </div>
            <div v-if="constraints" class="text-weight-regular">
              Constraints/Threat/Issue:
              <small class="text-weight-light">{{ constraints }}</small>
            </div>
            <div v-if="conservation" class="text-weight-regular">
              Conservation Measures:
              <small class="text-weight-light">{{ conservation }}</small>
            </div>
            <div v-if="physicalConditionType" class="text-weight-regular">
              Physical Condition:
              <small class="text-weight-light">{{
                physicalConditionType
              }}</small>
            </div>
            <div v-if="generalCondition" class="text-weight-regular">
              General Condition:
              <small class="text-weight-light">{{ generalCondition }}</small>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[6, 18]"
    >
      <q-btn dense icon="keyboard_arrow_up" color="black" text-color="white" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import { db, auth } from "../../Firestore/firebaseInit";

export default {
  name: "view-full-detils",

  data() {
    return {
      heritage_id: "",
      heritageType: "",
      name: "",
      categories: "",
      mapperLocation: "",
      uploadedBy: "",
      timestamp: "",
      photoURL: "",
      position: "",
      verified: "",
      changes: "",
      message: "",
      // Immovable
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
      //Movable
      estimatedAge: "", // e art, archival
      nameOfOwner: "", // mvable
      typeOfAquisition: "", // e art
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
      // description
      physicalDescription: "",
      historyStructure: "",
      stories: "",
      significance: "",
      description: "", // archae
      primaryCriteria: "", // archae
      comparativeCriteria: "", // archae
      mediumMaterial: "", // art
      height: "", // Art
      width: "", // Art
      length: "", // Art
      diameter: "", // Art
      edition: "", // art
      subject: "", // art
      provenance: "", // art
      descMaterial: "", // archival
      descRemarks: "", // archival
      rawMaterial: "", // natural
      sizeDimension: "", // natural
      surface: "", // natural
      storage: "", // natural
      original: "", // natural
      // conservation
      status: "",
      statusDes: "",
      statusRemarks: "",
      integrity: "",
      integrityRemarks: "",
      constraints: "",
      conservation: "",

      physicalConditionType: "", // all e natural
      physicalConditionOtherType: "", // all e natural
      generalCondition: "", // only natural

      loading: true,
      showInnerText: false,
    };
  },

  created() {
    this.heritage_id = this.$route.params.heritage_id;
    this.getHeritageType();
  },

  methods: {
    getHeritageType() {
      this.loading = true;
      this.showInnerText = false;
      db.collection("heritages")
        .doc(this.heritage_id)
        .onSnapshot(
          (doc) => {
            this.heritageType = doc.data().heritageType;
            this.categories = doc.data().categories;
            this.mapperLocation = doc.data().mapperLocation;
            this.uploadedBy = doc.data().uploadedBy;
            this.timestamp = doc.data().timestamp;
            this.verified = doc.data().verified;
            this.changes = doc.data().changes;
            this.message = doc.data().message;
            // Immovable
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
            this.photoURL = doc.data().photoURL;
            // Movable
            this.estimatedAge = doc.data().estimatedAge;
            this.nameOfOwner = doc.data().nameOfOwner;
            this.typeOfAquisition = doc.data().typeOfAquisition;
            this.religion = doc.data().religion;
            this.nationalityOfArtist = doc.data().nationalityOfArtist;
            this.ownerCollector = doc.data().ownerCollector;
            this.prevOwner = doc.data().prevOwner;
            this.currentOwner = doc.data().currentOwner;
            this.volumeSize = doc.data().volumeSize;
            this.arrangement = doc.data().arrangement;
            this.officeOrigin = doc.data().officeOrigin;
            this.contactPerson = doc.data().contactPerson;
            this.naturalType = doc.data().naturalType;
            this.addressOfOwner = doc.data().addressOfOwner;
            this.scientificName = doc.data().scientificName;
            this.commonName = doc.data().commonName;
            // description
            this.physicalDescription = doc.data().physicalDescription;
            this.historyStructure = doc.data().historyStructure;
            this.stories = doc.data().stories;
            this.significance = doc.data().significance;
            this.description = doc.data().description;
            this.primaryCriteria = doc.data().primaryCriteria;
            this.comparativeCriteria = doc.data().comparativeCriteria;
            this.mediumMaterial = doc.data().mediumMaterial;
            this.height = doc.data().height;
            this.width = doc.data().width;
            this.length = doc.data().length;
            this.diameter = doc.data().diameter;
            this.edition = doc.data().edition;
            this.subject = doc.data().subject;
            this.provenance = doc.data().provenance;
            this.descMaterial = doc.data().descMaterial;
            this.descRemarks = doc.data().descRemarks;
            this.rawMaterial = doc.data().rawMaterial;
            this.sizeDimension = doc.data().sizeDimension;
            this.surface = doc.data().surface;
            this.storage = doc.data().storage;
            this.original = doc.data().original;
            // conservation
            this.status = doc.data().status;
            this.statusDes = doc.data().statusDes;
            this.statusRemarks = doc.data().statusRemarks;
            this.integrity = doc.data().integrity;
            this.integrityRemarks = doc.data().integrityRemarks;
            this.constraints = doc.data().constraints;
            this.conservation = doc.data().conservation;
            this.physicalConditionType = doc.data().physicalConditionType;
            this.physicalConditionOtherType = doc.data().physicalConditionOtherType;
            this.generalCondition = doc.data().generalCondition;

            this.loading = false;
            this.showInnerText = true;
          },
          (err) => {}
        );
    },
  },
};
</script>
