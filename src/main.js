// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// All CSS

import 'bootstrap-css-only/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap-vue/dist/bootstrap-vue.css';

import './assets/css/admin.css';

import 'mdbvue/lib/css/mdb.min.css';

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
// import Vuesax from 'vuesax'
// import 'vuesax/dist/vuesax.css'
// Vue.use(Vuesax)

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

// Registestering custom components globally and Asyncronously
// this will be a dynamic import => Boosts performance
Vue.component('add-to-cart', resolve => {
  import('./components/AddToCart.vue')
    .then(AddToCart => {
      resolve(AddToCart.default)
    });
});
Vue.component('mini-cart', resolve => {
  import('./components/MiniCart.vue')
    .then(MiniCart => {
      resolve(MiniCart.default)
    });
});
Vue.component('product-list', resolve => {
  import('./components/app-views/ProductList.vue')
    .then(ProductList => {
      resolve(ProductList.default)
    });
});
Vue.component('fb-login', resolve => {
  import('./components/logins/FbLogin.vue')
    .then(FbLogin => {
      resolve(FbLogin.default)
    });
});
Vue.component('google-login', resolve => {
  import('./components/logins/GoogleLogin.vue')
    .then(GoogleLogin => {
      resolve(GoogleLogin.default)
    });
});
Vue.component('github-login', resolve => {
  import('./components/logins/GithubLogin.vue')
    .then(GithubLogin => {
      resolve(GithubLogin.default)
    });
});
Vue.component('custom-footer', resolve => {
  import('./components/shared/Footer.vue')
    .then(Footer => {
      resolve(Footer.default)
    });
});
Vue.component('paypal', resolve => {
  import('./components/PayPal.vue')
    .then(PayPal => {
      resolve(PayPal.default)
    });
});

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
