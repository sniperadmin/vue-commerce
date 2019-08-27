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
import Profile from './components/Profile';
// Checkout
import Checkout from './components/Checkout';
// Users
import Users from './components/admin/Users';
// MyBoard
import MyBoard from './components/MyBoard';
// about
import About from './components/About';
// AdminLogin
import AdminLogin from './components/admin/AdminLogin';

import {fbAuth} from './assets/js/firebase';

import i18n from './i18n';
//*********************************************************************** */

// use router
Vue.use(Router);
// exporting router function 
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      redirect: `/${i18n.locale}`
    },
    { 
      path: '/:lang',
      component: {
        render(c) {return c('router-view')}
      },
      children: [
        // homepage
        {
          path: "/",
          name: "home",
          component: HomePage
        },
        // about
        {
          path: "about",
          name: "about",
          component: About
        },
        // myboard
        {
          path: "myboard",
          name: "myboard",
          component: MyBoard,
          meta: {
            requiresAuth: true,
          },
          beforeEnter: (to, from, next) => {
            // setting rules to guard the route
            const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
            const currentUser = fbAuth.auth().currentUser;
            // conditions
            if (requiresAuth && !currentUser) {

              // eslint-disable-next-line callback-return
              next({
                path: '/',
                query: { redirect: to.fullPath },
              });
            }
            else if (requiresAuth && currentUser) {
              // eslint-disable-next-line callback-return
              next()
            } 
          },
        },
        {
          path: "profile",
          name: "profile",
          component: Profile,
        },
        // Checkout
        {
          path: "checkout",
          name: "checkout",
          component: Checkout
        },
        // AdminLogin
        {
          path: "adminlogin",
          name: "adminlogin",
          component: AdminLogin,
        },
        // Admin page
        {
          path: "admin",
          name: "admin",
          component: Admin,
          meta: { hideNavigation: true,
            requiresAuth: true },
          beforeEnter: (to, from, next) => {
            // setting rules to guard the route
            const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
            const currentUser = fbAuth.auth().currentUser;
            let isAdmin = currentUser.getIdTokenResult().then(idTokenResult => {
              currentUser.admin = idTokenResult.claims.admin; console.log(currentUser.admin)})
              .catch(err => {console.log(err)});
            // conditions
            if (requiresAuth && !currentUser) {
              // eslint-disable-next-line callback-return
              next({
                path: '/',
                query: { redirect: to.fullPath },
              });
            }
            else if (requiresAuth && isAdmin) {
              // eslint-disable-next-line callback-return
              next()
            } 
          },
          // Admin Children [ The guard takes care of them automatically! ]
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
            {
              path: "users",
              name: "users",
              component: Users,
              meta: { hideNavigation: true },
            },
          ],
        },
      ]
    }
  ]
});