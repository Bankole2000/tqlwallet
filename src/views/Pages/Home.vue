<template>
  <div class="home-page">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card color="transparent" elevation="0">
            <h1
              style="line-height: 130%"
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'mt-16 display-3'
                  : 'mt-0 display-2 px-4'
              "
              class="mb-8 font-weight-black"
            >
              Catchy phrase about app.
            </h1>
            <p
              class="text-h6"
              :class="{ 'px-4': $vuetify.breakpoint.smAndDown }"
            >
              Some Text descriping what the app does. Lorem, ipsum dolor sit
              amet consectetur adipisicing elit.
            </p>
            <v-btn
              class="my-8 secondary sharp white--text text-capitalize"
              depressed
              :class="{ 'ml-4': $vuetify.breakpoint.smAndDown }"
              x-large
              :to="{ name: 'account.dashboard' }"
              >Get Started <v-icon right>mdi-chevron-right</v-icon></v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      verifyToken: "user/verifyToken",
    }),
  },
  async mounted() {
    const { error } = await this.verifyToken();
    if (!error) {
      this.$router.push({ name: "account.dashboard" });
    }
  },
};
</script>

<style>
</style>