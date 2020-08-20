<template>
  <q-card :style="loading ? 'height: 250px;' : ''">
    <q-spinner
      v-show="loading"
      class="absolute-center"
      color="blue"
      size="3em"
    />
    <q-form v-show="!loading">
      <q-card-section>
        <p class="q-pb-md q-pa-none q-ma-none text-h5 text-weight-regular">
          III. Conservation
        </p>
        <p
          v-if="selectedCategory != 'Natural'"
          class="q-pl-md text-subtitle1 text-green"
        >
          A. Status/Condition of Structure
        </p>
        <p v-else class="q-pl-md text-subtitle1 text-green">
          A. General Condition
        </p>
        <div v-if="selectedHeritage == 'Immovable'" class="main-immovable">
          <div
            class="q-gutter-x-md"
            :class="this.$q.platform.is.mobile ? '' : 'row'"
          >
            <div class="col-3">
              <q-select
                dense
                v-model="status"
                :options="statusOption"
                label="Status / Condition of Structure"
                filled
              >
                <template v-if="status" v-slot:append>
                  <q-icon
                    name="clear"
                    @click.stop="status = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-select>
            </div>
            <div class="col">
              <q-input dense v-model="statusRemarks" label="Remarks: " />
            </div>
          </div>
          <q-input
            class="q-mt-md"
            hint="Describe the physical condition of the structure"
            v-model="statusDes"
            filled
            type="textarea"
          />
          <p class="q-pl-md q-pt-md text-subtitle1 text-teal">
            B. Integrity of the Structure
          </p>
          <div
            class="q-gutter-x-md"
            :class="this.$q.platform.is.mobile ? '' : 'row'"
          >
            <div class="col-3 ">
              <q-select
                dense
                v-model="integrity"
                :options="integrityOption"
                label="Select Integrity"
                filled
              >
                <template v-if="integrity" v-slot:append>
                  <q-icon
                    name="clear"
                    @click.stop="integrity = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-select>
            </div>
            <div class="col">
              <q-input dense v-model="integrityRemarks" label="Remarks: " />
            </div>
          </div>
        </div>
        <div v-else class="main-movable">
          <q-input
            v-if="selectedCategory == 'Natural'"
            class="q-mt-none q-mb-md"
            hint="Write the General Condition"
            v-model="generalCondition"
            filled
            type="textarea"
          />
          <div
            v-if="selectedCategory != 'Natural'"
            class="q-gutter-md"
            :class="this.$q.platform.is.mobile ? '' : 'row'"
          >
            <div class="col" :class="showInputIfOther ? 'row col-auto' : ''">
              <q-select
                outlined
                dense
                use-input
                v-model="physicalConditionType"
                :options="physicalOption"
                label="Physical Condition"
                @filter="filterFn"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field is required',
                ]"
              >
                <template v-if="physicalConditionType" v-slot:append>
                  <q-icon
                    name="clear"
                    @click.stop="physicalConditionType = ''"
                    class="cursor-pointer"
                  />
                </template>

                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col" :hidden="!showInputIfOther">
              <q-input
                dense
                v-model="physicalConditionOtherType"
                placeholder="Please specify the other type"
                label="Type: Other"
                stack-label
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field is required',
                ]"
              />
            </div>
            <div class="col">
              <q-input
                dense
                v-model="statusRemarks"
                label="Remarks: "
                hide-bottom-space
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field is required',
                ]"
              />
            </div>
          </div>
        </div>
        <p
          v-if="selectedHeritage == 'Immovable'"
          class="q-pl-md q-pt-md text-subtitle1 text-orange"
        >
          C. Constraints/Threat/Issue
        </p>
        <p v-else class="q-pl-md text-subtitle1 text-orange">
          C. Threat/Issue/Challenges
        </p>
        <q-input
          class="q-mt-none"
          hint="Write the constraints, threats or issues of the structure"
          v-model="constraints"
          filled
          type="textarea"
        />
        <p class="q-pl-md q-pt-md text-subtitle1 text-accent">
          D. Conservation Measures
        </p>
        <q-input
          class="q-mt-none q-mb-md"
          hint="Describe the conservation measures taken at the level of the community, provincial and/or national"
          v-model="conservation"
          filled
          type="textarea"
        />
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";

export default {
  name: "conservation",

  data() {
    return {
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

      selectedHeritage: "",
      selectedCategory: "",

      showInputIfOther: false,
      loading: false,

      physicalOption: [],
      statusOption: ["In good condition", "Deteriorated", "Ruins"],
      integrityOption: ["Altered", "Unaltered", "Moved", "Original Site"],
      hid: "",
    };
  },

  created() {
    this.hid = this.$route.params.heritage_id;
    if (this.hid != undefined) {
      this.getDataById();
    } else {
      this.selectedHeritage = this.$store.state.services.selectedValue2;
      this.selectedCategory = this.$store.state.services.selectedCategory;
      console.log(this.selectedHeritage, this.selectedCategory);
    }
  },

  updated() {
    this.setInputs;
    if (this.physicalConditionType == "Other") {
      this.showInputIfOther = true;
      this.$store.state.services.physicalConditionType = this.$store.state.services.physicalConditionOtherType;
    } else {
      this.showInputIfOther = false;
      this.physicalConditionOtherType = "";
    }
  },

  computed: {
    setInputs() {
      this.$store.state.services.status = this.status;
      this.$store.state.services.statusDes = this.statusDes;
      this.$store.state.services.statusRemarks = this.statusRemarks;
      this.$store.state.services.integrity = this.integrity;
      this.$store.state.services.integrityRemarks = this.integrityRemarks;
      this.$store.state.services.constraints = this.constraints;
      this.$store.state.services.conservation = this.conservation;
      //
      this.$store.state.services.physicalConditionType = this.physicalConditionType;
      this.$store.state.services.physicalConditionOtherType = this.physicalConditionOtherType;
      this.$store.state.services.generalCondition = this.generalCondition;
    },
  },

  methods: {
    getDataById() {
      this.loading = true;
      db.collection("heritages")
        .doc(this.hid)
        .get()
        .then((doc) => {
          console.log("conservation",  doc.data().statusRemarks);
          console.log(doc.data().selectedCategory, doc.data().heritageType);
          this.status = doc.data().status;
          this.statusRemarks = doc.data().statusRemarks;
          this.statusDes = doc.data().statusDes;
          this.integrity = doc.data().integrity;
          this.integrityRemarks = doc.data().integrityRemarks;
          this.constraints = doc.data().constraints;
          this.conservation = doc.data().conservation;

          // Movable
          this.physicalConditionType = doc.data().physicalConditionType;
          this.physicalConditionOtherType = doc.data().physicalConditionOtherType;
          this.generalCondition = doc.data().generalCondition;

          this.selectedCategory = doc.data().selectedCategory;
          this.selectedHeritage = doc.data().heritageType;

          this.loading = false;
        });
    },

    filterFn(val, update) {
      this.physicalOption = [];
      var selectedCategory = this.$store.state.services.selectedCategory;

      const conservationOption = this.$store.state.services.conservationOption;

      if (val === "") {
        update(() => {
          this.physicalOption = conservationOption;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.physicalOption = conservationOption.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
};
</script>
