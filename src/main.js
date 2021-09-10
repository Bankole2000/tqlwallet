import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import "./assets/css/styles.css";
import DatetimePicker from 'vuetify-datetime-picker'
// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'

Vue.use(DatetimePicker)
import { formatNumber, dateTime } from "./filters/numbers";


Vue.config.productionTip = false

Vue.filter('formatNumber', formatNumber)
Vue.filter('dateTime', dateTime)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
