<template>
  <div class="mobile-side-nav">
    <v-navigation-drawer v-model="pageNav.show" app>
      <v-list-item>
        <v-list-item-avatar tile>
          <img
            :src="
              require('@/assets/img/icons/dashboard/sidebar/nodtransfer-icon.svg')
            "
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title"> NodTransfer </v-list-item-title>
          <v-list-item-subtitle> Transfer for Africa </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="{ name: item.route }"
          link
          active-class="secondary--text"
          exact-path
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "Transfer", icon: "mdi-send", route: "pages.home" },
        {
          title: "Rewards",
          icon: "mdi-credit-card-plus-outline",
          route: "pages.nodcredit",
        },

        // { title: "Help", icon: "mdi-help-box", route: "pages.help" },
        { title: "Login", icon: "mdi-login", route: "auth.login" },
        { title: "SignUp", icon: "mdi-account-plus", route: "auth.register" },
        {
          title: "Terms of Service",
          icon: "mdi-information-outline",
          route: "pages.tos",
        },
        {
          title: "Privacy Policy",
          icon: "mdi-shield-account",
          route: "pages.privacy",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      pageNav: "ui/pageNav",
    }),
  },
};
</script>

<style>
</style>