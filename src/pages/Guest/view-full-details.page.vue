<template>
  <q-page class="q-pt-md" :key="$route.fullPath">
    <title>View Heritage | Lanao Map</title>
    <div>
      <q-card
        class="shadow-10 my-card q-mb-lg bg-green text-white relative-position"
        :class="this.$q.screen.lt.md ? 'q-mx-sm' : 'q-mx-xl'"
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
                  I. Background Information
                </p>

                <div :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'">
                  <div v-if="type" class="text-weight-regular">
                    Type:
                    <small class="text-weight-light">{{ type }}</small>
                  </div>
                  <div v-if="ownership" class="text-weight-regular">
                    Ownership:
                    <small class="text-weight-light">{{ ownership }}</small>
                  </div>
                  <div v-if="mapperLocation" class="text-weight-regular">
                    Municipality:
                    <small class="text-weight-light">{{
                      mapperLocation
                    }}</small>
                  </div>
                  <div v-if="location" class="text-weight-regular">
                    Baranggay Location:
                    <small class="text-weight-light">{{ location }}</small>
                  </div>
                  <div v-if="latitude" class="text-weight-regular">
                    Latitude:
                    <small class="text-weight-light">{{ latitude }}</small>
                  </div>
                  <div v-if="longitude" class="text-weight-regular">
                    Longitude:
                    <small class="text-weight-light">{{ longitude }}</small>
                  </div>
                  <div v-if="totalArea" class="text-weight-regular">
                    Total Land Area:
                    <small class="text-weight-light">{{ totalArea }}</small>
                  </div>
                  <div v-if="structure" class="text-weight-regular">
                    Structure:
                    <small class="text-weight-light">{{ structure }}</small>
                  </div>
                  <div v-if="date" class="text-weight-regular">
                    Date/Year Produced:
                    <small class="text-weight-light">{{ date }}</small>
                  </div>
                  <div v-if="ownershipJurisdiction" class="text-weight-regular">
                    Ownership/Jurisdiction:
                    <small class="text-weight-light">{{
                      ownershipJurisdiction
                    }}</small>
                  </div>
                  <div
                    v-if="declarationLegislation"
                    class="text-weight-regular"
                  >
                    Declaration/Legislation:
                    <small class="text-weight-light">{{
                      declarationLegislation
                    }}</small>
                  </div>
                  <div v-if="estimatedAge" class="text-weight-regular">
                    Estimated Age:
                    <small class="text-weight-light">{{ estimatedAge }}</small>
                  </div>
                  <div v-if="nameOfOwner" class="text-weight-regular">
                    Name of Owner:
                    <small class="text-weight-light">{{ nameOfOwner }}</small>
                  </div>
                  <div v-if="typeOfAquisition" class="text-weight-regular">
                    Type of Aquisition:
                    <small class="text-weight-light">{{
                      typeOfAquisition
                    }}</small>
                  </div>
                  <div v-if="religion" class="text-weight-regular">
                    Religion/Denomination:
                    <small class="text-weight-light">{{ religion }}</small>
                  </div>
                  <div v-if="nationalityOfArtist" class="text-weight-regular">
                    Nationality of Artist:
                    <small class="text-weight-light">{{
                      nationalityOfArtist
                    }}</small>
                  </div>
                  <div v-if="ownerCollector" class="text-weight-regular">
                    Owner/Collector/Origin:
                    <small class="text-weight-light">{{
                      ownerCollector
                    }}</small>
                  </div>
                  <div v-if="prevOwner" class="text-weight-regular">
                    Previous Owner:
                    <small class="text-weight-light">{{ prevOwner }}</small>
                  </div>
                  <div v-if="currentOwner" class="text-weight-regular">
                    Current Owner:
                    <small class="text-weight-light">{{ currentOwner }}</small>
                  </div>
                  <div v-if="address" class="text-weight-regular">
                    Address:
                    <small class="text-weight-light">{{ address }}</small>
                  </div>
                  <div v-if="volumeSize" class="text-weight-regular">
                    Volume Size:
                    <small class="text-weight-light">{{ volumeSize }}</small>
                  </div>
                  <div v-if="arrangement" class="text-weight-regular">
                    Arrangement:
                    <small class="text-weight-light">{{ arrangement }}</small>
                  </div>
                  <div v-if="contactPerson" class="text-weight-regular">
                    Contact Person:
                    <small class="text-weight-light">{{ contactPerson }}</small>
                  </div>
                  <div v-if="naturalType" class="text-weight-regular">
                    Natural Type:
                    <small class="text-weight-light">{{ naturalType }}</small>
                  </div>
                  <div v-if="addressOfOwner" class="text-weight-regular">
                    Address Of Owner:
                    <small class="text-weight-light">{{
                      addressOfOwner
                    }}</small>
                  </div>
                  <div v-if="scientificName" class="text-weight-regular">
                    Scientific Name:
                    <small class="text-weight-light">{{
                      scientificName
                    }}</small>
                  </div>
                  <div v-if="commonName" class="text-weight-regular">
                    Common Name:
                    <small class="text-weight-light">{{ commonName }}</small>
                  </div>
                </div>
                <p :class="$q.screen.lt.md ? 'text-h6' : 'text-h4'">
                  <u>References</u>
                </p>
                <div :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'">
                  <div v-if="keyInformants" class="text-weight-regular">
                    Key Informants:
                    <small class="text-weight-light">{{ keyInformants }}</small>
                  </div>
                  <div v-if="reference" class="text-weight-regular">
                    Reference:
                    <small class="text-weight-light">{{ reference }}</small>
                  </div>
                  <div v-if="mapperName" class="text-weight-regular">
                    Mapper Name:
                    <small class="text-weight-light">{{ mapperName }}</small>
                  </div>
                  <div v-if="dateProfiled" class="text-weight-regular">
                    Date Profiled:
                    <small class="text-weight-light">{{ dateProfiled }}</small>
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
        class="shadow-10 my-card q-mb-lg bg-green text-white relative-position"
        :class="this.$q.screen.lt.md ? 'q-mx-sm' : 'q-mx-xl'"
        :style="loading ? 'height: 570px;' : ''"
      >
        <q-card-section
          :class="
            $q.screen.lt.md ? 'col-12 q-gutter-y-xs' : 'col-12  q-gutter-y-xs'
          "
        >
          <p :class="$q.screen.lt.md ? 'text-h6' : 'text-h4'">
            II. Description
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
        class="shadow-10 my-card q-mb-lg bg-green text-white relative-position"
        :class="this.$q.screen.lt.md ? 'q-mx-sm' : 'q-mx-xl'"
        :style="loading ? 'height: 570px;' : ''"
      >
        <q-card-section
          :class="
            $q.screen.lt.md ? 'col-12 q-gutter-y-xs' : 'col-12  q-gutter-y-xs'
          "
        >
          <p :class="$q.screen.lt.md ? 'text-h6' : 'text-h4'">
            III. Conservation
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
