<template>
  <q-dialog
    v-model="reviewFormDialog"
    transition-show="fade"
    transition-hide="fade"
    full-height
  >
    <q-card
      class="my-card"
      style="width: 700px; max-width: 85vw; height: 700px"
    >
      <q-toolbar
        v-if="this.hid == undefined"
        class="bg-blue vertical-top text-center text-white"
      >
        <q-toolbar-title v-if="!this.$q.platform.is.mobile">
          Review of Submitted
          <span class="text-weight-bold">{{ selectedHeritage }} Heritage</span>
        </q-toolbar-title>
        <q-toolbar-title v-else>
          Review of Submitted
          <p class="text-weight-bold q-ma-none">
            {{ selectedHeritage }} Heritage
          </p>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar v-else class="bg-blue vertical-top text-center text-white">
        <q-toolbar-title v-if="!this.$q.platform.is.mobile">
          Review of Editted
          <span class="text-weight-bold">{{ selectedHeritage }} Heritage</span>
        </q-toolbar-title>
        <q-toolbar-title v-else>
          Review of Editted
          <p class="text-weight-bold q-ma-none">
            {{ selectedHeritage }} Heritage
          </p>
        </q-toolbar-title>
      </q-toolbar>
      <q-scroll-area style="height: 540px">
        <div>
          <q-card-section class="text-overline">
            I. Background Information
            <ImmovableForm v-if="selectedHeritage == 'Immovable'" />
            <MovableFrom v-else />
          </q-card-section>
          <q-card-section class="q-pt-none text-overline">
            II. Description, Stories and Significance
            <DescriptionForm />
          </q-card-section>
          <q-card-section class="q-pt-none text-overline">
            III. Conservation
            <ConservationForm />
          </q-card-section>
          <q-card-section class="q-pt-none text-overline">
            IV. References
            <ReferencesForm />
          </q-card-section>
        </div>
      </q-scroll-area>
      <div
        :class="this.$q.platform.is.mobile ? 'absolute-bottom' : ''"
      >
        <q-separator />
        <q-card-actions class="q-pt-md" align="right">
          <q-btn
            color="red"
            outline
            dense
            label="Close"
            @click="reviewFormDialog = false"
          />
          <q-btn
            color="green"
            outline
            dense
            :label="hid == undefined ? 'Submit' : 'Save'"
            :loading="loading"
            @click="submit()"
          />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";
import ImmovableForm from "./review-dialog/immovable-form.dialog";
import MovableFrom from "./review-dialog/movable-form.dialog";
import DescriptionForm from "./review-dialog/description-form.dialog";
import ConservationForm from "./review-dialog/conservation-form.dialog";
import ReferencesForm from "./review-dialog/references-form.dialog";
import { QSpinnerGears, QSpinnerOval, date } from "quasar";

export default {
  name: "ReviewForm",

  components: {
    ImmovableForm,
    MovableFrom,
    DescriptionForm,
    ConservationForm,
    ReferencesForm,
  },

  data() {
    return {
      // step 1
      name: "",
      type: "",
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
      // Immovable heritage end here

      estimatedAge: "", // excpet art, archival
      nameOfOwner: "", // all
      typeOfAquisition: "", // except art
      religion: "", // religion only
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
      naturalOtherType: "", // natural
      addressOfOwner: "", // natural
      scientificName: "", // natural
      commonName: "", // natural

      // description immovable
      physicalDescription: "",
      historyStructure: "",
      stories: "",
      significance: "",

      // description movable
      description: "", // e art, natural
      primaryCriteria: "", // archae
      comparativeCriteria: "", // archae
      mediumMaterial: "", // art
      height: "", // art
      width: "", // art
      length: "", // art
      diameter: "", // art
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

      // conservation immovable
      status: "",
      statusDes: "",
      statusRemarks: "",
      integrity: "",
      integrityRemarks: "",
      constraints: "",
      conservation: "",

      // conservation movable
      physicalConditionType: "",
      physicalConditionOtherType: "",
      generalCondition: "",

      selectedCategory: "",
      selectedCatType: "",
      selectedHeritage: "",
      selectedFile: "",
      currentDate: "",
      nameOfUploader: "",
      mapperLocation: "",

      loading: false,
      hid: "",
    };
  },

  created() {
    this.hid = this.$route.params.heritage_id;
    if (this.hid != undefined) {
      this.getDataById();
    } else {
      this.selectedCategory = this.$store.state.services.selectedCategory;
      this.selectedHeritage = this.$store.state.services.selectedValue2;
      this.selectedCatType = this.$store.state.services.selectedValue;
    }
    this.getCurrentUser();
    console.log(this.selectedCategory, "-", this.selectedHeritage);
  },

  updated() {
    this.getInputFromField;
  },

  computed: {
    getInputFromField() {
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

      this.keyInformants = this.$store.state.services.keyInformants;
      this.reference = this.$store.state.services.reference;
      this.mapperName = this.$store.state.services.mapperName;
      this.dateProfiled = this.$store.state.services.dateProfiled;

      this.physicalDescription = this.$store.state.services.physicalDescription;
      this.historyStructure = this.$store.state.services.historyStructure;
      this.stories = this.$store.state.services.stories;
      this.significance = this.$store.state.services.significance;

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
      // this.naturalOtherType = this.$store.state.services.naturalOtherType;
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
      this.generalCondition = this.$store.state.services.generalCondition;
    },

    reviewFormDialog: {
      get() {
        return this.$store.state.siteNav.reviewFormDialog;
      },
      set(val) {
        this.$store.dispatch("siteNav/reviewFormDialog", val);
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
      db.collection("heritages")
        .doc(this.hid)
        .get()
        .then((doc) => {
          this.selectedCategory = doc.data().selectedCategory;
          this.selectedHeritage = doc.data().heritageType;
          this.selectedCatType = doc.data().categories;
        });
    },

    getCurrentDate() {
      let timeStamp = Date.now();
      let formattedString = date.formatDate(
        timeStamp,
        "dddd, YYYY-MM-DD h:mm:ss A"
      );
      console.log(formattedString);
      return (this.currentDate = formattedString);
    },

    getCurrentUser() {
      let user = firebase.auth().currentUser;

      db.collection("profiles")
        .doc(user.uid)
        .get()
        .then((doc) => {
          return (
            (this.nameOfUploader =
              doc.data().firstname + " " + doc.data().lastname),
            (this.mapperLocation = doc.data().location)
          );
        });
    },

    submitImmovableHeritage(photoURL) {
      let user = firebase.auth().currentUser;
      if (this.hid == undefined) {
        return db
          .collection("heritages")
          .add({
            uid: user.uid,
            categories: this.selectedCatType,
            heritageType: this.selectedHeritage,
            photoURL: photoURL,
            name: this.name,
            type: this.type,
            ownership: this.ownership,
            baranggayLocation: this.location,
            lat: this.latitude,
            lng: this.longitude,
            totalArea: this.totalArea,
            structure: this.structure,
            dateFoundProduce: this.date,
            ownershipJurisdiction: this.ownershipJurisdiction,
            declarationLegislation: this.declarationLegislation,
            keyInformants: this.keyInformants,
            reference: this.reference,
            mapperName: this.mapperName,
            dateProfiled: this.dateProfiled,
            physicalDescription: this.physicalDescription,
            historyStructure: this.historyStructure,
            stories: this.stories,
            significance: this.significance,
            status: this.status,
            statusRemarks: this.statusRemarks,
            statusDes: this.statusDes,
            integrity: this.integrity,
            integrityRemarks: this.integrityRemarks,
            constraints: this.constraints,
            conservation: this.conservation,
            mapperLocation: this.mapperLocation,
            uploadedBy: this.nameOfUploader,
            timestamp: this.currentDate,
            verified: false,
            selectedCategory: this.selectedCategory,
          })
          .then(() => {
            this.uploadSuccessNotif();
            photoURL = "";
          })
          .catch((err) => {
            this.hasErrorNotif(err);
          });
      } else {
        return db
          .collection("heritages")
          .doc(this.hid)
          .update({
            uid: user.uid,
            categories: this.selectedCatType,
            heritageType: this.selectedHeritage,
            photoURL: photoURL,
            name: this.name,
            type: this.type,
            ownership: this.ownership,
            baranggayLocation: this.location,
            lat: this.latitude,
            lng: this.longitude,
            totalArea: this.totalArea,
            structure: this.structure,
            dateFoundProduce: this.date,
            ownershipJurisdiction: this.ownershipJurisdiction,
            declarationLegislation: this.declarationLegislation,
            keyInformants: this.keyInformants,
            reference: this.reference,
            mapperName: this.mapperName,
            dateProfiled: this.dateProfiled,
            physicalDescription: this.physicalDescription,
            historyStructure: this.historyStructure,
            stories: this.stories,
            significance: this.significance,
            status: this.status,
            statusDes: this.statusDes,
            statusRemarks: this.statusRemarks,
            integrity: this.integrity,
            integrityRemarks: this.integrityRemarks,
            constraints: this.constraints,
            conservation: this.conservation,
            mapperLocation: this.mapperLocation,
            uploadedBy: this.nameOfUploader,
            timestamp: this.currentDate,
            changes: true,
            selectedCategory: this.selectedCategory,
          })
          .then(() => {
            this.edidtedSuccessNotif();
            photoURL = "";
          })
          .catch((err) => {
            this.hasErrorNotif(err);
          });
      }
    },

    archaeEthnoWorksOthersData(hid) {
      db.collection("heritages")
        .doc(hid)
        .update({
          estimatedAge: this.estimatedAge,
          typeOfAquisition: this.typeOfAquisition,
          description: this.description,
          physicalConditionType: this.physicalConditionType,
          physicalConditionOtherType: this.physicalConditionOtherType,
          statusRemarks: this.statusRemarks,
          primaryCriteria: this.primaryCriteria,
          comparativeCriteria: this.comparativeCriteria,
        })
        .catch((err) => {
          console.log(`archaeEthnoWorksDataOthers has ${err.message}`);
        });
    },

    religiousData(hid) {
      console.log("religion");
      db.collection("heritages")
        .doc(hid)
        .update({
          estimatedAge: this.estimatedAge,
          description: this.description,
          primaryCriteria: this.primaryCriteria,
          comparativeCriteria: this.comparativeCriteria,
          typeOfAquisition: this.typeOfAquisition,
          religion: this.religion,
          physicalConditionType: this.physicalConditionType,
          physicalConditionOtherType: this.physicalConditionOtherType,
          statusRemarks: this.statusRemarks,
        })
        .catch((err) => {
          console.log(`religiousData has ${err.message}`);
        });
    },

    artData(hid) {
      console.log("art");
      db.collection("heritages")
        .doc(hid)
        .update({
          nationalityOfArtist: this.nationalityOfArtist,
          ownerCollector: this.ownerCollector,
          prevOwner: this.prevOwner,
          currentOwner: this.currentOwner,
          address: this.address,
          mediumMaterial: this.mediumMaterial,
          height: this.height,
          width: this.width,
          length: this.length,
          diameter: this.diameter,
          edition: this.edition,
          subject: this.subject,
          provenance: this.provenance,
          physicalConditionType: this.physicalConditionType,
          physicalConditionOtherType: this.physicalConditionOtherType,
          statusRemarks: this.statusRemarks,
        })
        .catch((err) => {
          console.log(`artData has ${err.message}`);
        });
    },

    arhcivalData(hid) {
      db.collection("heritages")
        .doc(hid)
        .update({
          typeOfAquisition: this.typeOfAquisition,
          volumeSize: this.volumeSize,
          arrangement: this.arrangement,
          officeOrigin: this.officeOrigin,
          contactPerson: this.contactPerson,
          descMaterial: this.descMaterial,
          descRemarks: this.descRemarks,
          physicalConditionType: this.physicalConditionType,
          physicalConditionOtherType: this.physicalConditionOtherType,
          statusRemarks: this.statusRemarks,
          primaryCriteria: this.primaryCriteria,
          comparativeCriteria: this.comparativeCriteria,
        })
        .catch((err) => {
          console.log(`arhcivalData has ${err.message}`);
        });
    },

    naturalData(hid) {
      db.collection("heritages")
        .doc(hid)
        .update({
          estimatedAge: this.estimatedAge,
          typeOfAquisition: this.typeOfAquisition,
          naturalType: this.naturalType,
          addressOfOwner: this.addressOfOwner,
          scientificName: this.scientificName,
          commonName: this.commonName,
          description: this.description,
          primaryCriteria: this.primaryCriteria,
          comparativeCriteria: this.comparativeCriteria,
          rawMaterial: this.rawMaterial,
          sizeDimension: this.sizeDimension,
          surface: this.surface,
          storage: this.storage,
          original: this.original,
          generalCondition: this.generalCondition,
        })
        .catch((err) => {
          console.log(`naturalData has ${err.message}`);
        });
    },

    submitMovableHeritage(photoURL) {
      let user = firebase.auth().currentUser;

      if (this.hid == undefined) {
        return db
          .collection("heritages")
          .add({
            uid: user.uid,
            categories: this.selectedCatType,
            heritageType: this.selectedHeritage,
            photoURL: photoURL,
            name: this.name,
            type: this.type,
            baranggayLocation: this.location,
            lat: this.latitude,
            lng: this.longitude,
            dateFoundProduce: this.date,
            keyInformants: this.keyInformants,
            reference: this.reference,
            mapperName: this.mapperName,
            dateProfiled: this.dateProfiled,
            stories: this.stories,
            nameOfOwner: this.nameOfOwner,
            constraints: this.constraints,
            conservation: this.conservation,
            mapperLocation: this.mapperLocation,
            uploadedBy: this.nameOfUploader,
            timestamp: this.currentDate,
            verified: false,
            selectedCategory: this.selectedCategory,
          })
          .then((docRef) => {
            if (
              this.selectedCategory == "Archae" ||
              this.selectedCategory == "Ethno" ||
              this.selectedCategory == "Works" ||
              this.selectedCategory == "Other"
            ) {
              console.log("AEWO");
              this.archaeEthnoWorksOthersData(docRef.id);
            } else if (this.selectedCategory == "Religious") {
              console.log("Religious");
              this.religiousData(docRef.id);
            } else if (this.selectedCategory == "Art") {
              console.log("Art");
              this.artData(docRef.id);
            } else if (this.selectedCategory == "Archival") {
              this.arhcivalData(docRef.id);
              console.log("Archival");
            } else if (this.selectedCategory == "Natural") {
              this.naturalData(docRef.id);
              console.log("Natural"); // Last code
            }
            this.uploadSuccessNotif();
            photoURL = "";
          })
          .catch((err) => {
            this.hasErrorNotif(err);
            photoURL = "";
          });
      } else {
        return db
          .collection("heritages")
          .doc(this.hid)
          .update({
            uid: user.uid,
            categories: this.selectedCatType,
            heritageType: this.selectedHeritage,
            photoURL: photoURL,
            name: this.name,
            type: this.type,
            baranggayLocation: this.location,
            lat: this.latitude,
            lng: this.longitude,
            dateFoundProduce: this.date,
            keyInformants: this.keyInformants,
            reference: this.reference,
            mapperName: this.mapperName,
            dateProfiled: this.dateProfiled,
            stories: this.stories,
            nameOfOwner: this.nameOfOwner,
            constraints: this.constraints,
            conservation: this.conservation,
            mapperLocation: this.mapperLocation,
            uploadedBy: this.nameOfUploader,
            timestamp: this.currentDate,
            changes: false,
            selectedCategory: this.selectedCategory,
          })
          .then(() => {
            if (
              this.selectedCategory == "Archae" ||
              this.selectedCategory == "Ethno" ||
              this.selectedCategory == "Works" ||
              this.selectedCategory == "Other"
            ) {
              console.log("AEWO");
              this.archaeEthnoWorksOthersData(this.hid);
              if (this.selectedCategory == "Religious") {
                console.log("Religious");
                this.religiousData(this.hid);
              }
            } else if (this.selectedCategory == "Art") {
              console.log("Artwork");
              this.artData(this.hid);
            } else if (this.selectedCategory == "Archival") {
              this.arhcivalData(this.hid);
              console.log("Archival");
            } else if (this.selectedCategory == "Natural") {
              this.naturalData(this.hid);
              console.log("Natural"); // Last code
            }
            this.edidtedSuccessNotif();
            photoURL = "";
          })
          .catch((err) => {
            this.hasErrorNotif(err);
            photoURL = "";
          });
      }
    },

    async submit() {
      this.getCurrentDate();
      let photoFile = this.$store.state.services.files;
      let photoURL = "";

      if (photoFile != null && photoFile != "") {
        console.log("Photos Selected");
        const storageRef = firebase
          .storage()
          .ref(`heritagepic/${photoFile.name}`)
          .put(photoFile);
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.showLoadingScreen();
          },
          (err) => {
            this.hasErrorNotif(err);
          },
          () => {
            storageRef.snapshot.ref
              .getDownloadURL()
              .then((url) => {
                photoURL = url;
                if (photoURL != undefined) {
                  if (this.selectedHeritage == "Immovable") {
                    console.log("Immovable Heritage");
                    this.showLoadingScreen();
                    this.submitImmovableHeritage(photoURL);
                  } else if (this.selectedHeritage == "Movable") {
                    console.log("Movable Heritage");
                    this.showLoadingScreen();
                    this.submitMovableHeritage(photoURL); // photoURL
                  }
                }
              })
              .catch((err) => {
                this.hasErrorNotif(err);
              });
          }
        );
      } else {
        console.log("No photo(s) selected");
        if (this.selectedHeritage == "Immovable") {
          console.log("If Immovable Heritage");
          this.showLoadingScreen();
          this.submitImmovableHeritage("");
        } else if (this.selectedHeritage == "Movable") {
          console.log("Else Movable Heritage");
          this.showLoadingScreen();
          this.submitMovableHeritage("");
        }
      }
    },

    hasErrorNotif(err) {
      this.reviewFormDialog = false;
      this.loading = false;
      this.$q.loading.hide();
      this.$q.notify({
        type: "negative",
        message: `Something wrong when uploading data.`,
        caption: `Error: ${err.message}`,
        position: "bottom-left",
      });
    },

    edidtedSuccessNotif() {
      this.loading = false;
      this.reviewFormDialog = false;
      this.$router.push(`/mh/view-details/${this.hid}`);
      this.$q.loading.hide();
      this.$q.notify({
        message: `Your data edited successfully.`,
        position: "top-right",
        textColor: "green",
        color: "white",
        icon: "check_circle_outline",
      });
    },

    uploadSuccessNotif() {
      this.loading = false;
      this.addCulturalHeritage = false;
      this.reviewFormDialog = false;
      this.$router.push("/");
      this.$q.loading.hide();
      this.$q.notify({
        type: "positive",
        message: `Your data uploaded successfully. 
        Please wait for the approval of Municipal Admin`,
        caption: `Thank you so much!`,
        position: "bottom-left",
      });
    },

    showLoadingScreen() {
      this.loading = true;
      this.$q.loading.show({
        message: `Uploading your data. Please wait patiently.`,
      });
    },
  },

  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      console.log("beforeDestroy");
      this.$q.loading.hide();
    }
  },
};
</script>
