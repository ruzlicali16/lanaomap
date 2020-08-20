<template>
  <q-dialog
    v-model="successDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Persistent</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Click/Tap on the backdrop.
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" @click="addDialog = true" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "CategoryDialog",

  data() {
    return {};
  },

  computed: {
    successDialog: {
      get() {
        return this.$store.state.siteNav.successDialog;
      },
      set(val) {
        this.$store.dispatch("siteNav/successDialog", val);
      }
    },

    addDialog: {
      get() {
        return this.$store.state.siteNav.addDialog;
      },
      set(val) {
        this.$store.dispatch("siteNav/addDialog", val);
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
