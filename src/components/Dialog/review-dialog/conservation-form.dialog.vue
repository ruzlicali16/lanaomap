<template>
  <div class="q-mx-sm">
    <div class="row">
      <div v-if="status != null && status != ''" class="col">
        <q-input
          square
          outlined
          readonly
          dense
          dark
          label-color="white"
          bg-color="green"
          v-model="status"
          label="Status/Condition of Structure:"
          style="pointer-events: none"
        />
      </div>
      <div
        v-if="physicalConditionType != null && physicalConditionType != ''"
        class="col"
      >
        <q-input
          square
          outlined
          readonly
          dense
          dark
          label-color="white"
          bg-color="green"
          v-model="physicalConditionType"
          label="Physical Condition:"
          style="pointer-events: none"
        />
      </div>
      <div v-if="statusRemarks != null && statusRemarks != ''" class="col">
        <q-input
          square
          outlined
          readonly
          dense
          dark
          label-color="white"
          bg-color="green"
          v-model="statusRemarks"
          label="Status Remarks: "
          style="pointer-events: none"
        />
      </div>
    </div>

    <div class="col">
      <q-input
        v-if="statusDes != null && statusDes != ''"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="statusDes"
        autogrow
        type="textarea"
        label="Physical Condition:"
        style="pointer-events: none"
      />
      <div class="row">
        <div v-if="integrity != null && integrity != ''" class="col">
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="integrity"
            label="Integrity of the Structure:"
            style="pointer-events: none"
          />
        </div>
        <div
          v-if="integrityRemarks != null && integrityRemarks != ''"
          class="col"
        >
          <q-input
            square
            outlined
            readonly
            dense
            dark
            label-color="white"
            bg-color="green"
            v-model="integrityRemarks"
            label="Integrity Remarks: "
            style="pointer-events: none"
          />
        </div>
      </div>
      <q-input
        v-if="generalCondition != null && generalCondition != ''"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="generalCondition"
        autogrow
        type="textarea"
        label="General Condition:"
        style="pointer-events: none"
      />
      <q-input
        v-if="constraints != null && constraints != ''"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="constraints"
        autogrow
        type="textarea"
        label="Constraints/Threat/Issue:"
        style="pointer-events: none"
      />
      <q-input
        v-if="conservation != null && conservation != ''"
        square
        outlined
        readonly
        dense
        dark
        label-color="white"
        bg-color="green"
        v-model="conservation"
        autogrow
        type="textarea"
        label="Conservation Measures:"
        style="pointer-events: none"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "cons-form",
  data() {
    return {
      status: "",
      statusRemarks: "",
      statusDes: "", // textarea
      integrity: "",
      integrityRemarks: "",
      constraints: "", // textareaema
      conservation: "", // textarea

      //Movable
      physicalConditionType: "", // all e natural
      physicalConditionOtherType: "", // all e natural
      generalCondition: "", // only natural

      selectedCategory: "",
      selectedHeritage: "",
    };
  },

  created() {
    this.selectedCategory = this.$store.state.services.selectedCategory;
    this.selectedHeritage = this.$store.state.services.selectedHeritage;

    this.status = this.$store.state.services.status;
    this.statusDes = this.$store.state.services.statusDes;
    this.statusRemarks = this.$store.state.services.statusRemarks;
    this.integrity = this.$store.state.services.integrity;
    this.integrityRemarks = this.$store.state.services.integrityRemarks;
    this.constraints = this.$store.state.services.constraints;
    this.conservation = this.$store.state.services.conservation;
    this.physicalConditionType = this.$store.state.services.physicalConditionType;
    this.physicalConditionOtherType = this.$store.state.services.physicalConditionOtherType;
    this.generalCondition = this.$store.state.services.generalCondition;
  },
};
</script>
