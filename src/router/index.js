import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

import Home from '../views/Pages/Home.vue'
import LoginPage from "../views/Pages/Login.vue";
import SignupPage from "../views/Pages/Signup.vue";
import Dashboard from "../views/Account/Dashboard.vue";
import Transactions from "../views/Account/Transactions.vue";
import Statement from "../views/Account/Statement.vue";
import AccountPage from "../views/Account/AccountPages.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pages.home',
    component: Home
  },
  {
    path: '/login',
    name: 'auth.login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'auth.signup',
    component: SignupPage
  },
  {
    path: '/account',
    name: "Account",
    component: AccountPage,
    children: [
      {
        path: "dashboard",
        name: "account.dashboard",
        component: Dashboard,
        meta: {
          title: "Account | Dashbaord",
          guards: ["auth"],
        }
      },
      {
        path: "transactions",
        name: "account.transactions",
        component: Transactions,
        meta: {
          title: "Account | Transactions",
          guards: ["auth"],
        }
      },
      {
        path: "statement",
        name: "account.statement",
        component: Statement,
        meta: {
          title: "Account | statement",
          guards: ["auth"],
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes
})

router.beforeEach((to, from, next) => {
  const user = store.getters["user/user"];
  window.document.title = to.meta && to.meta.title ? to.meta.title : 'TalentQL Wallep App';
  // console.log({ user, to })
  if (
    to.matched.some(
      (record) =>
        record.meta.guards &&
        record.meta.guards.includes("auth") &&
        !user
    )
  ) {
    next({ name: "auth.login" });
  } else if (
    to.matched.some(
      (record) =>
        record.meta.guards && record.meta.guards.includes("guest") && user
    )
  ) {
    next({ name: "pages.home" });
  }
  next();
});

export default router
