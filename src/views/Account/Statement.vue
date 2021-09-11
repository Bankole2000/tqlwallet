<template>
  <div class="account-statement grey lighten-4">
    <v-container>
      <v-row>
        <v-col cols="12" class="my-6">
          <h1 class="display-1 mb-2">
            <!-- <span class="font-weight-light">Wallet Statement for</span> -->
            <!-- {{ user.firstname ? user.firstname : user.email }} -->
            <span class="font-weight-light">Statement</span>
          </h1>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" class="py-0">
          <p class="text-h5 mb-2 font-weight-light">
            Get transaction records for any time period
          </p>
        </v-col>
        <v-col cols="12" md="4" sm="4">
          <v-dialog
            ref="startDialog"
            v-model="startDialog"
            :return-value.sync="start"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="start"
                label="Start Date"
                outlined
                hideDetails
                class="sharp"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              @click:date="$refs.startDialog.save(start)"
              v-model="start"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startDialog = false"
                >Cancel</v-btn
              >
              <v-btn text color="primary" @click="$refs.dialog.save(start)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" md="4" sm="4">
          <v-dialog
            ref="endDialog"
            v-model="endDialog"
            :return-value.sync="end"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="end"
                label="End Date (optional)"
                outlined
                class="sharp"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                hideDetails
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              @click:date="$refs.endDialog.save(end)"
              v-model="end"
              :min="start"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endDialog = false"
                >Cancel</v-btn
              >
              <v-btn text color="primary" @click="$refs.dialog.save(end)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-btn @click="submit" class="sharp primary white--text" block x-large
            >Get Statement
            <v-icon right>mdi-chevron-double-right</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-row v-if="statement.length">
        <v-col cols="12">
          <div style="display: flex; justify-content: center">
            <v-btn
              :block="$vuetify.breakpoint.xs"
              class="sharp text-capitalize mx-auto"
              color="secondary"
              :loading="downloading"
              :disabled="downloading"
              @click="printStatement"
              x-large
              ><v-icon left>mdi-printer</v-icon> Download / print</v-btn
            >
          </div>
        </v-col>
        <v-col cols="12" class="py-0" v-for="(txn, i) in statement" :key="i">
          <v-slide-y-transition>
            <v-card hover tile class="px-3 my-6">
              <v-layout row wrap :class="`pa-4 project ${txn.status}`">
                <v-flex xs12 md4>
                  <div class="caption grey--text">Description</div>
                  <div
                    class="title"
                    :class="
                      txn.description
                        ? 'primary--text font-weight-bold'
                        : 'grey--text'
                    "
                  >
                    {{ txn.description ? txn.description : "No description" }}
                  </div>
                </v-flex>
                <v-flex xs12 sm4 md2 class="pr-6">
                  <div
                    class="caption grey--text"
                    :class="{ 'text-right': !$vuetify.breakpoint.xs }"
                  >
                    Amount
                  </div>
                  <div class="title grey--text text--darken-2 d-flex">
                    <v-spacer v-if="!$vuetify.breakpoint.xs"></v-spacer>
                    <p
                      class="mb-0"
                      :class="{ 'text-right': !$vuetify.breakpoint.xs }"
                    >
                      {{ txn.amount | formatNumber }}
                    </p>
                  </div>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <div class="caption grey--text">Time</div>
                  <div class="title grey--text text--darken-2">
                    {{ txn.createdAt | dateTime }}
                  </div>
                </v-flex>
                <v-flex
                  xs6
                  sm4
                  md2
                  class="d-flex justify-lg-center justify-md-start"
                >
                  <v-chip
                    label
                    class="my-2 title px-8 py-4"
                    :class="txn.type == 'Credit' ? 'success' : 'error'"
                    ><v-icon left color="white" class="mr-2" size="24"
                      >mdi-credit-card-{{
                        txn.type == "Credit" ? "plus" : "minus"
                      }}-outline</v-icon
                    >
                    {{ txn.type }}</v-chip
                  >
                </v-flex>
              </v-layout>
            </v-card>
          </v-slide-y-transition>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <v-alert prominent text type="info">
            No transactions records available. Please select different dates to
            get your statement.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      start: new Date().toISOString().substr(0, 10),
      startDialog: false,
      end: "",
      endDialog: false,
      statement: [],
      downloading: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      userIsVerified: "user/userIsVerified",
    }),
  },
  methods: {
    ...mapActions({
      getStatementByPeriod: "transactions/getStatementByPeriod",
      generateStatementPDF: "transactions/generateStatementPDF",
      showGlobalLoader: "ui/showGlobalLoader",
      showToast: "ui/showToast",
    }),
    async submit() {
      this.showGlobalLoader({ show: true, message: "loading" });
      const { start, end } = this;
      console.log({ start, end });
      const { data, error } = await this.getStatementByPeriod({ start, end });
      console.log({ data, error });
      if (!error) {
        this.statement = data;
        this.showToast({
          show: true,
          message: `${
            data.length ? "Statement Loaded" : "No Txns in time period"
          }`,
          sclass: "success",
          timeout: 4000,
        });
      } else {
        this.showToast({
          show: true,
          message: error,
          sclass: "error",
          timeout: 4000,
        });
      }
      this.showGlobalLoader({ show: false, message: "" });
    },
    async printStatement() {
      this.downloading = true;
      this.showGlobalLoader({ show: true, message: "Printing..." });
      console.log({ statement: this.statement });
      const pdf = await this.generateStatementPDF(this.statement);
      if (pdf) {
        window.open(pdf, "_blank");
        // const fileLink = document.createElement("a");

        // fileLink.href = pdf;
        // fileLink.setAttribute("download", "file.pdf");
        // document.body.appendChild(fileLink);

        // fileLink.click();
      }
      this.downloading = false;
      this.showGlobalLoader({ show: false, message: "" });
    },
  },
};
</script>

<style>
</style>