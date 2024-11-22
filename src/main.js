import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import moment from 'moment';
import 'moment/locale/pt-br';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

import VueApexCharts from 'vue-apexcharts';
Vue.use(VueApexCharts);

import SmartTable from 'vuejs-smart-table';
Vue.use(SmartTable);

// eslint-disable-next-line vue/component-definition-name-casing
Vue.component('apexchart', VueApexCharts);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import VueCurrencyInput from 'vue-currency-input';
const pluginOptions = {
  /* see config reference */
  globalOptions: { currency: 'BRL', locale: 'pt-BR' }
};
Vue.use(VueCurrencyInput, pluginOptions);

Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
