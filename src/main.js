import Vue from "vue";
import App from "./App.vue";
import i18n from "./lang";
import "./bootstrap";
Vue.config.productionTip = false;
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
