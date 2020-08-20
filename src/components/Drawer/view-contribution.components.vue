<template>
  <q-card
    class="q-pa-none no-shadow relative-position text-black"
    style="height: 200px"
  >
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-show="showSimulatedReturnData">
        <q-card-section class="row items-center q-pa-sm">
          <q-space />
          <q-btn
            @click="viewMyContribution = false"
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>

        <q-card-section>
          <div class="row no-wrap justify-center">
            <div class="column items-center">
              <q-avatar size="72px">
                <img :src="photoURL" />
              </q-avatar>

              <div class="q-my-sm text-center">
                <q-item-label class="text-subtitle1 text-weight-medium">{{
                  fullname
                }}</q-item-label>
                <q-item-label class="text-overline text-grey-7">{{
                  email
                }}</q-item-label>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-none">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            no-caps
          >
            <q-tab name="mails" label="My Contribution" />
            <q-tab name="alarms" label="Under Review" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="mails">
              <div class="text-h6">Mails</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </div>
    </transition>

    <q-inner-loading :showing="visible">
      <q-spinner-oval size="3em" color="red" />
    </q-inner-loading>
  </q-card>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";

export default {
  name: "ViewContribution",

  data() {
    return {
      tab: "mails",

      visible: false,
      showSimulatedReturnData: false,
      
      fullname: null,
      email: null,
      photoURL: null
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.getCurrentUser(user);
      }
    });
  },

  mounted() {
    this.visible = true;
    this.showSimulatedReturnData = false;
    setTimeout(() => {
      this.visible = false;
      this.showSimulatedReturnData = true;
    }, 2000);
  },

  computed: {
    viewMyContribution: {
      get() {
        return this.$store.state.siteNav.viewMyContribution;
      },

      set(val) {
        this.$store.commit("siteNav/viewMyContribution", val);
      }
    }
  },

 
};
</script>

<style lang="css" scoped></style>
