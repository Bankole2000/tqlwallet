<template>
  <div class="onboarding-modal">
    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      max-width="600"
      persistent
      scrollable
    >
      <v-card tile :min-height="$vuetify.breakpoint.smAndDown ? '100vh' : 500">
        <v-card-title class="white--text headline primary px-8 py-3">
          Profile Wizard
          <v-spacer></v-spacer>
          <v-btn icon color="error" @click="dialog = false"
            ><v-icon>mdi-window-close</v-icon></v-btn
          >
        </v-card-title>
        <v-window touchless v-model="profileMachine.value">
          <v-window-item :value="1">
            <v-card-text class="px-8 pt-8 text-center">
              <p class="font-weight-black black--text display-1">
                Welcome to the Wallet App
              </p>
              <v-img
                :src="require('@/assets/img/welcome.svg')"
                width="320"
                class="mx-auto"
              ></v-img>
              <p
                class="headline mt-6"
                :class="$vuetify.breakpoint.xs ? 'px-0' : 'px-16'"
              >
                Complete your profile to Verify your Account.
              </p>
              <v-divider></v-divider>
              <div style="display: flex" class="pt-4">
                <v-spacer></v-spacer>

                <v-btn
                  large
                  class="sharp primary"
                  @click="updateProfile($event, 'start')"
                  >Get Started
                  <v-icon right>mdi-chevron-double-right</v-icon></v-btn
                >
              </div>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text class="px-8 py-4 text-center">
              <p class="font-weight-black black--text display-1">
                Update Bio Data
              </p>
              <v-img
                :src="require('@/assets/img/bio.svg')"
                :width="$vuetify.breakpoint.xs ? '200' : '300'"
                class="mx-auto mb-4"
              ></v-img>
              <BioForm
                @next="updateProfile($event, 'updateBio')"
                @back="updateProfile($event, 'goBack')"
              />
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text class="px-8 pt-4 pb-8 text-center">
              <p class="font-weight-black black--text display-1">
                Update Location
              </p>
              <v-img
                :src="require('@/assets/img/location.svg')"
                :width="$vuetify.breakpoint.xs ? '50' : '180'"
                :aspect-ratio="1"
                :height="$vuetify.breakpoint.xs ? '50' : '180'"
                class="mx-auto mb-8"
              ></v-img>
              <LocationForm
                @next="updateProfile($event, 'updateLocation')"
                @back="updateProfile($event, 'goBack')"
              />
            </v-card-text>
          </v-window-item>
          <v-window-item :value="4">
            <v-card-text class="px-8 py-4 text-center">
              <p class="font-weight-black black--text display-1">
                Update Bank Details
              </p>
              <v-img
                :src="require('@/assets/img/bank.svg')"
                :width="$vuetify.breakpoint.xs ? '100' : '300'"
                class="mx-auto mb-8"
              ></v-img>
              <BankForm
                @next="updateProfile($event, 'updateBankDetails')"
                @back="updateProfile($event, 'goBack')"
              />
            </v-card-text>
          </v-window-item>
          <v-window-item :value="5">
            <v-card-text class="px-8 py-4 text-center">
              <p class="font-weight-black black--text display-1">
                💯🥳🎉Verified!
              </p>
              <v-img
                :src="require('@/assets/img/verified.svg')"
                width="320"
                class="mx-auto"
              ></v-img>
              <p
                class="headline mt-6"
                :class="$vuetify.breakpoint.xs ? 'px-0' : 'px-16'"
              >
                Awesome! Your Profile is complete and your account verified.
              </p>
              <v-divider></v-divider>
              <div style="display: flex" class="pr-0 pt-4">
                <v-btn
                  large
                  text
                  class="sharp"
                  color="primary"
                  @click="updateProfile($event, 'goBack')"
                >
                  <v-icon left>mdi-chevron-double-left</v-icon> Back</v-btn
                >
                <v-spacer></v-spacer>

                <v-btn large class="sharp secondary" @click="dialog = false"
                  >Done <v-icon right>mdi-chevron-double-right</v-icon></v-btn
                >
              </div>
            </v-card-text>
          </v-window-item>
        </v-window>
        <v-overlay
          :value="isLoading"
          absolute
          align="center"
          justify="center"
          color="primary"
        >
          <v-progress-circular
            :size="70"
            :width="7"
            color="secondary"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BankForm from "../forms/user/BankForm.vue";
import BioForm from "../forms/user/BioForm.vue";
import LocationForm from "../forms/user/LocationForm.vue";
import profileMachine from "../../utils/stateMachines/profile";
import { mapActions } from "vuex";
export default {
  components: {
    BioForm,
    LocationForm,
    BankForm,
  },
  data() {
    return {
      dialog: false,
      step: 0,
      profileMachine,
      isLoading: false,
    };
  },
  watch: {
    dialog(value) {
      if (value) {
        const savedState = localStorage.getItem("tqlWalletAppUserState");
        if (savedState) {
          profileMachine.setState(savedState);
        } else {
          profileMachine.setState("SIGNEDUP");
        }
      } else {
        this.getActivity();
      }
    },
  },
  methods: {
    ...mapActions({
      showToast: "ui/showToast",
      showGlobalLoader: "ui/showGlobalLoader",
      getActivity: "user/getUserActivity",
    }),
    showDialog(value) {
      this.dialog = value;
    },
    startProfileUpdate() {
      profileMachine.dispatch("start");
    },
    async updateProfile(e, action) {
      this.isLoading = true;
      console.log({ e, action });
      console.log({ profileMachine });
      await profileMachine.dispatch(action, e).then(() => {
        this.isLoading = false;
      });
    },
  },
  created() {
    const savedState = localStorage.getItem("tqlWalletAppUserState");
    if (savedState) {
      profileMachine.setState(savedState);
    } else {
      profileMachine.setState("SIGNEDUP");
    }
  },
};
</script>

<style>
</style>