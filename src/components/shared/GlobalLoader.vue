<template>
  <div class="global-loader">
    <v-dialog
      overlay-color="primary lighten-4"
      v-model="loader.show"
      persistent
      width="300"
    >
      <v-card :color="loader.color" dark style="border-radius: 15px">
        <v-card-text>
          <div class="d-flex">
            <p class="pt-2 mb-0">{{ loader.message }}</p>
            <v-spacer></v-spacer>
            <!-- <v-btn icon text @click="showLoader({ show: false })"
              ><v-icon>mdi-close</v-icon></v-btn
            > -->
          </div>
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      loader: "ui/loader",
    }),
  },
  methods: {
    ...mapActions({
      showLoader: "ui/showGlobalLoader",
    }),
  },
};
</script>

<style>
</style>