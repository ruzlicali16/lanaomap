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
        label="Name of Object:"
        style="pointer-events: none"
      >
        <!-- <template v-slot:prepend>
          <q-icon name="person" />
        </template> -->
      </q-input>
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
        label="Type:"
        style="pointer-events: none"
      />
      <q-input
        v-if="ownership != null && ownership != ''"
        class="col-sm"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="ownership"
        label="Ownership:"
        style="pointer-events: none"
      />
    </div>
    <div class="row-2 row">
      <q-input
        v-if="location != null && location != ''"
        class="col-sm"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="location"
        label="Location:"
        style="pointer-events: none"
      />
      <q-input
        v-if="latitude != null && latitude != ''"
        class="col-4"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="latitude"
        label="Latitude:"
        style="pointer-events: none"
      />
      <q-input
        v-if="longitude != null && longitude != ''"
        class="col-4"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="longitude"
        label="Longitude:"
        style="pointer-events: none"
      />
    </div>
    <div class="row-3 row">
      <q-input
        v-if="totalArea != null && totalArea != ''"
        class="col-4"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="totalArea"
        label="Total Land Area:"
        style="pointer-events: none"
      />
      <q-input
        v-if="structure != null && structure != ''"
        class="col-4"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="structure"
        label="Structure:"
        style="pointer-events: none"
      />
      <q-input
        v-if="date != null && date != ''"
        class="col-sm"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="date"
        label="Year Constructed:"
        style="pointer-events: none"
      />
    </div>
    <div class="row-4 row">
      <q-input
        v-if="ownershipJurisdiction != null && ownershipJurisdiction != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="ownershipJurisdiction"
        label="Ownership/Jurisdiction:"
        style="pointer-events: none"
      />
      <q-input
        v-if="declarationLegislation != null && declarationLegislation != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="declarationLegislation"
        label="Declaration/Legislation:"
        style="pointer-events: none"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "imm-form",

  data() {
    return {
      name: "",
      type: "",
      ownership: "",
      location: "",
      latitude: "",
      longitude: "",
      totalArea: "",
      structure: "",
      date: "",
      ownershipJurisdiction: "",
      declarationLegislation: "",
      photoFile: "",
    };
  },

  created() {
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
  },
};
</script>
