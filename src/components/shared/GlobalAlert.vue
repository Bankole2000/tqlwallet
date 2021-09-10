<template>
  <v-snackbar
    rounded="lg"
    :value="globalAlert.show"
    :top="true"
    :multi-line="$vuetify.breakpoint.xs"
    class="px-4"
    color="primary"
    :centered="$vuetify.breakpoint.smAndDown"
    :timeout="-1"
    @click="handleClick"
  >
    <p
      @click="handleClick"
      class="mb-0"
      style="display: flex; align-items: center"
    >
      <span
        v-if="!$vuetify.breakpoint.xs"
        :class="`white--text text-capitalize font-weight-bold`"
        style="display: flex; align-items: center; margin-bottom: 2px"
        ><v-icon class="mr-2">{{
          globalAlert.icons[globalAlert.sclass]
        }}</v-icon>
        {{ globalAlert.sclass }}: &nbsp;</span
      ><span>{{ globalAlert.message }}</span>
      <!-- <span v-html="toast.message"></span> -->
    </p>

    <template v-slot:action="{ attrs }">
      <v-btn
        v-if="globalAlert.action"
        dark
        :icon="$vuetify.breakpoint.xs"
        class="text-capitalize white--text"
        v-bind="attrs"
        color="secondary"
        :to="{ name: globalAlert.link }"
      >
        <span v-if="!$vuetify.breakpoint.xs">
          {{ globalAlert.action }}
        </span>
        <v-icon v-if="$vuetify.breakpoint.xs">{{
          globalAlert.icons[globalAlert.sclass]
        }}</v-icon>
      </v-btn>
      <!-- v-if="globalAlert.closable" -->
      <v-btn
        @click="hideAlert"
        icon
        dark
        class="text-capitalize white--text"
        v-bind="attrs"
        color="error"
      >
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      globalAlert: "ui/globalAlert",
    }),
  },
  methods: {
    ...mapActions({
      showGlobalAlert: "ui/showGlobalAlert",
    }),
    hideAlert() {
      this.showGlobalAlert({ show: false });
    },
    handleClick() {
      // console.log({ e, globalAlert: this.globalAlert });
      if (this.globalAlert.action) {
        this.$router.push({ name: this.globalAlert.link });
      }
    },
  },
};
</script>

<style>
</style>