// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// All CSS

import 'bootstrap-css-only/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap-vue/dist/bootstrap-vue.css';

import './assets/css/admin.css';

import './assets/css/sidebar-themes.css';

import './assets/css/ui.css';

import './assets/css/responsive.css';

import 'mdbvue/build/css/mdb.css';

import Vue from 'vue';

import App from './App';

import FontAwesome from '@fortawesome/fontawesome-free';

import './registerServiceWorker';

// Registering components

// jQuery
import jQuery from 'jquery';

window.jQuery = jQuery;

// Vue2TouchEvents
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);

// LoadScript
import LoadScript from 'vue-plugin-load-script';

Vue.use(LoadScript);

// BootstrapVue
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

// VueFirestore
import VueFirestore from 'vue-firestore';

Vue.use(VueFirestore);

Vue.config.productionTip = false;

// import js for admin interface
require('./assets/js/admin');

// sweetalert2
import Swal from 'sweetalert2'

window.Swal = Swal;

window.FontAwesome = FontAwesome;
const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.toast = toast;

// store
import store from './store';

// Vue2Filters
import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);

// Apex charts
import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

// VueProgressBar
import VueProgressBar from 'vue-progressbar';

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '7px'
});

// i18n
import i18n from './i18n'

// Vuesax
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'

Vue.use(Vuesax)

// VueSpinners
import { VueSpinners } from '@saeris/vue-spinners'

Vue.use(VueSpinners)

// router
import router from './router';

router.beforeEach((to, from, next) => {
  // use language from param
  let language = to.params.lang;
  if (!language) {
    language = 'en';
  }
  // set current language
  i18n.locale = language;
  next();
});

// Registestering custom components globally
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('mini-cart', require('./components/MiniCart.vue').default);
Vue.component('product-list', require('./components/app-views/ProductList.vue').default);
Vue.component('fb-login', require('./components/logins/FbLogin.vue').default);
Vue.component('google-login', require('./components/logins/GoogleLogin.vue').default);
Vue.component('github-login', require('./components/logins/GithubLogin.vue').default);
Vue.component('custom-footer', require('./components/Footer.vue').default);

// creating new Vue instance for firing custom events
window.Fire = new Vue();

// fbAuth
import { fbAuth } from './assets/js/firebase';
let app = '';
fbAuth.auth().onAuthStateChanged(user => {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      i18n,
      components: { App },
    });
  }
});
