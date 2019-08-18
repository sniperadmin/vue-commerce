// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jQuery from 'jquery';
import 'bootstrap-css-only/css/bootstrap.min.css';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/admin.css';
import './assets/css/sidebar-themes.css';
import './assets/css/ui.css';
import './assets/css/responsive.css';
import 'mdbvue/build/css/mdb.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import Vue2TouchEvents from 'vue2-touch-events';
import LoadScript from 'vue-plugin-load-script';
import {fbAuth} from './assets/js/firebase';
import VueFirestore from 'vue-firestore';
import FontAwesome from '@fortawesome/fontawesome-free';

window.jQuery = jQuery;
Vue.use(Vue2TouchEvents);
Vue.use(LoadScript);
Vue.use(BootstrapVue);
Vue.use(VueFirestore);
Vue.config.productionTip = false;

require('./assets/js/admin');

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

import store from './store';

import Vue2Filters from 'vue2-filters';
 
Vue.use(Vue2Filters);

Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('mini-cart', require('./components/MiniCart.vue').default);
Vue.component('product-list', require('./components/ProductList.vue').default);

let app = '';

fbAuth.auth().onAuthStateChanged(user => {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    });
  }
});
