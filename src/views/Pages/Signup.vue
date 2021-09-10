<template>
  <div class="signup-page">
    <div style="display: flex; width: 100vw; height: 100vh">
      <v-col cols="0" md="7" class="pa-0 ma-0 d-none d-md-flex flex-column">
        <v-card
          style="
            height: 100vh;
            display: flex;
            flex-direction: column
            align-items: center;
            justify-content: center;
          "
          dark
          img="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
          tile
        >
          <h1 class="display-4 font-weight-bold mb-4 text-center">App Name</h1>
          <h1 class="display-2 font-weight-thin mb-16 text-center">
            Some cool summary or catch phrase
          </h1>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" class="pa-0 ma-0">
        <v-card
          style="
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          "
          class="ma-0 pa-0"
          elevation="0"
          tile
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            "
            class="mb-8"
            @click="$router.push({ name: 'pages.home' })"
          >
            <img
              :src="require('@/assets/img/logo.png')"
              width="50"
              height="50"
              :aspect-ratio="1"
              class="ml-2 pl-0"
            />
            <h1 class="mx-4">Wallet App</h1>
          </div>
          <SignupForm
            @signupSuccess="signupSuccess"
            @signupFailed="signupFailed"
          />
        </v-card>
      </v-col>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SignupForm from "@/components/forms/auth/SignupForm.vue";
export default {
  components: { SignupForm },
  methods: {
    ...mapActions({
      login: "user/login",
      showGlobalLoader: "ui/showGlobalLoader",
      showToast: "ui/showToast",
    }),
    signupFailed(e) {
      this.showToast({
        show: true,
        message: e.error,
        sclass: "error",
        timeout: 3000,
      });
    },
    async signupSuccess(e) {
      this.showToast({
        show: true,
        message: `${e.message}. Welcome ${
          e.data.firstname ? e.data.firstname : ""
        }`,
        sclass: "success",
        timeout: 3000,
      });
      this.showGlobalLoader({ show: true, message: "Logging You in" });
      const { error, message } = await this.login({
        email: e.data.email,
        password: e.data.password,
        rememberMe: true,
      });
      if (!error) {
        this.$router.push({ name: "account.dashboard" });
      } else {
        this.showToast({
          show: true,
          message: message,
          sclass: "error",
          timeout: 3000,
        });
      }
      this.showGlobalLoader({ show: false, message: "" });
    },
  },
};
</script>

<style>
</style>