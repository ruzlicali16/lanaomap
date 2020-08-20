<template>
  <q-card
    bordered
    :class="
      this.$q.platform.is.mobile
        ? 'q-mt-lg q-mx-sm'
        : 'q-ml-auto q-mr-auto q-mt-lg'
    "
    style="max-width: 700px;"
  >
    <q-card-section class="text-center">
      <q-icon
        name="info"
        :size="this.$q.platform.is.mobile ? 'md' : 'lg'"
        color="deep-orange-5"
        class="float-left"
      />
      <span
        class="text-grey-9"
        :class="this.$q.platform.is.mobile ? 'text-h6' : 'text-h4'"
        style="font-family: ubuntu"
        >Profile Information</span
      >
    </q-card-section>
    <q-card-section class="text-center">
      <q-avatar size="100px">
        <img v-if="picture != null" :src="picture" />
        <img
          v-else
          @click="updateDialog = true"
          src="../../assets/NoAvailablePhoto.png"
          style="cursor: pointer"
        />
      </q-avatar>

      <q-btn
        color="primary"
        icon="add_a_photo"
        class="absolute"
        style="top: 0; transform: translateY(300%);"
        :style="this.$q.platform.is.mobile ? 'right: 140px' : 'right: 300px'"
        size="sm"
        title="Update picture"
        round
        @click="updateDialog = true"
      />

      <q-dialog persistent v-model="updateDialog" position="top">
        <q-card
          square
          class="q-mt-lg"
          :class="this.$q.platform.is.mobile ? 'q-mx-md' : ''"
          style=""
        >
          <q-bar class="bg-green text-white">
            <span class="text-subtitle1">Change Picture</span>
            <q-space />
            <q-btn
              dense
              flat
              icon="close"
              v-close-popup
              @click="onCloseFileChanged"
            />
          </q-bar>
          <q-linear-progress
            v-if="indeterminate"
            :indeterminate="indeterminate"
            color="red"
          />

          <q-card-section class="q-pt-none q-gutter-y-md q-mt-md">
            <div>
              <q-input dense filled type="file" @change="onFileChanged" />
            </div>
            <div class="shadow-5" v-if="url">
              <q-img
                style="width: 400px; max-height: 300px; max-width: 100%;"
                :src="url"
              ></q-img>
            </div>
          </q-card-section>
          <q-separator color="grey-5" inset />
          <q-card-actions align="between">
            <q-btn
              flat
              dense
              color="primary"
              label="Cancle"
              no-caps
              v-close-popup
              @click="onCloseFileChanged"
            />
            <q-btn
              v-if="this.selectedFile != null"
              :disable="disable"
              dense
              color="primary"
              label="Update Picture"
              @click="uploadPhoto"
              no-caps
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card-section>
    <q-card-section class="full-width q-gutter-y-md">
      <q-field dense outlined stack-label label="Position" color="blue">
        <template v-slot:control>
          <div
            v-if="position == ''"
            class="self-center full-width no-outline"
            tabindex="0"
          >
            No position assigned
          </div>
          <div v-else class="self-center full-width no-outline" tabindex="0">
            {{ position }}
          </div>
        </template>
      </q-field>
      <q-field dense outlined stack-label label="Location" color="blue">
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            Municipality Of {{ location }}
          </div>
        </template>
      </q-field>
      <q-input
        v-model="firstname"
        dense
        outlined
        stack-label
        label="First Name"
        color="blue"
      />
      <q-input
        v-model="lastname"
        dense
        outlined
        stack-label
        label="Last Name"
        color="blue"
      />
      <q-input
        v-model="birthday"
        dense
        outlined
        mask="date"
        stack-label
        label="Birthday"
        color="blue"
        placeholder="YYYY-MM-DD"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="birthday"
                @input="() => $refs.qDateProxy.hide()"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-btn
        class="full-width text-overline"
        color="blue"
        label="Save Changes"
        :loading="loading"
        :percentage="percentage"
        :disable="disable"
        dense
        no-caps
        @click="save"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "../../Firestore/firebaseInit";

export default {
  name: "EditProfilePage",

  data() {
    return {
      firstname: null,
      lastname: null,
      birthday: null,
      location: null,
      position: null,

      fullname: null,
      selectedFile: null,
      picture: null,
      uploadValue: null,
      url: null,

      updateDialog: false,
      disable: false,
      loading: false,
      indeterminate: false,
      percentage: 0,
    };
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getCurrentUser(user);
      }
    });
  },

  methods: {
    getCurrentUser(user) {
      if (user) {
        db.collection("profiles")
          .doc(user.uid)
          .onSnapshot(
            (doc) => {
              this.firstname = doc.data().firstname;
              this.lastname = doc.data().lastname;
              this.birthday = doc.data().birthday;
              this.location = doc.data().location;
              this.position = doc.data().position;

              this.fullname = this.firstname + " " + this.lastname;
              this.picture = doc.data().profilepicture;
            },
            (err) => {
              console.log(err.message);
            }
          );
      }
    },

    onCloseFileChanged() {
      this.selectedFile = null;
      this.url = null;
    },

    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      this.url = URL.createObjectURL(this.selectedFile);
    },

    uploadPhoto() {
      var user = firebase.auth().currentUser;

      const storageRef = firebase
        .storage()
        .ref(`profilepic/${this.selectedFile.name}`)
        .put(this.selectedFile);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.disable = true;
          this.indeterminate = true;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          storageRef.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              db.collection("profiles")
                .doc(user.uid)
                .update({
                  profilepicture: url,
                })
                .then(() => {
                  this.indeterminate = false;

                  this.indeterminate = false;
                  this.updateDialog = false;
                  this.disable = false;

                  this.$q.notify({
                    type: "positive",
                    message: `Updated profile picture successfully`,
                    position: "bottom-left",
                  });
                  this.selectedFile = null;
                });
            })
            .catch((error) => {
              this.indeterminate = false;
              this.indeterminate = false;
              this.updateDialog = false;
              this.disable = false;

              this.$q.notify({
                type: "negative",
                message: error.message,
                position: "bottom-left",
              });
              this.selectedFile = null;
            });
        }
      );
    },

    updateUserProfile() {
      var user = firebase.auth().currentUser;
      console.log(
        this.firstname +
          " " +
          this.lastname +
          " " +
          this.birthday +
          " " +
          this.location
      );
      db.collection("profiles")
        .doc(user.uid)
        .update({
          firstname: this.firstname,
          lastname: this.lastname,
          birthday: this.birthday,
          location: this.location,
        })
        .then(() => {
          this.loading = false;
          this.disable = false;
          this.$q.notify({
            type: "positive",
            message: `Updated personal information successfully`,
            position: "bottom-left",
          });
        })
        .catch((error) => {
          this.loading = false;
          this.disable = false;
          this.$q.notify({
            type: "negative",
            message: error.message,
            position: "bottom-left",
          });
        });
    },

    save() {
      this.disable = true;
      this.loading = true;
      this.percentage = 0;
      this.interval = setInterval(() => {
        this.percentage += Math.floor(Math.random() * 8 + 10);
        if (this.percentage >= 100) {
          clearInterval(this.interval);
          this.updateUserProfile();
        }
      }, 700);
    },
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
