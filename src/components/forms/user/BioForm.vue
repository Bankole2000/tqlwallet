<template>
  <div class="bio-form">
    <v-form ref="form" @submit.prevent="submit" v-model="isValid">
      <v-row>
        <v-col cols="12">
          <v-text-field
            class="sharp"
            label="First Name"
            prepend-inner-icon="mdi-account-outline"
            outlined
            type="text"
            :rules="[rules.required]"
            v-model="firstname"
          ></v-text-field>
          <v-text-field
            class="sharp"
            outlined
            type="text"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-account-outline"
            label="Last Name"
            v-model="lastname"
          ></v-text-field>
          <v-select
            :prepend-inner-icon="
              genderIcons[gender] ? genderIcons[gender] : genderIcons['else']
            "
            :items="genderOptions"
            v-model="gender"
            :rules="[rules.required]"
            label="Gender"
            outlined
          ></v-select>

          <v-divider></v-divider>
          <div style="display: flex" class="pt-4">
            <v-btn
              large
              text
              class="sharp"
              color="primary"
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
      genderOptions: ["Male", "Female", "Prefer not to say"],
      genderIcons: {
        Male: "mdi-gender-male",
        Female: "mdi-gender-female",
        else: "mdi-gender-transgender",
      },
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      isValid: false,
    };
  },
  computed: {
    firstname: {
      get() {
        return this.$store.state.user.user.firstname;
      },
      set(value) {
        this.setUserField({ field: "firstname", value });
      },
    },
    lastname: {
      get() {
        return this.$store.state.user.user.lastname;
      },
      set(value) {
        this.setUserField({ field: "lastname", value });
      },
    },
    gender: {
      get() {
        return this.$store.state.user.user.gender;
      },
      set(value) {
        this.setUserField({ field: "gender", value });
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
        const { firstname, lastname, gender } = this;
        this.$emit("next", { firstname, lastname, gender });
      } else {
        console.log("Form is Invalid");
      }
    },
  },
};
</script>

<style>
</style>