<template>
  <div class="navbar">
    <v-app-bar
      color="transparent"
      app
      elevate-on-scroll
      height="90"
      class="pa-0 ma-0"
    >
      <div
        style="
          position: relative;
          display: flex;
          ailgn-items: center;

          width: 100%;
          height: 90px;
        "
        class="pa-0"
      >
        <div
          style="
            position: absolute;
            left: 0;
            background-color: rgba(255, 255, 255, 0.5);
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 1;
            backdrop-filter: blur(5px);
          "
          class="py-10"
        ></div>
        <v-container style="z-index: 2">
          <v-row align="center" style="height: 90px" class="py-4">
            <v-app-bar-nav-icon
              class="ml-4"
              @click="togglePageNav(true)"
              v-if="!$vuetify.breakpoint.mdAndUp"
            ></v-app-bar-nav-icon>
            <v-toolbar-title
              style="display: flex; cursor: pointer"
              @click="$router.push({ name: 'pages.home' })"
            >
              <v-img
                :src="require('@/assets/img/logo.png')"
                width="40"
                height="40"
                :aspect-ratio="1"
                class="ml-2 pl-2"
              ></v-img>
              <h2 class="mx-4">Wallet App</h2>
            </v-toolbar-title>
            <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
            <div
              v-if="$vuetify.breakpoint.mdAndUp"
              style="display: flex; align-items: center"
            >
              <v-btn
                v-if="user"
                large
                text
                active-class="primary"
                :to="{ name: 'account.dashboard' }"
                class="sharp font-weight-bold mx-1 text-capitalize"
                ><v-icon left>mdi-view-dashboard</v-icon> Dashbaord</v-btn
              >
              <v-btn
                v-if="user"
                large
                text
                active-class="primary white--text"
                :to="{ name: 'account.transactions' }"
                class="sharp font-weight-bold mx-1 text-capitalize"
                ><v-icon left>mdi-history</v-icon> Activity</v-btn
              >
              <v-btn
                v-if="user"
                large
                text
                active-class="primary"
                :to="{ name: 'account.statement' }"
                class="sharp font-weight-bold mx-1 text-capitalize"
                ><v-icon left>mdi-receipt</v-icon> Statement</v-btn
              >
              <v-btn
                v-if="user"
                @click="showDialog('onboarding', true)"
                color="secondary"
                text
                class="sharp white--text my-4 text-capitalize"
                depressed
                large
              >
                <v-icon left>mdi-account-check-outline</v-icon>
                profile</v-btn
              >
              <v-btn
                v-if="user"
                large
                text
                @click="logout"
                color="accent"
                class="sharp font-weight-bold mx-1 text-capitalize"
                ><v-icon left>mdi-logout-variant</v-icon> Logout</v-btn
              >
              <v-btn
                v-if="!user"
                large
                text
                :to="{ name: 'auth.login' }"
                color="primary"
                class="sharp font-weight-bold mx-1 text-capitalize"
                >Login</v-btn
              >
              <v-btn
                v-if="!user"
                large
                depressed
                :to="{ name: 'auth.signup' }"
                class="
                  mx-2
                  font-weight-bold
                  sharp
                  bg-secondary-lt
                  secondary--text
                  lighten-3
                  text-capitalize
                "
                >Sign Up</v-btn
              >
            </div>
          </v-row>
        </v-container>
      </div>
      <Onboarding ref="onboarding" />
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Onboarding from "../modals/Onboarding.vue";
export default {
  components: { Onboarding },
  computed: {
    ...mapGetters({
      user: "user/user",
    }),
  },
  methods: {
    ...mapActions({
      userLogout: "user/logout",
      showToast: "ui/showToast",
      togglePageNav: "ui/togglePageNav",
    }),
    async logout() {
      this.$router.push({ name: "pages.home" });
      await this.userLogout();
      this.showToast({
        show: true,
        message: "Logged Out",
        sclass: "info",
        timeout: 3000,
      });
    },
    showDialog(ref, value) {
      const dialog = this.$refs[ref];
      dialog.showDialog(value);
    },
  },
  // mounted() {
  //   console.log(this.user);
  // },
};
</script>

<style>
.v-toolbar__content {
  padding: 0px !important;
}
</style>