<template>
  <q-page class="q-pt-md" :key="$route.fullPath">
    <title>View Full Details | Lanao Map</title>
    <div>
      <q-card
        class="
          shadow-10
          my-card
          q-mb-xl q-mt-lg
          bg-grey-3
          text-grey-9
          relative-position
        "
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
            <q-card-actions
              key="editbutton"
              :align="this.$q.screen.lt.md ? 'center' : 'right'"
            >
              <!-- Mappers -->
              <q-btn
                v-if="position == 'Mapper'"
                dense
                color="white"
                text-color="black"
                label="Edit Heritage"
                icon="edit"
                @click="editHeritage"
              />
              <!-- Municipal Admin -->
              <q-btn
                v-if="
                  (position == 'Municipal Admin' && !changes && !verified) ||
                  (changes && !verified)
                "
                dense
                color="red"
                text-color="white"
                label="Disapprove"
                icon="close"
                @click="disapprove"
                style="width: 150px"
              />
              <q-btn
                v-if="
                  (position == 'Municipal Admin' && !changes && !verified) ||
                  (changes && !verified)
                "
                dense
                color="green"
                text-color="white"
                label="Approve"
                icon="check"
                @click="approve"
                style="width: 150px"
              />
            </q-card-actions>

            <q-card-section
              key="titleSection"
              class="text-center q-pa-none"
              :class="$q.screen.lt.md ? 'text-h5' : 'text-h3'"
            >
              Tangible {{ heritageType }} Heritage
              <p class="text-h6 text-weight-light">
                Category:
                <q-chip
                  class="green"
                  color="green"
                  text-color="white"
                  :label="categories"
                  outline
                />
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
                  <u>Background Information</u>
                </p>

                <div :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'">
                  <div v-if="type" class="text-weight-regular">
                    <small class="text-weight-light text-body2"> Type: </small>
                    <span class="text-body1 text-weight-bold">{{ type }}</span>
                  </div>
                  <div v-if="ownership" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Ownership:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      ownership
                    }}</span>
                  </div>
                  <div v-if="mapperLocation" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Municipality:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      mapperLocation
                    }}</span>
                  </div>
                  <div v-if="location" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Baranggay Location:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      location
                    }}</span>
                  </div>
                  <div v-if="latitude" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Latitude:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      latitude
                    }}</span>
                  </div>
                  <div v-if="longitude" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Longitude:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      longitude
                    }}</span>
                  </div>
                  <div v-if="totalArea" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Total Land Area:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      totalArea
                    }}</span>
                  </div>
                  <div v-if="structure" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Structure:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      structure
                    }}</span>
                  </div>
                  <div v-if="date" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Date/Year Produced:
                    </small>
                    <span class="text-body1 text-weight-bold">{{ date }}</span>
                  </div>
                  <div v-if="ownershipJurisdiction" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Ownership/Jurisdiction:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      ownershipJurisdiction
                    }}</span>
                  </div>
                  <div
                    v-if="declarationLegislation"
                    class="text-weight-regular"
                  >
                    <small class="text-weight-light text-body2">
                      Declaration/Legislation:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      declarationLegislation
                    }}</span>
                  </div>
                  <div v-if="estimatedAge" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Estimated Age:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      estimatedAge
                    }}</span>
                  </div>
                  <div v-if="nameOfOwner" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Name of Owner:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      nameOfOwner
                    }}</span>
                  </div>
                  <div v-if="typeOfAquisition" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Type of Aquisition:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      typeOfAquisition
                    }}</span>
                  </div>
                  <div v-if="religion" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Religion/Denomination:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      religion
                    }}</span>
                  </div>
                  <div v-if="nationalityOfArtist" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Nationality of Artist:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      nationalityOfArtist
                    }}</span>
                  </div>
                  <div v-if="ownerCollector" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Owner/Collector/Origin:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      ownerCollector
                    }}</span>
                  </div>
                  <div v-if="prevOwner" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Previous Owner:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      prevOwner
                    }}</span>
                  </div>
                  <div v-if="currentOwner" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Current Owner:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      currentOwner
                    }}</span>
                  </div>
                  <div v-if="address" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Address:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      address
                    }}</span>
                  </div>
                  <div v-if="volumeSize" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Volume Size:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      volumeSize
                    }}</span>
                  </div>
                  <div v-if="arrangement" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Arrangement:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      arrangement
                    }}</span>
                  </div>
                  <div v-if="contactPerson" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Contact Person:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      contactPerson
                    }}</span>
                  </div>
                  <div v-if="naturalType" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Natural Type:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      naturalType
                    }}</span>
                  </div>
                  <div v-if="addressOfOwner" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Address Of Owner:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      addressOfOwner
                    }}</span>
                  </div>
                  <div v-if="scientificName" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Scientific Name:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      scientificName
                    }}</span>
                  </div>
                  <div v-if="commonName" class="text-weight-regular">
                    <small class="text-weight-light text-body2">
                      Common Name:
                    </small>
                    <span class="text-body1 text-weight-bold">{{
                      commonName
                    }}</span>
                  </div>
                </div>
              </q-card-section>
              <q-card-section :class="$q.screen.lt.md ? 'q-pt-none' : ''">
                <div
                  v-if="name"
                  class="q-pb-sm text-center text-uppercase text-weight-light"
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
                  class="
                    q-ma-none
                    row
                    justify-between
                    text-caption text-uppercase
                  "
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
        class="
          shadow-10
          my-card
          q-mb-xl
          bg-grey-3
          text-grey-9
          relative-position
        "
        :class="this.$q.screen.lt.md ? 'q-mx-sm' : 'q-mx-xl'"
        :style="loading ? 'height: 570px;' : ''"
      >
        <q-card-section
          :class="
            $q.screen.lt.md ? 'col-12 q-gutter-y-xs' : 'col-12  q-gutter-y-xs'
          "
        >
          <p :class="$q.screen.lt.md ? 'text-h6' : 'text-h4'">
            <u>Description</u>
          </p>

          <div :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'">
            <div v-if="physicalDescription" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Physical Description:
              </small>
              <span class="text-body1 text-weight-bold">{{
                physicalDescription
              }}</span>
            </div>
            <div v-if="historyStructure" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                History Structure:
              </small>
              <span class="text-body1 text-weight-bold">{{
                historyStructure
              }}</span>
            </div>
            <div v-if="stories" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Stories: </small>
              <span class="text-body1 text-weight-bold">{{ stories }}</span>
            </div>
            <div v-if="significance" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Significance:
              </small>
              <span class="text-body1 text-weight-bold">{{
                significance
              }}</span>
            </div>
            <div v-if="description" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Description: </small>
              <span class="text-body1 text-weight-bold">{{ description }}</span>
            </div>
            <div v-if="primaryCriteria" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Primary Criteria:
              </small>
              <span class="text-body1 text-weight-bold">{{
                primaryCriteria
              }}</span>
            </div>
            <div v-if="comparativeCriteria" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Comparative Criteria:
              </small>
              <span class="text-body1 text-weight-bold">{{
                primaryCriteria
              }}</span>
            </div>
            <div v-if="mediumMaterial" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Medium Material:
              </small>
              <span class="text-body1 text-weight-bold">{{
                mediumMaterial
              }}</span>
            </div>
            <div v-if="height" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Height: </small>
              <span class="text-body1 text-weight-bold">{{ height }}</span>
            </div>
            <div v-if="width" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Width: </small>
              <span class="text-body1 text-weight-bold">{{ width }}</span>
            </div>
            <div v-if="length" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Length: </small>
              <span class="text-body1 text-weight-bold">{{ length }}</span>
            </div>
            <div v-if="diameter" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Diameter: </small>
              <span class="text-body1 text-weight-bold">{{ diameter }}</span>
            </div>
            <div v-if="edition" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Edition: </small>
              <span class="text-body1 text-weight-bold">{{ edition }}</span>
            </div>
            <div v-if="subject" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Subject: </small>
              <span class="text-body1 text-weight-bold">{{ subject }}</span>
            </div>
            <div v-if="provenance" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Provenance: </small>
              <span class="text-body1 text-weight-bold">{{ provenance }}</span>
            </div>
            <div v-if="descMaterial" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Description of Material:
              </small>
              <span class="text-body1 text-weight-bold">{{
                descMaterial
              }}</span>
            </div>
            <div v-if="descRemarks" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Description Remarks:
              </small>
              <span class="text-body1 text-weight-bold">{{ descRemarks }}</span>
            </div>
            <div v-if="rawMaterial" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Raw Material:
              </small>
              <span class="text-body1 text-weight-bold">{{ rawMaterial }}</span>
            </div>
            <div v-if="sizeDimension" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Raw Size Dimension:
              </small>
              <span class="text-body1 text-weight-bold">{{
                sizeDimension
              }}</span>
            </div>
            <div v-if="surface" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Surface: </small>
              <span class="text-body1 text-weight-bold">{{ surface }}</span>
            </div>
            <div v-if="storage" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Storage: </small>
              <span class="text-body1 text-weight-bold">{{ storage }}</span>
            </div>
            <div v-if="original" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Original: </small>
              <span class="text-body1 text-weight-bold">{{ original }}</span>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card
        v-if="!loading"
        class="
          shadow-10
          my-card
          q-mb-xl
          bg-grey-3
          text-grey-9
          relative-position
        "
        :class="this.$q.screen.lt.md ? 'q-mx-sm' : 'q-mx-xl'"
        :style="loading ? 'height: 570px;' : ''"
      >
        <q-card-section
          :class="
            $q.screen.lt.md ? 'col-12 q-gutter-y-xs' : 'col-12  q-gutter-y-xs'
          "
        >
          <p :class="$q.screen.lt.md ? 'text-h6' : 'text-h4'">
            <u>Conservation</u>
          </p>

          <div :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'">
            <div v-if="status" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Status/Condition of structure:
              </small>
              <span class="text-body1 text-weight-bold">{{ status }}</span>
            </div>
            <div v-if="statusRemarks" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Status Remarks:
              </small>
              <span class="text-body1 text-weight-bold">{{
                statusRemarks
              }}</span>
            </div>
            <div v-if="statusDes" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Physical Description:
              </small>
              <span class="text-body1 text-weight-bold">{{ statusDes }}</span>
            </div>
            <div v-if="integrity" class="text-weight-regular">
              <small class="text-weight-light text-body2"> Integrity: </small>
              <span class="text-body1 text-weight-bold">{{ integrity }}</span>
            </div>
            <div v-if="integrityRemarks" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Integrity Remarks:
              </small>
              <span class="text-body1 text-weight-bold">{{
                integrityRemarks
              }}</span>
            </div>
            <div v-if="constraints" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Constraints/Threat/Issue:
              </small>
              <span class="text-body1 text-weight-bold">{{ constraints }}</span>
            </div>
            <div v-if="conservation" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Conservation Measures:
              </small>
              <span class="text-body1 text-weight-bold">{{
                conservation
              }}</span>
            </div>
            <div v-if="physicalConditionType" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                Physical Condition:
              </small>
              <span class="text-body1 text-weight-bold">{{
                physicalConditionType
              }}</span>
            </div>
            <div v-if="generalCondition" class="text-weight-regular">
              <small class="text-weight-light text-body2">
                General Condition:
              </small>
              <span class="text-body1 text-weight-bold">{{
                generalCondition
              }}</span>
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
      <q-btn dense icon="keyboard_arrow_up" text-color="white" color="black" />
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
            this.physicalConditionOtherType =
              doc.data().physicalConditionOtherType;
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
