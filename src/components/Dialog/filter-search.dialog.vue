<template>
  <q-dialog persistent position="top" v-model="showFilterSearchSetting">
    <q-card class="q-pa-sm">
      <q-toolbar>
        <q-toolbar-title
          class="text-h6 text-weight-light row no-wrap items-center"
        >
          <q-avatar>
            <q-icon name="search" size="sm" />
          </q-avatar>
          <span class="text-weight-bold">Filter Settings</span>
        </q-toolbar-title>

        <q-btn
          flat
          round
          dense
          icon="expand_less"
          @click="showFilterSearchSetting = false"
        />
      </q-toolbar>

      <div class="q-gutter-sm q-pr-sm">
        <q-radio
          v-for="(option, index) in options"
          :key="index"
          keep-color
          v-model="value"
          :val="option.val"
          :label="option.label"
          :color="option.color"
        />
      </div>

      <div class="q-px-sm q-mt-sm">
        Search By: <strong>{{ value }}</strong>
      </div>

      <div class="row q-pt-md q-gutter-sm justify-end">
        <q-btn
          unelevated
          type="submit"
          color="green-8"
          label="Save preference"
          no-caps
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "FilterSearch",

  data() {
    return {
      value: "",
      options: [
        {
          val: "Heritage Name",
          label: "Heritage Name",
          color: "teal",
        },
        {
          val: "Heritage Type",
          label: "Heritage Type",
          color: "orange",
        },
        {
          val: "Categories",
          label: "Categories",
          color: "red",
        },
      ],
    };
  },

  computed: {
    showFilterSearchSetting: {
      get() {
        return this.$store.state.siteNav.showFilterSearchSetting;
      },
      set(val) {
        this.$store.dispatch("siteNav/showFilterSearchSetting", val);
      },
    },
  },

  methods: {
    clearPreference() {
      for (let i = 0; i < this.filters.length; i++) {
        this.filters[i].model = null;
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
