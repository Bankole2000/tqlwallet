<template>
  <div class="event-details-modal">
    <v-dialog
      scrollable
      :fullscreen="$vuetify.breakpoint.xs"
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <!-- <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn> -->
        <v-btn
          text
          color="primary"
          v-bind="attrs"
          v-on="on"
          class="sharp text-capitalize"
          ><v-icon left>mdi-eye</v-icon> View Data</v-btn
        >
      </template>

      <v-card :tile="$vuetify.breakpoint.xs">
        <v-card-title class="headline white--text primary py-3">
          Event Details
          <v-spacer></v-spacer>
          <v-btn icon color="error" @click="dialog = false">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text
          class="py-4 grey--text text--darken-3"
          :class="$vuetify.breakpoint.xs ? 'px-0' : 'px-6'"
          style="font-size: 1.1rem"
        >
          <v-treeview open-all dense :items="sortedData"></v-treeview>
          <!-- <p class="grey--text text--darken-3"><strong>Field:</strong> value</p> -->
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="text-capitalize"
            text
            @click="dialog = false"
            ><v-icon left>mdi-close</v-icon> Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["event", "event-data"],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    sortedData() {
      let items = [];
      let i = 1;

      for (const property in this.event) {
        const newObject = { id: i };
        if (
          typeof this.event[property] !== "string" &&
          typeof this.event[property] !== "number"
        ) {
          i += 1;
          let children = [];
          for (const child in this.event[property]) {
            children.push({
              id: i,
              name: `${child} : ${this.event[property][child]}`,
            });
            i++;
          }
          newObject.children = children;
          newObject.name = property;
        } else {
          newObject.name = `${property} : ${this.event[property]}`;
        }
        items.push(newObject);
      }

      return items;
    },
  },
};
</script>

<style>
</style>