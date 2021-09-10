<template>
  <div class="signup-form">
    <v-container :class="$vuetify.breakpoint.xs ? 'px-4' : 'px-16'">
      <v-row>
        <v-col cols="12">
          <v-form ref="form" @submit.prevent="submit" v-model="isValid">
            <v-text-field
              prepend-inner-icon="mdi-email-outline"
              label="Email"
              v-model="email"
              :rules="[rules.required, rules.email]"
              class="sharp"
              outlined
            ></v-text-field>

            <v-text-field
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword1 = !showPassword1"
              :type="showPassword1 ? 'text' : 'password'"
              label="Password"
              v-model="password"
              :rules="[rules.required, rules.min]"
              class="sharp"
              outlined
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword2 = !showPassword2"
              :type="showPassword2 ? 'text' : 'password'"
              label="Confirm Password"
              v-model="confirmPassword"
              :rules="[rules.required, rules.match]"
              class="sharp"
              outlined
            ></v-text-field>
            <div class="d-flex">
              <!-- <v-spacer></v-spacer> -->
              <v-btn
                :disabled="!isValid"
                type="submit"
                block
                depressed
                x-large
                class="primary sharp"
                >Signup <v-icon right>mdi-account-plus-outline</v-icon></v-btn
              >
            </div>
          </v-form>
          <p class="text-center mt-4">
            Already have an account?
            <router-link :to="{ name: 'auth.login' }"
              ><span class="secondary--text">Log In</span></router-link
            >
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay
      :value="isLoading"
      absolute
      align="center"
      justify="center"
      color="primary lighten-4"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="white"
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
      isValid: true,
      password: "",
      confirmPassword: "",
      errors: [],
      success: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        match: (value) => value === this.password || "Password Mismatch",
        email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
      showPassword1: false,
      showPassword2: false,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      signup: "user/signup",
      login: "user/login",
      showToast: "ui/showToast",
    }),
    async submit() {
      this.isLoading = true;
      this.$refs.form.validate();

      const { data, error, message } = await this.signup({
        email: this.email,
        password: this.password,
      });
      // console.log({ data, error, message });
      if (!error) {
        data.password = this.password;
        this.$emit("signupSuccess", { data, error, message });
      } else {
        console.log({ error, message });
        this.$emit("signupFailed", { data, error, message });
      }
      this.isLoading = false;
    },
  },
};
</script>

<style>
</style>