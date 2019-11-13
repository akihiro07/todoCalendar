import Vue from "vue";
import Calendar from "./Calendar.vue";
import store from "./store";
// normalize.cssを読み込み
import "normalize-css";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Calendar)
}).$mount("#app");
