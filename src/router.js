// importing Vue
import Vue from "vue";
// Router
import Router from "vue-router";
// HomePage
import HomePage from './views/HomePage';
// Admin
import Admin from './components/admin/Admin';
// Overview
import Overview from './components/admin/Overview';
// Products
import Products from './components/admin/Products';
// Orders
import Orders from './components/admin/Orders';
//Users
import Profile from './components/admin/Profile';
// Checkout
import Checkout from './components/Checkout';

import {fbAuth} from './assets/js/firebase';
//*********************************************************************** */

// use router
Vue.use(Router);
// exporting router function 
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,

  routes: [
  // homepage
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    // Checkout
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout
    },
    // Admin page
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { hideNavigation: true,
        requiresAuth: true },
      beforeEnter: (to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = fbAuth.auth().currentUser;

        if (requiresAuth && !currentUser) {

          // eslint-disable-next-line callback-return
          next({
            path: '/',
            query: { redirect: to.fullPath },
          })
        }
        else if (requiresAuth && currentUser) {
          // eslint-disable-next-line callback-return
          next()
        }
      },

      // Admin Children
      children: [
        {
          path: "overview",
          name: "overview",
          component: Overview,
          meta: { hideNavigation: true },
        },
        {
          path: "products",
          name: "products",
          component: Products,
          meta: { hideNavigation: true },
        },
        {
          path: "orders",
          name: "orders",
          component: Orders,
          meta: { hideNavigation: true },
        },
        {
          path: "profile",
          name: "profile",
          component: Profile,
          meta: { hideNavigation: true },
        },
      ],
    },
  ]
});