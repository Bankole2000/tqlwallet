<template>
  <div class="new-transaction">
    <v-tabs v-model="tab" centered fixed-tabs>
      <v-tabs-slider color="secondary"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat>
          <v-card-text class="black--text">
            <p class="headline mb-2 pl-4">
              Make a <span class="text-capitalize">{{ item }}</span
              >&nbsp;{{ item == "deposit" ? "into" : "from" }} your wallet
              account
            </p>
            <TransactionForm
              @txnSuccess="$emit('txnSuccess')"
              @txnFailed="$emit('txnFailed')"
              :txnType="item"
            />
            <!-- {{ item }} {{ tab }} -->
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import TransactionForm from "../forms/transactions/TransactionForm.vue";
export default {
  components: { TransactionForm },
  data() {
    return {
      tab: 0,
      items: ["deposit", "withdrawal"],
    };
  },
};
</script>

<style>
</style>