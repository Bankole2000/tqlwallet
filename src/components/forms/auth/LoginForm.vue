<template>
  <div class="login-form">
    <v-container :class="$vuetify.breakpoint.smAndUp ? 'px-16' : 'px-4'">
      <v-row>
        <v-col cols="12">
          <v-form ref="form" @submit.prevent="submit">
            <v-text-field
              prepend-inner-icon="mdi-email-outline"
              label="Email"
              v-model="email"
              class="sharp"
              outlined
            ></v-text-field>

            <v-text-field
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              hide-details
              v-model="password"
              class="sharp"
              outlined
            ></v-text-field>
            <v-checkbox
              v-model="rememberMe"
              :label="`Remember me on this device`"
            ></v-checkbox>
            <div class="d-flex">
              <!-- <v-spacer></v-spacer> -->
              <v-btn type="submit" block depressed x-large class="primary sharp"
                >Login <v-icon right>mdi-chevron-right-box</v-icon></v-btn
              >
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      errors: [],
      success: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      showPassword: false,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      login: "user/login",
      showToast: "ui/showToast",
    }),
    async submit() {
      this.isLoading = true;
      const { data, error, message } = await this.login({
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      });
      // console.log({ e, data, error, message });
      if (!error) {
        this.$emit("loginSuccess", { data, error, message });
      } else {
        this.$emit("loginFailed", { data, error, message });
      }
      this.isLoading = false;
    },
  },
};
</script>

<style>
</style>