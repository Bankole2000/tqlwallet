<template>
  <div class="transaction-form">
    <v-form ref="form" v-model="isValid" @submit.prevent="submit">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              v-model.number="amount"
              outlined
              class="sharp"
              type="number"
              label="Amount"
              :rules="[rules.amountMin, rules.amountMax]"
              prepend-inner-icon="mdi-cash"
              prefix="N"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              v-model="description"
              outlined
              :rules="[rules.required]"
              prepend-inner-icon="mdi-pencil"
              class="sharp"
              label="Description"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <div
              class="d-flex"
              :class="{ 'flex-column': $vuetify.breakpoint.xs }"
              style="align-items: center"
            >
              <p
                :class="{ 'pb-4': $vuetify.breakpoint.xs }"
                class="mb-0 title text-capitalize font-weight-light"
              >
                {{ txnType }} - {{ amount | formatNumber }}
              </p>
              <v-spacer></v-spacer>
              <v-btn
                type="submit"
                :disabled="!isValid"
                x-large
                class="sharp primary white--text"
                >Confirm &nbsp;<span>{{ txnType }}</span>
                <v-icon right>mdi-chevron-double-right</v-icon></v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["txnType"],
  data() {
    return {
      amount: 0,
      description: "",
      rules: {
        required: (value) => !!value || "Required.",
        amountMin: (v) => v > 0 || "Amount must be greater than zero (0)",
        amountMax: (v) =>
          v < 10000000 || "Transaction limit is 10000000 (N10m)",
      },
      isValid: false,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      showGlobalLoader: "ui/showGlobalLoader",
      showToast: "ui/showToast",
      makeTransaction: "user/makeTransaction",
      getTransactions: "transactions/getUserTransactions",
    }),
    async submit() {
      this.showGlobalLoader({ show: true, message: `Making ${this.txnType}` });
      this.$refs.form.validate();
      let { amount, description } = this;
      if (this.txnType !== "deposit") {
        amount *= -1;
      }
      const { data, error, message } = await this.makeTransaction({
        amount,
        description,
      });
      console.log({ data, error, message });
      if (!error) {
        this.$emit("txnSuccess", { data, error, message });
        this.showToast({
          show: true,
          message,
          sclass: "success",
          timeout: 3000,
        });
        this.$refs.form.reset();
      } else {
        this.$emit("txnFailed", { data, error, message });
        this.showToast({
          show: true,
          message: error,
          sclass: "error",
          timeout: 3000,
        });
        this.showGlobalLoader({ show: false, message: "" });
      }
    },
  },
};
</script>

<style>
</style>