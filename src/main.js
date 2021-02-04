import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import http from "@/api";
import "lib-flexible";
import { directive } from "./directive";
Vue.config.productionTip = false;
Vue.prototype.$http = http;
directive(Vue, ["add", "del"]);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
