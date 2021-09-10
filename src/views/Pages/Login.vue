<template>
  <div class="login-page">
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
          <LoginForm @loginSuccess="loginSuccess" @loginFailed="loginFailed" />
          <p class="text-center mt-4">
            Don't have an account?
            <router-link :to="{ name: 'auth.signup' }"
              ><span class="secondary--text">Sign Up</span></router-link
            >
          </p>
        </v-card>
      </v-col>
    </div>
  </div>
</template>

<script>
import LoginForm from "../../components/forms/auth/LoginForm.vue";
import { mapActions } from "vuex";
export default {
  components: { LoginForm },
  methods: {
    ...mapActions({
      showToast: "ui/showToast",
    }),
    loginFailed(e) {
      this.showToast({
        show: true,
        message: e.message,
        sclass: "error",
        timeout: 3000,
      });
    },
    loginSuccess(e) {
      this.showToast({
        show: true,
        message: `${e.message}. Welcome back <strong class='accent--text'>${
          e.data.firstname ? e.data.firstname : ""
        }</strong>`,
        sclass: "success",
        timeout: 3000,
      });
      this.$router.push({ name: "account.dashboard" });
    },
  },
};
</script>

<style>
</style>