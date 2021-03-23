<template>
  <q-page class="q-pb-lg">
    <title>Account | Lanao Map</title>
    <UpdatePersonalInfo />
    <UpdateEmail />
    <UpdatePasswrd />
  </q-page>
</template>

<script>
const UpdatePersonalInfo = () => import("./UpdateAccount/update-personal-info.card");
const UpdateEmail = () => import("./UpdateAccount/update-email.card");
const UpdatePasswrd = () => import("./UpdateAccount/update-password.card");

export default {
  components: {
    UpdatePersonalInfo,
    UpdateEmail,
    UpdatePasswrd,
  },

  created() {
    this.updateProfile = true;
  },

  computed: {
    updateProfile: {
      get() {
        return this.$store.state.siteNav.updateProfile;
      },

      set(val) {
        this.$store.dispatch("siteNav/updateProfile", val);
      },
    },
  },
};
</script>

<style scoped></style>
