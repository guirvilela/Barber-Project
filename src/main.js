import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuelidate from 'vuelidate';
import ViaCep from 'vue-viacep';
import VueTheMask from 'vue-the-mask';

Vue.use(VueTheMask);
Vue.use(ViaCep);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  Vuelidate,
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app');
