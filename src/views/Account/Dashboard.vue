<template>
  <div class="account-dashboard grey lighten-4">
    <v-container>
      <v-row>
        <v-col cols="12" class="my-6">
          <h1 class="display-1 mb-2">
            <span class="font-weight-light">Dashboard</span>
          </h1>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" class="py-0">
          <p class="text-h5 mb-2 font-weight-bold">
            <span class="font-weight-light">👋 Welcome</span>
            {{ user.firstname ? user.firstname : user.email }}
          </p>
        </v-col>
        <v-col cols="12">
          <v-card elevation="0" class="px-4" tile color="transparent">
            <v-row>
              <v-col cols="12" md="4" sm="6">
                <ActivityCard />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <TransactionsCard />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <BalanceCard />
              </v-col>
            </v-row>
            <v-overlay
              :opacity="0.3"
              absolute
              :value="!userIsVerified"
              class="text-center"
            >
              <v-alert prominent type="info" color="primary" class="sharp">
                <v-row align="center" justify="center">
                  <v-col
                    ><strong>Your account is Unverified!</strong
                    ><br v-if="!$vuetify.breakpoint.xs" />
                    {{
                      !$vuetify.breakpoint.xs
                        ? "Please complete your profile to verify your account."
                        : ""
                    }}</v-col
                  >
                  <v-col class="shrink">
                    <v-btn
                      class="sharp secondary"
                      @click="showDialog('onboarding', true)"
                      ><v-icon left>mdi-check-decagram</v-icon> Verify My
                      Account</v-btn
                    >
                  </v-col>
                </v-row>
              </v-alert>
              <!-- <p class="display-1 text-center">Account Unverified</p>
              <v-btn color="primary" class="sharp"> Verify My Account </v-btn> -->
            </v-overlay>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="my-8">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 4 : 1"
              tile
              style="transition: all 0.3s ease"
            >
              <v-card-title
                style="cursor: pointer"
                @click="isMakingTransaction = !isMakingTransaction"
                class="primary white--text py-2"
              >
                New Transaction
                <v-spacer></v-spacer>
                <v-btn
                  x-large
                  :color="isMakingTransaction ? 'white' : 'accent'"
                  icon
                  ><v-icon x-large
                    >mdi-menu-{{ isMakingTransaction ? "up" : "down" }}</v-icon
                  ></v-btn
                >
              </v-card-title>
              <v-divider></v-divider>
              <v-expand-transition>
                <v-card-text
                  v-show="isMakingTransaction"
                  class="pt-0"
                  :class="{ 'pa-0': $vuetify.breakpoint.xs }"
                >
                  <NewTransaction
                    @txnSuccess="refreshUserData"
                    @txnFailed="getActivity"
                  />
                </v-card-text>
              </v-expand-transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    <Onboarding ref="onboarding" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ActivityCard from "../../components/blocks/ActivityCard.vue";
import BalanceCard from "../../components/blocks/BalanceCard.vue";
import NewTransaction from "../../components/blocks/NewTransaction.vue";
import TransactionsCard from "../../components/blocks/TransactionsCard.vue";
import Onboarding from "../../components/modals/Onboarding.vue";
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
export default {
  components: {
    Onboarding,
    NewTransaction,
    ActivityCard,
    BalanceCard,
    TransactionsCard,
  },
  data() {
    return {
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: "top",
      gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false,
      isMakingTransaction: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      userIsVerified: "user/userIsVerified",
      activity: "user/activity",
    }),
  },
  methods: {
    ...mapActions({
      getTransactions: "transactions/getUserTransactions",
      getActivity: "user/getUserActivity",
      verifyToken: "user/verifyToken",
      showGlobalLoader: "ui/showGlobalLoader",
    }),
    showDialog(ref, value) {
      const dialog = this.$refs[ref];
      dialog.showDialog(value);
    },
    async refreshUserData() {
      this.showGlobalLoader({ show: true, message: "loading" });
      try {
        await this.verifyToken();
        await this.getTransactions();
        await this.getActivity();
      } catch (error) {
        console.log({ error });
      }
      this.showGlobalLoader({ show: false, message: "" });
    },
  },

  async mounted() {
    if (!this.userIsVerified) {
      this.showDialog("onboarding", true);
    } else {
      if (!this.activity) {
        await this.refreshUserData();
      }
    }
  },
};
</script>

<style>
</style>