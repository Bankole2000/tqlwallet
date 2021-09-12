<template>
  <div class="activity-card">
    <v-hover v-slot:default="{ hover }">
      <v-card
        style="transition: all 0.3s ease"
        tile
        class="pl-4 pr-2 pt-2 pb-0"
        :elevation="hover ? 4 : 1"
      >
        <v-card-title style="display: flex" class="pb-0">
          <h2>
            {{ user.balance | formatNumber }}
            <!-- <small class="font-weight-light"
              >(12%<v-icon class="pb-1">mdi-arrow-up-thick</v-icon>)</small
            > -->
          </h2>
          <v-spacer></v-spacer>
          <!-- <v-btn large icon><v-icon>mdi-dots-vertical</v-icon></v-btn> -->
        </v-card-title>
        <h3 class="px-4">
          A/C Balance

          <small class="font-weight-light"
            >({{ trendPercentage }}%<v-icon
              class="pb-1 success--text"
              v-if="trendPercentage > 0"
              >mdi-arrow-up-thick</v-icon
            >
            <v-icon class="pb-1 error--text" v-else-if="trendPercentage < 0"
              >mdi-arrow-down-thick</v-icon
            >
            <v-icon class="pb-1 info--text" v-else>mdi-arrow-right-thick</v-icon
            >)</small
          >
        </h3>
        <v-card-text>
          <v-sparkline
            :value="graphValues"
            :gradient="gradient"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
          ></v-sparkline>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
export default {
  data() {
    return {
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: "top",
      gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false,
      txnRange: 14,
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      transactions: "transactions/transactions",
    }),
    graphValues() {
      // result = Array(7).fill(0);
      let result = [];
      if (this.transactions) {
        const txnAmounts = this.transactions.map((txn) => txn.amount).reverse();
        if (this.transactions.length > this.txnRange) {
          const recentTransactions = txnAmounts.slice(
            txnAmounts.length - this.txnRange
          );
          recentTransactions.forEach((amnt, i) => {
            if (i == 0) {
              result[i] = amnt;
            } else {
              result[i] = result[i - 1] + amnt;
            }
          });
          return result;
        } else {
          let newTxns = [];
          txnAmounts.forEach((amnt, i) => {
            if (i == 0) {
              newTxns[i] = amnt;
            } else {
              newTxns[i] = newTxns[i - 1] + amnt;
            }
          });
          result = [
            ...Array(this.txnRange - txnAmounts.length).fill(0),
            ...newTxns,
          ];
          return result;
        }
      }
      return Array(this.txnRange).fill(0);
    },
    trendPercentage() {
      if (this.graphValues.length) {
        let current, previous;
        current = this.graphValues[this.graphValues.length - 1];
        previous = this.graphValues[this.graphValues.length - 2];
        const difference = ((current - previous) / (previous || 1)) * 100;
        return Math.floor(difference);
      }
      return 0;
    },
  },
};
</script>

<style>
</style>