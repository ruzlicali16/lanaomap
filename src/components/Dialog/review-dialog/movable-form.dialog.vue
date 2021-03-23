<template>
  <div class="q-mx-sm">
    <div class="row-1 row">
      <q-input
        v-if="name != null && name != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="name"
        label="Name of Object"
        style="pointer-events: none"
      />
      <q-input
        v-if="naturalType != null && naturalType != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="naturalType"
        label="Classification"
        style="pointer-events: none"
      />
      <q-input
        v-if="type != null && type != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="type"
        label="Type"
        style="pointer-events: none"
      />

      <q-input
        v-if="location != null && location != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="location"
        label="Location"
        style="pointer-events: none"
      />
    </div>
    <div class="row-2 row">
      <q-input
        v-if="latitude != null && latitude != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="latitude"
        label="Latitude"
        style="pointer-events: none"
      />
      <q-input
        v-if="longitude != null && longitude != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="longitude"
        label="Longitude"
        style="pointer-events: none"
      />
      <q-input
        v-if="date != null && date != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="date"
        label="Date Found/Produced"
        style="pointer-events: none"
      />
    </div>
    <div class="row-3 row">
      <q-input
        v-if="estimatedAge != null && estimatedAge != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="estimatedAge"
        label="Estimated Age"
        style="pointer-events: none"
      />
      <q-input
        v-if="nameOfOwner != null && nameOfOwner != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="nameOfOwner"
        label="Name of Owner"
        style="pointer-events: none"
      />
      <q-input
        v-if="typeOfAquisition != null && typeOfAquisition != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="typeOfAquisition"
        label="Type of Aquisition"
        style="pointer-events: none"
      />
    </div>
    <div class="row-4 row">
      <q-input
        v-if="religion != null && religion != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="religion"
        label="Religion/Denomination"
        style="pointer-events: none"
      />
      <q-input
        v-if="nationalityOfArtist != null && nationalityOfArtist != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="nationalityOfArtist"
        label="Nationality of Artist"
        style="pointer-events: none"
      />
      <q-input
        v-if="ownerCollector != null && ownerCollector != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="ownerCollector"
        label="Owner/Collector/Origin"
        style="pointer-events: none"
      />
    </div>
    <div class="row-5 row">
      <q-input
        v-if="prevOwner != null && prevOwner != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="prevOwner"
        label="Previous Owner"
        style="pointer-events: none"
      />
      <q-input
        v-if="currentOwner != null && currentOwner != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="currentOwner"
        label="Current Owner"
        style="pointer-events: none"
      />
      <q-input
        v-if="address != null && address != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="address"
        label="Address"
        style="pointer-events: none"
      />
    </div>
    <div class="row-6 row">
      <q-input
        v-if="volumeSize != null && volumeSize != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="volumeSize"
        label="Volume/Size of Record"
        style="pointer-events: none"
      />
      <q-input
        v-if="arrangement != null && arrangement != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="arrangement"
        label="Arrangement"
        style="pointer-events: none"
      />
      <q-input
        v-if="officeOrigin != null && officeOrigin != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="officeOrigin"
        label="Office of Origin"
        style="pointer-events: none"
      />
    </div>
    <div class="row-7 row">
      <q-input
        v-if="contactPerson != null && contactPerson != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="contactPerson"
        label="Contact Person"
        style="pointer-events: none"
      />

      <q-input
        v-if="addressOfOwner != null && addressOfOwner != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="addressOfOwner"
        label="Address of Owner"
        style="pointer-events: none"
      />
    </div>
    <div class="row-8 row">
      <q-input
        v-if="scientificName != null && scientificName != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="scientificName"
        label="Scientific Name"
        style="pointer-events: none"
      />
      <q-input
        v-if="commonName != null && commonName != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="commonName"
        label="Common Name"
        style="pointer-events: none"
      />
    </div>
    <div v-if="selectedFile || photoURL" class="row-5 row q-mt-sm shadow-3">
      <q-img v-if="selectedFile" class="col" :src="selectedFile"></q-img>
      <q-img v-if="!selectedFile" class="col" :src="photoURL"></q-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "mov-form",

  data() {
    return {
      name: "", // s
      type: "", // s
      location: "", // s
      latitude: "", // s
      longitude: "", // s
      date: "", // s
      estimatedAge: "", // e art, archival
      nameOfOwner: "", // all
      typeOfAquisition: "", // e art
      gg: "", // s

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
      addressOfOwner: "", // natural
      scientificName: "", // natural
      commonName: "", // natural

      selectedFile: "",
    };
  },

  created() {
    this.name = this.$store.state.services.name;
    this.type = this.$store.state.services.type;
    this.location = this.$store.state.services.location;
    this.latitude = this.$store.state.services.latitude;
    this.longitude = this.$store.state.services.longitude;
    this.date = this.$store.state.services.date;
    this.estimatedAge = this.$store.state.services.estimatedAge;
    this.nameOfOwner = this.$store.state.services.nameOfOwner;
    this.typeOfAquisition = this.$store.state.services.typeOfAquisition;
    this.file = this.$store.state.services.file;
    this.photoURL = this.$store.state.services.photoURL;
    var url = this.$store.state.services.files;
    if (url) {
      this.selectedFile = URL.createObjectURL(url);
    }
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
  },
};
</script>
