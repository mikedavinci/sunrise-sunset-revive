import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createPinia, PiniaVuePlugin } from "pinia";
import VueCompositionAPI from "@vue/composition-api";
Vue.config.productionTip = false
const pinia = createPinia();
Vue
  .use(VueSweetalert2)
  .use(PiniaVuePlugin)
  .use(VueCompositionAPI);

new Vue({
  vuetify,
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
