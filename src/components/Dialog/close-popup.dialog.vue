<template>
	<q-dialog
		v-model="closePopup"
		transition-show="scale"
		transition-hide="scale"
	>
		<q-card class="text-black" style="width: 300px">
			<q-card-section class="q-pt-md">
				Discard the changes you made?
			</q-card-section>

			<q-separator inset />

			<q-card-actions align="right" class="bg-white text-red text-caption">
				<q-btn flat label="Keep editing" v-close-popup no-caps />
				<q-btn unelevated filled color="red-5" label="Discard" @click="closeDialogPopup" no-caps />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	name: "CloseDialog",

	data() {
		return {};
	},

	computed: {
		closePopup: {
			get() {
				return this.$store.state.siteNav.closePopup;
			},
			set(val) {
				this.$store.commit("siteNav/closePopup", val);
			}
		},

		addCulturalHeritage: {
			get() {
				return this.$store.state.siteNav.addCulturalHeritage;
			},
			set(val) {
				this.$store.commit("siteNav/addCulturalHeritage", val);
			}
		},
	},

	methods: {
		closeDialogPopup() {
			this.addCulturalHeritage = false;
			this.closePopup = false;
		}
	}
};
</script>

<style lang="css" scoped></style>
