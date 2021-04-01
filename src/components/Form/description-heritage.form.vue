<template>
  <q-card :style="loading ? 'height: 250px;' : ''">
    <q-spinner
      v-show="loading"
      class="absolute-center"
      color="green"
      size="3em"
    />
    <q-form v-show="!loading">
      <q-card-section>
        <p class="q-pb-md q-pa-none q-ma-none text-h5 text-weight-regular">
          II. Description, Stories and Significance
        </p>
        <div v-if="selectedCategory != 'Art'" class="main-first">
          <p
            v-if="selectedCategory != 'Natural'"
            class="q-pl-md q-pb-lg text-subtitle1 text-green"
          >
            A. Description
          </p>
          <p v-else class="q-pl-md q-pb-lg text-subtitle1 text-green">
            A. Description of the Object
          </p>
          <div v-if="selectedHeritage == 'Immovable'" class="col q-gutter-y-lg">
            <q-input
              class="q-mt-none"
              label="Physical Description"
              hint="Describe the physical features –  exterior, interior,  landscape surrounding the structure"
              v-model="physicalDescription"
              filled
              type="textarea"
              color="green"
            />
            <q-input
              label="History of the Structure"
              hint="Write the history of construction, use/function of the building over the years, history of intervention"
              v-model="historyStructure"
              filled
              type="textarea"
              color="green"
            />
            <p class="q-pl-md text-subtitle1 text-teal">
              B. Stories
            </p>
            <q-input
              class="q-mt-none"
              hint="Write the stories associated with the structure"
              v-model="stories"
              filled
              type="textarea"
              color="green"
            />
            <p class="q-pl-md text-subtitle1 text-teal">
              C. Significance
            </p>
            <q-input
              class="q-mt-none q-mb-md"
              hint="Indicate type of significance, e.g. historical, aesthetic, economic, social, political, spiritual and then explain"
              v-model="significance"
              filled
              type="textarea"
              color="green"
            />
          </div>
          <div
            v-else-if="selectedHeritage == 'Movable'"
            class="col q-gutter-y-lg"
          >
            <div
              v-if="selectedCategory == 'Natural'"
              class="q-mt-none row q-gutter-x-md"
            >
              <div class="col">
                <q-input
                  outlined
                  dense
                  v-model="rawMaterial"
                  label="Raw Material"
                  color="green"
                />
              </div>
              <div class="col-2">
                <q-input
                  outlined
                  dense
                  v-model="sizeDimension"
                  type="number"
                  label="Size/Dimensions"
                  color="green"
                />
              </div>
              <div class="col">
                <q-input
                  outlined
                  dense
                  v-model="surface"
                  label="Surface Decoration"
                  color="green"
                />
              </div>
              <div class="col">
                <q-input
                  outlined
                  dense
                  v-model="storage"
                  label="Storage Method"
                  color="green"
                />
              </div>
              <div class="col">
                <q-input
                  outlined
                  dense
                  v-model="original"
                  label="Original Habitat (if applicable)"
                  color="green"
                />
              </div>
            </div>
            <div v-if="selectedCategory != 'Natural'">
              <q-input
                v-if="selectedCategory != 'Archival'"
                class="q-mt-none"
                label="Description of the Object"
                hint="(Describe the  Material, Dimensions, Color, Markings, Design, Use, etc.)"
                v-model="description"
                filled
                type="textarea"
                color="green"
              />
              <div
                v-if="selectedCategory == 'Archival'"
                class="q-mt-none row q-gutter-x-md"
              >
                <div class="col-3">
                  <q-select
                    dense
                    v-model="descMaterial"
                    :options="descOption"
                    label="Description of Material"
                    color="green"
                    filled
                  >
                    <template v-if="descMaterial" v-slot:append>
                      <q-icon
                        name="clear"
                        @click.stop="descMaterial = ''"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-select>
                </div>
                <div class="col">
                  <q-input
                    dense
                    v-model="descRemarks"
                    label="Remarks: "
                    color="green"
                  />
                </div>
              </div>
            </div>
            <p class="q-pl-md text-subtitle1 text-teal">
              B. Stories
            </p>
            <q-input
              class="q-mt-none"
              label="Stories of the Object"
              :hint="inputHintStoryControl"
              v-model="stories"
              filled
              type="textarea"
              color="green"
            />
            <p class="q-pl-md text-subtitle1 text-teal">
              C. Significance
            </p>
            <q-input
              class="q-mt-none"
              label="Primary Criteria"
              hint="Indicate type of significance, e.g. historical, aesthetic, economic, social, political, spiritual and then explain"
              v-model="primaryCriteria"
              filled
              type="textarea"
              color="green"
            />
            <q-input
              bottom-slots
              label="Comparative Criteria"
              hint="Indicate Provenance, Representativeness, Rarity, Interpretive Potential"
              v-model="comparativeCriteria"
              filled
              type="textarea"
              color="green"
            />
          </div>
        </div>
        <div v-if="selectedCategory == 'Art'" class="main-second">
          <!-- Art -->
          <p class="q-pl-md q-py-xs text-subtitle1 text-green">
            A. Medium/Material
          </p>
          <q-input
            label="Write the Medium or Material of the Object"
            hint="(e.g. oil or acrylic on canvas, watercolor or charcoal on paper, fiber cast, mixed media etc. refer to certificate of authenticity, if available)"
            v-model="mediumMaterial"
            filled
            autogrow
            type="textarea"
            color="green"
          />
          <p class="q-pl-md q-pt-sm text-subtitle1 text-accent">
            B. Dimensions
          </p>
          <div class="row q-gutter-x-md q-pb-sm">
            <div class="col">
              <q-input
                outlined
                dense
                v-model="height"
                type="number"
                label="Height (Centimeters)"
                color="green"
              />
            </div>
            <div class="col">
              <q-input
                outlined
                dense
                v-model="width"
                type="number"
                label="Length (Centimeters)"
                color="green"
              />
            </div>
            <div class="col">
              <q-input
                outlined
                dense
                v-model="length"
                type="number"
                label="Width (Centimeters)"
                color="green"
              />
            </div>
            <div class="col">
              <q-input
                outlined
                dense
                v-model="diameter"
                type="number"
                label="Dimensions (Centimeters)"
                color="green"
              />
            </div>
          </div>
          <p class="q-pl-md q-py-xs text-subtitle1 text-amber">
            C. Edition from Original
          </p>
          <q-input
            class="q-mt-none"
            hint="(if series; usually found near signature, e.g. 1/10 means it is the first of ten pieces)"
            v-model="edition"
            filled
            type="textarea"
            label="Write something here"
            color="green"
            autogrow
          />
          <p class="q-pl-md q-py-xs q-pt-sm text-subtitle1 text-teal">
            D. Subject
          </p>
          <q-input
            class="q-mt-none"
            hint="(e.g. portrait, seascape, cityscape, landscape, nude etc.)"
            v-model="subject"
            filled
            type="textarea"
            label="Write something here"
            color="green"
            autogrow
          />
          <p class="q-pl-md q-py-xs q-pt-sm text-subtitle1 text-pink">
            F. Provenance
          </p>
          <q-input
            class="q-mt-none"
            v-model="provenance"
            filled
            type="textarea"
            label="Write something here"
            color="green"
            autogrow
          />
          <p class="q-pl-md q-py-xs q-pt-sm text-subtitle1 text-blue">
            G. Stories
          </p>
          <q-input
            class="q-mt-none"
            hint="Write the stories associated with the structure"
            v-model="stories"
            filled
            type="textarea"
            label="Stories of the Object"
            color="green"
          />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import { db, auth } from "../../Firestore/firebaseInit";

export default {
  name: "description",

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

      selectedHeritage: "",
      selectedCategory: "",

      descOption: [
        // arcival
        "Mounted",
        "Lining",
        "Seals",
        "Previous repairs",
        "Fasteners",
        "Ribbons",
        "Tapes",
      ],

      loading: false,
      hid: "",
    };
  },

  created() {
    this.hid = this.$route.params.heritage_id;
    if (this.hid != undefined) {
      this.getData();
    }
    this.selectedHeritage = this.$store.state.services.selectedValue2;
    this.selectedCategory = this.$store.state.services.selectedCategory;
  },

  updated() {
    this.setInputs;
  },

  computed: {
    inputHintStoryControl() {
      if (
        this.selectedCategory == "Archae" ||
        this.selectedCategory == "Archival"
      ) {
        return "Write the stories/narratives/beliefs/practices associated with the Object";
      } else {
        return "Write the stories associated with the structure";
      }
    },

    setInputs() {
      this.$store.state.services.physicalDescription = this.physicalDescription;
      this.$store.state.services.historyStructure = this.historyStructure;
      this.$store.state.services.stories = this.stories;
      this.$store.state.services.significance = this.significance;
      this.$store.state.services.description = this.description;
      this.$store.state.services.primaryCriteria = this.primaryCriteria;
      this.$store.state.services.comparativeCriteria = this.comparativeCriteria;
      this.$store.state.services.mediumMaterial = this.mediumMaterial;
      this.$store.state.services.height = this.height;
      this.$store.state.services.width = this.width;
      this.$store.state.services.length = this.length;
      this.$store.state.services.diameter = this.diameter;
      this.$store.state.services.edition = this.edition;
      this.$store.state.services.subject = this.subject;
      this.$store.state.services.provenance = this.provenance;
      this.$store.state.services.descMaterial = this.descMaterial;
      this.$store.state.services.descRemarks = this.descRemarks;
      this.$store.state.services.rawMaterial = this.rawMaterial;
      this.$store.state.services.sizeDimension = this.sizeDimension;
      this.$store.state.services.surface = this.surface;
      this.$store.state.services.storage = this.storage;
      this.$store.state.services.original = this.original;
    },
  },

  methods: {
    getData() {
      this.description = this.$store.state.services.description;
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
  },
};
</script>
