<template>
  <q-select
    :class="!this.$q.screen.lt.md ? 'GL__toolbar-select' : 'ellipsis'"
    v-model="text"
    ref="search"
    label="Search heritages"
    standout="bg-green text-white"
    input-class="text-white"
    dense
    use-input
    hide-dropdown-icon
    :use-chips="!$q.screen.lt.md"
    :clearable="$q.screen.lt.md"
    :loading="loading"
    :stack-label="false"
    :options="filteredOptions"
    :style="
      this.$q.screen.lt.md ? 'width: 65%' : 'width: 350px; margin-left: 25px'
    "
    :behavior="$q.screen.lt.md ? 'dialog' : 'menu'"
    @filter="filter"
    @input="input"
    @input-value="setModel"
  >
    <template v-slot:prepend>
      <q-icon name="search" :color="$q.screen.lt.md ? 'white' : ''" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section>
          <span
            v-show="!loadData && result"
            class="text-grey text-center text-overline"
            >No results found:
            <span class="text-weight-bold">"{{ result }}"</span></span
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
        @click.stop="
          locateMap(scope.opt.lat, scope.opt.lng, scope.opt.heritageName)
        "
      >
        <q-item-section side>
          <q-icon name="location_on" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-white" v-html="scope.opt.heritageName" />
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
            @click.stop="viewHeritage(scope.opt.id)"
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
import { db, auth } from "../../Firestore/firebaseInit";

export default {
  name: "SearchBar",

  data() {
    return {
      text: null,
      result: null,
      options: null,
      loadData: true,
      loading: false,
      filteredOptions: [],
      position: "",
    };
  },

  created() {
    this.getPosition();
    this.getHeritages();
  },

  computed: {
    showPopup: {
      get() {
        return this.$store.state.admin.showPopup;
      },
      set(val) {
        this.$store.dispatch("admin/showPopup", val);
      },
    },

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
        return this.$store.state.admin.lat;
      },
      set(val) {
        this.$store.dispatch("admin/lat", val);
      },
    },

    lng: {
      get() {
        return this.$store.state.admin.lng;
      },
      set(val) {
        this.$store.dispatch("admin/lng", val);
      },
    },
  },

  methods: {
    setModel(val) {
      this.result = val;
    },

    input(val) {
      if (val == null) {
        this.text = null;
        // this.lat = 7.84841737647579;
        // this.lng = 124.24949096679689;
        // this.zoom = 10;
        // this.showPopup = false;
        let mapObject = this.$store.state.admin.mapObject;
        mapObject.flyTo(L.latLng(7.84841737647579, 124.24949096679689), 10);
        mapObject.on("zoomend", () => {});
      } else {
        this.text = val.heritageName;
      }
    },

    getHeritages() {
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

              // this.$refs.search.filter("");
              this.loadData = false;
            });
          },
          (err) => {}
        );
    },

    getPosition() {
      var user = auth.currentUser;
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.position = doc.data().position;
          });
      }
    },

    locateMap(lat, lng, name) {
      if (lat == "" && lng == "") {
        this.$q.notify({
          type: "warning",
          message: "No available coordinates.",
          position: "bottom-left",
        });
        return;
      } else {
        // this.lat = lat;
        // this.lng = lng;
        // this.showPopup = true;
        let mapObject = this.$store.state.admin.mapObject;
        mapObject.flyTo(L.latLng(lat, lng), 18);
        mapObject.on("zoomend", () => {
          // this.onLoading = false;
        });
      }
    },

    viewHeritage(hid) {
      this.$router.push(`/mh/view-details/${hid}`);
    },

    filter(val, update, abort) {
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
              id: op.id,
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
      color: white !important
    .q-field__after
      display: none
</style>
