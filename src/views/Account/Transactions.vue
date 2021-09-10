<template>
  <div class="account-statement grey lighten-4">
    <v-container>
      <v-row>
        <v-col cols="12" class="my-6">
          <h1 class="display-1 mb-2">
            <!-- {{ user.firstname ? user.firstname : user.email }}'s -->
            <span class="font-weight-light">Activity</span>
          </h1>
          <v-divider></v-divider>
        </v-col>

        <v-col cols="12" class="py-0">
          <p class="text-h5 mb-2 font-weight-light">
            View Your Account Activity
          </p>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-datetime-picker
            :textFieldProps="textFieldProps"
            label="From (Date/time)"
            v-model="from"
          >
            <template v-slot:dateIcon>
              <v-icon>mdi-calendar</v-icon>
            </template>
            <template v-slot:timeIcon>
              <v-icon>mdi-clock-outline</v-icon>
            </template>
          </v-datetime-picker>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-datetime-picker
            :textFieldProps="textFieldProps"
            label="To (Date/time)"
            v-model="to"
          >
            <template v-slot:dateIcon>
              <v-icon>mdi-calendar</v-icon>
            </template>
            <template v-slot:timeIcon>
              <v-icon>mdi-clock-outline</v-icon>
            </template>
          </v-datetime-picker>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-btn
            @click="filterActivities"
            block
            :disabled="!from"
            class="primary sharp text-capitalize"
            x-large
            ><v-icon left>mdi-filter-variant</v-icon>Filter by time</v-btn
          >
        </v-col>

        <v-col cols="12">
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="(event, i) in activity"
              :key="i"
              :color="event.error ? colors['error'] : colors[event.model]"
              small
              fill-dot
              :icon="event.error ? icons['error'] : icons[event.model]"
            >
              <v-row class="pt-1" v-if="event.model == 'user'">
                <v-col cols="12" sm="3" class="pt-2">
                  <v-chip class="white--text ml-0" color="primary" label small>
                    USER
                  </v-chip>

                  <span class="mx-2">/ {{ event.type }}</span>
                  <div class="caption grey--text text--lighten-1">
                    Event Type
                    <!-- Event Id: "a07ffdf8-297f-4585-b62d-0827f33f4e8c" -->
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  :class="{ 'py-1': $vuetify.breakpoint.xs }"
                >
                  <strong>{{ event.name }}</strong>
                  <div class="caption grey--text text--lighten-1">Activity</div>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  :class="{ 'py-1': $vuetify.breakpoint.xs }"
                >
                  <strong>{{ event.timestamp | dateTime }}</strong>
                  <div class="caption grey--text text--lighten-1">Time</div>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  :class="{ 'py-1': $vuetify.breakpoint.xs }"
                >
                  <EventDetailsModal :event="event" />
                </v-col>
              </v-row>
              <v-row v-else-if="event.model == 'transaction'" class="pt-1">
                <v-col cols="12" sm="3" class="pt-2">
                  <v-chip
                    class="white--text ml-0"
                    :color="event.error ? colors['error'] : colors[event.model]"
                    label
                    small
                  >
                    TRANSACTION
                  </v-chip>

                  <span class="mx-2">/ {{ event.type }}</span>
                  <div class="caption grey--text text--lighten-1">
                    Event type
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  :class="{ 'py-1': $vuetify.breakpoint.xs }"
                >
                  <strong class="text-capitalize" v-if="event.type != 'create'"
                    >{{ event.data.type }} {{ event.name }}</strong
                  >
                  <strong class="text-capitalize" v-else
                    ><span
                      :class="
                        event.data.type == 'Credit'
                          ? 'success--text'
                          : 'accent--text'
                      "
                      >{{ event.data.type }}ed</span
                    >
                    {{ event.data.amount | formatNumber }}</strong
                  >
                  <div
                    class="caption"
                    :class="`${
                      event.error ? 'error' : 'grey--text text--lighten-1'
                    }--text`"
                    v-if="event.type != 'create'"
                  >
                    {{ event.error ? event.error : "Activity" }}
                  </div>
                  <div
                    class="caption"
                    :class="
                      event.data.description
                        ? `${colors[event.data.type]}--text`
                        : 'grey--text text--lighten-1'
                    "
                    v-else
                  >
                    {{
                      event.data.description
                        ? event.data.description
                        : "No description"
                    }}
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  :class="{ 'py-1': $vuetify.breakpoint.xs }"
                >
                  <strong>{{ event.timestamp | dateTime }}</strong>
                  <div class="caption grey--text text--lighten-1">Time</div>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  :class="{ 'py-1': $vuetify.breakpoint.xs }"
                >
                  <EventDetailsModal :event="event" />
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EventDetailsModal from "../../components/modals/EventDetailsModal.vue";

export default {
  data() {
    return {
      colors: {
        user: "primary",
        transaction: "secondary",
        error: "error",
        Credit: "success",
        Debit: "accent",
      },
      textFieldProps: {
        outlined: true,
        appendIcon: "mdi-clock-outline",
        hideDetails: true,
        class: "sharp",
      },
      icons: {
        error: "mdi-alert",
        user: "mdi-account",
        transaction: "mdi-credit-card-plus-outline",
      },
      from: "",
      to: "",
    };
  },
  components: { EventDetailsModal },
  computed: {
    ...mapGetters({
      user: "user/user",
      userIsVerified: "user/userIsVerified",
      activity: "user/activity",
    }),
  },
  methods: {
    ...mapActions({
      getActivity: "user/getUserActivity",
      showGlobalLoader: "ui/showGlobalLoader",
    }),
    async filterActivities() {
      const { from, to } = this;
      this.showGlobalLoader({ show: true, message: "loading" });
      await this.getActivity({ from, to });
      this.showGlobalLoader({ show: false, message: "" });
    },
  },
  async beforeDestroy() {
    await this.getActivity();
  },
};
</script>

<style>
</style>