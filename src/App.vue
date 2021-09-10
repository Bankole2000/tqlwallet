<template>
  <v-app>
    <!--  -->
    <Navbar v-if="!$route.name.includes('auth')" />
    <SideNav v-if="!$route.name.includes('auth')" />

    <GlobalAlert />
    <v-main>
      <transition name="router-anim">
        <router-view />
      </transition>
    </v-main>
    <Snackbar />
    <GlobalLoader />
  </v-app>
</template>

<script>
// import API from "@/api";
import { mapActions } from "vuex";
import Navbar from "./components/common/Navbar.vue";
import Snackbar from "./components/shared/Snackbar.vue";
import GlobalLoader from "./components/shared/GlobalLoader.vue";
import GlobalAlert from "./components/shared/GlobalAlert.vue";
import SideNav from "./components/common/SideNav.vue";
export default {
  components: { Navbar, Snackbar, GlobalLoader, GlobalAlert, SideNav },
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    ...mapActions({
      getTransactions: "transactions/getTransactions",
    }),
  },
  async mounted() {
    // await API.User.login();
    // const { data, error } = this.getTransactions();
    // console.log({ data, error });
    // await API.Transactions.getStatementByPeriod({
    //   start: "2021-08-01",
    //   end: "2021-09-01",
    // });
  },
};
</script>
<style>
/* @import "./assets/css/styles.css"; */
.router-anim-enter-active {
  animation: coming 0.5s;
  animation-delay: 0.3s;
  opacity: 0;
}

.router-anim-leave-active {
  animation: going 0.3s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

*::-webkit-scrollbar {
  width: 10px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background-color: #e91e63;
  border-radius: 10px;
  border: transparent;
}
</style>
