<template>
  <q-card
    bordered
    :class="
      this.$q.screen.lt.md ? 'q-mt-xl q-mx-sm' : 'q-ml-auto q-mr-auto q-mt-lg'
    "
    style="max-width: 700px;"
  >
    <q-card-section class="text-center">
      <q-icon
        name="lock"
        :size="this.$q.screen.lt.md ? 'md' : 'lg'"
        color="red-5"
        class="float-left"
      />
      <span
        class="text-grey-9"
        :class="this.$q.screen.lt.md ? 'text-h6' : 'text-h4'"
        >Change Password</span
      >
    </q-card-section>
    <q-card-section class="full-width q-gutter-y-md">
      <q-input
        v-model="currentPassword"
        hide-bottom-space
        dense
        outlined
        stack-label
        label="Current Password"
        color="blue"
        type="password"
      >
      </q-input>

      <q-input
        v-model="newpassword"
        hide-bottom-space
        dense
        outlined
        stack-label
        hide-hint
        label="New Password"
        color="blue"
        type="password"
        hint="Password must have atleast 6 characters"
      >
      </q-input>

      <q-input
        v-model="confirmpassword"
        hide-bottom-space
        dense
        outlined
        stack-label
        label="Confirm New Password"
        color="blue"
        type="password"
      >
      </q-input>

      <q-btn
        class="full-width text-overline"
        color="blue"
        label="Change Password"
        :loading="loading"
        :disable="disable"
        dense
        no-caps
        @click="save"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { db, auth, fbase } from "../../Firestore/firebaseInit";

export default {
  name: "EditProfilePage",

  data() {
    return {
      currentPassword: null,
      newpassword: null,
      confirmpassword: null,

      shownew: true,
      disable: false,
      loading: false,
    };
  },

  methods: {
    updatepassword() {
      var user = auth.currentUser;
      var credential = fbase.auth.EmailAuthProvider.credential(
        user.email,
        this.currentPassword
      );

      if (this.newpassword == this.confirmpassword) {
        user
          .reauthenticateWithCredential(credential)
          .then(() => {
            user
              .updatePassword(this.newpassword)
              .then(() => {
                this.loading = false;
                this.disable = false;
                this.currentPassword = "";
                this.newpassword = "";
                this.confirmpassword = "";
                this.$q.notify({
                  type: "positive",
                  message: `Password successfully updated.`,
                  position: "bottom-left",
                });
                db.collection("profiles")
                  .doc(user.uid)
                  .get()
                  .then((doc) => {
                    var docid = doc.id;
                    var userid = user.uid;
                    var updatePassword = doc.data().updatePassword;
                    if (docid == userid) {
                      if (updatePassword == false) {
                        return db
                          .collection("profiles")
                          .doc(user.uid)
                          .update({
                            updatePassword: true,
                          });
                      }
                    }
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
          })
          .catch((error) => {
            this.loading = false;
            this.disable = false;
            this.$q.notify({
              type: "negative",
              message: `The current password is invalid. Please try again.`,
              position: "bottom-left",
            });
          });
      } else {
        this.loading = false;
        this.disable = false;
        this.newpassword = "";
        this.confirmpassword = "";
        this.$q.notify({
          type: "warning",
          message: `Password must match!`,
          caption: `new password and confirm password must match the same input.`,
          position: "bottom-left",
        });
      }
    },

    save() {
      this.disable = true;
      this.loading = true;
      this.updatepassword();
    },
  },
};
</script>

<style></style>
