<template>
  <div class="location-form">
    <v-form ref="form" @submit.prevent="submit" v-model="isValid">
      <v-row>
        <v-col cols="12" class="py-0" md="6">
          <v-text-field
            class="sharp"
            label="Country"
            prepend-inner-icon="mdi-flag"
            outlined
            type="text"
            :rules="[rules.required]"
            v-model="country"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0" md="6">
          <v-text-field
            class="sharp"
            outlined
            type="text"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-flag-outline"
            label="State"
            v-model="state"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0" md="6">
          <v-text-field
            class="sharp"
            outlined
            type="text"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-city"
            label="City"
            v-model="city"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0" md="6">
          <v-text-field
            class="sharp"
            outlined
            type="text"
            prepend-inner-icon="mdi-map-marker-circle"
            label="Zip Code (optional)"
            v-model="zipCode"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            class="sharp"
            outlined
            type="text"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-map-marker"
            label="Address"
            v-model="address"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-divider></v-divider>
          <div style="display: flex" class="pt-4">
            <v-btn
              large
              class="sharp"
              color="primary"
              text
              @click="$emit('back')"
              ><v-icon left>mdi-chevron-double-left</v-icon>Back</v-btn
            >
            <v-spacer></v-spacer>

            <v-btn large class="sharp primary" @click="submit"
              >Next <v-icon right>mdi-chevron-double-right</v-icon></v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      isValid: false,
    };
  },
  computed: {
    country: {
      get() {
        return this.$store.state.user.user.country;
      },
      set(value) {
        this.setUserField({ field: "country", value });
      },
    },
    state: {
      get() {
        return this.$store.state.user.user.state;
      },
      set(value) {
        this.setUserField({ field: "state", value });
      },
    },
    city: {
      get() {
        return this.$store.state.user.user.city;
      },
      set(value) {
        this.setUserField({ field: "city", value });
      },
    },
    zipCode: {
      get() {
        return this.$store.state.user.user.zipCode;
      },
      set(value) {
        this.setUserField({ field: "zipCode", value });
      },
    },
    address: {
      get() {
        return this.$store.state.user.user.address;
      },
      set(value) {
        this.setUserField({ field: "address", value });
      },
    },
  },
  methods: {
    ...mapActions({
      setUserField: "user/setUserField",
    }),
    submit() {
      this.$refs.form.validate();
      if (this.isValid) {
        const { country, state, city, zipCode, address } = this;
        this.$emit("next", { country, state, city, zipCode, address });
      } else {
        console.log("Form is Invalid");
      }
    },
  },
};
</script>

<style>
</style>