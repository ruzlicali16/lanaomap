<template>
  <div class="q-mx-sm">
    <div class="row-1 row">
      <q-input
        v-if="keyInformants != null && keyInformants != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="keyInformants"
        label="Key Informants:"
        style="pointer-events: none"
      />
      <q-input
        v-if="reference != null && reference != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="reference"
        label="Reference:"
        style="pointer-events: none"
      />
    </div>
    <div class="row-2 row">
      <q-input
        v-if="mapperName != null && mapperName != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="mapperName"
        label="Name of Profiler/Mapper:"
        style="pointer-events: none"
      />
      <q-input
        v-if="dateProfiled != null && dateProfiled != ''"
        class="col-grow"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="dateProfiled"
        label="Date Profiled:"
        style="pointer-events: none"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "references",

  data() {
    return {
      keyInformants: "",
      reference: "",
      mapperName: "",
      dateProfiled: "",
    };
  },

  created() {
    this.keyInformants = this.$store.state.services.keyInformants;
    this.reference = this.$store.state.services.reference;
    this.mapperName = this.$store.state.services.mapperName;
    this.dateProfiled = this.$store.state.services.dateProfiled;
  },
};
</script>
