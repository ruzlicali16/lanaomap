<template>
  <q-page class="q-pa-lg">
    <title>Cultural Heritages | Lanao Map</title>
    <q-card class="shadow-5" v-if="position == 'Municipal Admin'">
      <q-tabs
        v-model="tab"
        dense
        class="text-primary"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="list" label="Pending List" no-caps />
        <q-tab name="grid" label="Verified List" no-caps />
      </q-tabs>

      <q-separator />

      <q-tab-panels keep-alive v-model="tab">
        <q-tab-panel name="list" class="q-pa-none">
          <PendingHeritageListMA />
        </q-tab-panel>

        <q-tab-panel name="grid" class="q-pa-none">
          <VerifiedHeritageListMA />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-card v-else-if="position == 'Provincial Admin'" class="shadow-5">
      <TableListForPA />
    </q-card>
  </q-page>
</template>

<script>
const PendingHeritageListMA = () =>
  import("./Municipal Admin/list-pending-heritages.table");
const VerifiedHeritageListMA = () =>
  import("./Municipal Admin/list-verified-heritages.table");
const TableListForPA = () =>
  import("./Provincial Admin/list-table-heritages.table");

import { db, auth } from "../Firestore/firebaseInit";
export default {
  components: {
    PendingHeritageListMA,
    VerifiedHeritageListMA,
    TableListForPA,
  },

  data() {
    return {
      tab: "list",

      position: null,
    };
  },

  created() {
    this.culturalHeritages = true;

    var user = auth.currentUser;

    if (user) {
      db.collection("profiles")
        .doc(user.uid)
        .onSnapshot(
          (doc) => {
            this.position = doc.data().position;
          },
          (err) => {}
        );
    }
  },

  computed: {
    culturalHeritages: {
      get() {
        return this.$store.state.siteNav.culturalHeritages;
      },

      set(val) {
        this.$store.dispatch("siteNav/culturalHeritages", val);
      },
    },
  },
};
</script>

<style></style>
