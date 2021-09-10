<template>
  <div class="mobile-side-nav">
    <v-navigation-drawer v-model="pageNav.show" temporary app>
      <v-list-item style="height: 90px">
        <v-list-item-avatar tile>
          <img :src="require('@/assets/img/logo.png')" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title"> Wallet App </v-list-item-title>
          <v-list-item-subtitle> For Personal Finance </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :to="{ name: item.route }"
          link
          active-class="primary--text"
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
      <template v-slot:append v-if="user">
        <div class="pa-2">
          <v-btn
            @click="userLogout"
            class="sharp accent white--text"
            depressed
            block
          >
            <v-icon left>mdi-logout-variant</v-icon>
            Logout</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loggedInItems: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          route: "account.dashboard",
        },
        {
          title: "Activity",
          icon: "mdi-history",
          route: "account.transactions",
        },
        {
          title: "Statement",
          icon: "mdi-receipt",
          route: "account.statement",
        },

        // { title: "Help", icon: "mdi-help-box", route: "pages.help" },
      ],
      loggedOutItems: [
        { title: "Login", icon: "mdi-login", route: "auth.login" },
        { title: "SignUp", icon: "mdi-account-plus", route: "auth.signup" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      pageNav: "ui/pageNav",
      user: "user/user",
    }),
    navItems() {
      return this.user ? this.loggedInItems : this.loggedOutItems;
    },
  },
  methods: {
    ...mapActions({
      logout: "user/logout",
      showToast: "ui/showToast",
    }),
    userLogout() {
      this.$router.push({ name: "pages.home" });
      this.logout();
      this.showToast({
        show: true,
        message: "Logged Out",
        sclass: "info",
        timeout: 4000,
      });
    },
  },
};
</script>

<style>
</style>