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
            {{ activity ? activity.length : 0 }}
            <!-- <small class="font-weight-light"
              >(12%<v-icon class="pb-1">mdi-arrow-up-thick</v-icon>)</small
            > -->
          </h2>
          <v-spacer></v-spacer>
          <!-- <v-btn large icon><v-icon>mdi-dots-vertical</v-icon></v-btn> -->
        </v-card-title>
        <h3 class="px-4">
          Activities
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
      dayRange: 7,
    };
  },
  computed: {
    ...mapGetters({
      activity: "user/activity",
    }),
    graphValues() {
      let result = [];
      if (this.activity && this.activity.length) {
        const startDate = Date.now() - this.dayRange * 86400000;

        const dateObj = {};
        const dayRange = this.dayRange;
        for (let i = 0; i <= dayRange; i++) {
          let actDate = this.setDates(startDate, i);
          dateObj[actDate] = [];
        }

        this.activity.forEach((act) => {
          let actDate = this.getDateOnly(act.timestamp);
          console.log(actDate);
          if (actDate in dateObj) {
            dateObj[actDate].push(act);
          }
        });
        Object.keys(dateObj).forEach((date, i) => {
          result[i] = dateObj[date].length;
        });
        return result;
      }
      return Array(7).fill(0);
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
  methods: {
    setDates(date, offset) {
      let newDate = new Date(Date.parse(new Date(date)) + offset * 86400000);
      return `${newDate.getFullYear()}-${
        newDate.getMonth() + 1
      }-${newDate.getDate()}`;
    },
    getDateOnly(dateLike) {
      let newDate = new Date(dateLike);
      return `${newDate.getFullYear()}-${
        newDate.getMonth() + 1
      }-${newDate.getDate()}`;
    },
  },
};
</script>

<style>
</style>