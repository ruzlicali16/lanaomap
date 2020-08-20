<template>
  <div class="q-mx-sm">
    <div class="col">
      <q-input
        v-if="physicalDescription != null && physicalDescription != ''"
        class=""
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="physicalDescription"
        autogrow
        type="textarea"
        label="Physical Description:"
        style="pointer-events: none"
      />
      <q-input
        v-if="historyStructure != null && historyStructure != ''"
        class=""
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="historyStructure"
        autogrow
        type="textarea"
        label="History of Structure:"
        style="pointer-events: none"
      />

      <q-input
        v-if="description != null && description != ''"
        class=""
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="description"
        autogrow
        type="textarea"
        label="Description:"
        style="pointer-events: none"
      />

      <div class="row">
        <div v-if="height != null && height != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="height"
            type="number"
            label="Height (Centimeters):"
            style="pointer-events: none"
          />
        </div>
        <div v-if="width != null && width != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="width"
            type="number"
            label="Length (Centimeters):"
            style="pointer-events: none"
          />
        </div>
      </div>
      <div class="row">
        <div v-if="length != null && length != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="length"
            type="number"
            label="Length (Centimeters):"
            style="pointer-events: none"
          />
        </div>
        <div v-if="diameter != null && diameter != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="diameter"
            type="number"
            label="Diameter (Centimeters):"
            style="pointer-events: none"
          />
        </div>
      </div>
      <div class="row">
        <div v-if="edition != null && edition != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="edition"
            label="Edition from Original:"
            style="pointer-events: none"
          />
        </div>
        <div v-if="subject != null && subject != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="subject"
            label="Subject:"
            style="pointer-events: none"
          />
        </div>
      </div>
      <div class="row">
        <div v-if="descMaterial != null && descMaterial != ''" class="col">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="descMaterial"
            label="Description Material:"
            style="pointer-events: none"
          />
        </div>
        <div v-if="descRemarks != null && descRemarks != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="descRemarks"
            label="Remarks:"
            style="pointer-events: none"
          />
        </div>
      </div>
      <div class="row">
        <div v-if="mediumMaterial != null && mediumMaterial != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="mediumMaterial"
            label="Medium/Material:"
            style="pointer-events: none"
          />
        </div>
        <div v-if="provenance != null && provenance != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="provenance"
            label="Provenance:"
            style="pointer-events: none"
          />
        </div>
      </div>
      <div class="row">
        <div v-if="rawMaterial != null && rawMaterial != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="rawMaterial"
            label="Raw Material:"
            style="pointer-events: none"
          />
        </div>
        <div v-if="sizeDimension != null && sizeDimension != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="sizeDimension"
            label="Size/Dimensions"
            style="pointer-events: none"
          />
        </div>
        <div v-if="surface != null && surface != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="surface"
            label="Surface Decoration:"
            style="pointer-events: none"
          />
        </div>
      </div>
      <div class="row">
        <div v-if="storage != null && storage != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="storage"
            label="Storage Method:"
            style="pointer-events: none"
          />
        </div>
        <div v-if="original != null && original != ''" class="col ">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="original"
            label="Original Habitat:"
            style="pointer-events: none"
          />
        </div>
      </div>
      <q-input
        class=""
        v-if="stories != null && stories != ''"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="stories"
        autogrow
        type="textarea"
        label="Stories:"
        style="pointer-events: none"
      />
      <q-input
        v-if="significance != null && significance != ''"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="significance"
        autogrow
        type="textarea"
        label="Significance:"
        style="pointer-events: none"
      />
      <q-input
        class=""
        v-if="primaryCriteria != null && primaryCriteria != ''"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="primaryCriteria"
        autogrow
        type="textarea"
        label="Primary Criteria:"
        style="pointer-events: none"
      />
      <q-input
        v-if="comparativeCriteria != null && comparativeCriteria != ''"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="comparativeCriteria"
        autogrow
        type="textarea"
        label="Comparative Criteria:"
        style="pointer-events: none"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "desc-form",

  data() {
    return {
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
    };
  },

  created() {
    this.physicalDescription = this.$store.state.services.physicalDescription;
    this.historyStructure = this.$store.state.services.historyStructure;
    this.stories = this.$store.state.services.stories;
    this.significance = this.$store.state.services.significance;
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
  },
};
</script>
