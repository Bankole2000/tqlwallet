<template>
  <div class="bank-form">
    <v-form ref="form" @submit.prevent="submit" v-model="isValid">
      <v-row>
        <v-col cols="12">
          <v-text-field
            :dense="$vuetify.breakpoint.xs"
            :hide-details="$vuetify.breakpoint.xs"
            :class="{ 'my-4': $vuetify.breakpoint.xs }"
            class="sharp"
            label="Bank Name"
            prepend-inner-icon="mdi-bank"
            outlined
            type="text"
            :rules="[rules.required]"
            v-model="bank"
          ></v-text-field>
          <v-text-field
            :dense="$vuetify.breakpoint.xs"
            :hide-details="$vuetify.breakpoint.xs"
            :class="{ 'my-4': $vuetify.breakpoint.xs }"
            class="sharp"
            outlined
            type="text"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-pound"
            label="Account No"
            v-model="accountNo"
          ></v-text-field>
          <v-text-field
            :dense="$vuetify.breakpoint.xs"
            :hide-details="$vuetify.breakpoint.xs"
            :class="{ 'my-4': $vuetify.breakpoint.xs }"
            class="sharp"
            outlined
            type="text"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-lock-outline"
            label="BVN"
            v-model="bvn"
          ></v-text-field>
          <!-- <v-select
            :prepend-inner-icon="
              genderIcons[gender] ? genderIcons[gender] : genderIcons['else']
            "
            :items="genderOptions"
            v-model="gender"
            :rules="[rules.required]"
            label="Gender"
            outlined
          ></v-select> -->

          <v-divider></v-divider>
          <div style="display: flex" class="pt-4">
            <v-btn
              text
              large
              :loading="isLoading"
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
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      isValid: false,
      bvn: null,
      isLoading: false,
    };
  },
  computed: {
    bank: {
      get() {
        return this.$store.state.user.user.bank;
      },
      set(value) {
        this.setUserField({ field: "bank", value });
      },
    },
    accountNo: {
      get() {
        return this.$store.state.user.user.accountNo;
      },
      set(value) {
        this.setUserField({ field: "accountNo", value });
      },
    },
    // bvn: {
    //   get() {
    //     return this.$store.state.user.user.bvn;
    //   },
    //   set(value) {
    //     this.setUserField({ field: "bvn", value });
    //   },
    // },
  },
  methods: {
    ...mapActions({
      setUserField: "user/setUserField",
    }),
    submit() {
      this.isLoading = true;
      this.$refs.form.validate();
      if (this.isValid) {
        const { bank, accountNo, bvn } = this;
        this.$emit("next", { bank, accountNo, bvn });
      } else {
        console.log("Form is Invalid");
      }
      this.isLoading = false;
    },
  },
  mounted() {
    this.bvn = this.$store.state.user.user.bvn;
  },
};
</script>

<style>
</style>