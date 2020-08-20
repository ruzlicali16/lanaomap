<template>
  <q-select
    :class="!this.$q.platform.is.mobile ? 'GL__toolbar-select' : ''"
    v-model="text"
    ref="search"
    label="Search Lanao Maps"
    standout="bg-white text-blue-8"
    input-class="text-black"
    color="black"
    dense
    use-input
    hide-selected
    hide-dropdown-icon
    :loading="loading"
    :stack-label="false"
    :options="filteredOptions"
    :style="
      this.$q.platform.is.mobile
        ? 'width: 180px'
        : 'width: 350px; margin-left: 25px'
    "
    :behavior="this.$q.platform.is.mobile ? 'dialog' : 'menu'"
    @filter="filter"
  >
    <template v-slot:prepend>
      <q-icon name="search" color="" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section>
          <span v-show="!loadData" class="text-grey text-center text-overline"
            >No results found:
            <span class="text-weight-bold">"{{ text }}"</span></span
          >
          <div v-show="loadData" class="text-center">
            <q-spinner-pie color="grey-5" size="24px" />
          </div>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
        class="GL__select-GL__menu-link"
        @click.stop="locateMap(scope.opt.lat, scope.opt.lng)"
      >
        <q-item-section side>
          <q-icon name="location_on" />
        </q-item-section>
        <q-item-section>
          <q-item-label v-html="scope.opt.heritageName" />
          <q-item-label caption v-html="scope.opt.heritageType" />
          <q-item-label caption v-html="scope.opt.categories" />
        </q-item-section>

        <q-item-section side :class="{ 'default-type': !scope.opt.type }">
          <q-btn
            v-if="position != ''"
            outline
            dense
            no-caps
            text-color="blue-grey-5"
            size="12px"
            class="bg-grey-1 q-px-sm"
            @click.stop="viewHeritage(scope.opt.uid)"
          >
            {{ scope.opt.type || "View Heritage" }}
            <q-icon class="q-px-sm" name="visibility" size="14px" />
          </q-btn>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";

export default {
  name: "SearchBar",

  data() {
    return {
      text: [],
      options: null,
      loadData: true,
      loading: false,
      filteredOptions: [],
      position: "",
    };
  },

  created() {
    this.getPosition();
  },

  computed: {
    zoom: {
      get() {
        return this.$store.state.admin.zoom;
      },
      set(val) {
        this.$store.dispatch("admin/zoom", val);
      },
    },

    lat: {
      get() {
        // console.log("search1");
        return this.$store.state.admin.lat;
      },
      set(val) {
        // console.log("set lat - 3", val);

        this.$store.dispatch("admin/lat", val);
      },
    },

    lng: {
      get() {
        // console.log("search2");
        return this.$store.state.admin.lng;
      },
      set(val) {
        // console.log("set lng - 4", val);
        this.$store.dispatch("admin/lng", val);
      },
    },
  },

  methods: {
    getPosition() {
      var user = firebase.auth().currentUser;
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.position = doc.data().position;
          });
      }
    },

    locateMap(lat, lng) {
      if (lat == "" && lng == "") {
        this.$q.notify({
          type: "warning",
          message: "No available coordinates.",
          position: "bottom-left",
        });
        return;
      } else {
        this.lat = lat;
        this.lng = lng;
      }
    },

    viewHeritage(hid) {
      this.$router.push(`/mh/view-details/${hid}`);
    },

    filter(val, update, abort) {
      this.text = val;

      if (this.options === null) {
        db.collection("heritages")
          .where("verified", "==", true)
          .onSnapshot(
            (snapshot) => {
              this.filteredOptions = [];
              snapshot.forEach((doc) => {
                const data = {
                  id: doc.id,
                  name: doc.data().name,
                  categories: doc.data().categories,
                  heritageType: doc.data().heritageType,
                  lat: doc.data().lat,
                  lng: doc.data().lng,
                };

                this.filteredOptions.push(data);
                this.options = this.filteredOptions;

                this.$refs.search.filter("");
                this.loadData = false;
              });
            },
            (err) => {
              // console.log(err.message);
            }
          );
        update();
        return;
      }

      if (val.length < 1) {
        abort();
        return;
      }

      update(() => {
        this.filteredOptions = [
          ...this.options
            .filter(
              (op) =>
                op.name.toLowerCase().includes(val.toLowerCase()) ||
                op.categories.toLowerCase().includes(val.toLowerCase()) ||
                op.heritageType.toLowerCase().includes(val.toLowerCase())
            )
            .map((op) => ({
              uid: op.id,
              heritageName: op.name,
              categories: op.categories,
              heritageType: op.heritageType,
              lat: op.lat,
              lng: op.lng,
            })),
        ];
      });
    },
  },
};
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden
    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible
  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7
  &__menu-link:hover
    background: #0366d6
    color: blue
  &__menu-link-signed-in
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__menu-link-status
    color: blue-grey-6
    &:hover
      color: light-blue-9
  &__toolbar-select.q-field--focused
    width: 65% !important
    .q-field__prepend
      color: blue !important
    .q-field__after
      display: none
</style>
