// importing Vue
import Vue from "vue";
// Router
import Router from "vue-router";

// views folder
// HomePage
import HomePage from './views/HomePage';

// admin folder
// Admin
import Admin from './components/admin/Admin';

// Overview
import Overview from './components/admin/Overview';

// Products
import Products from './components/admin/Products';

// Orders
import Orders from './components/admin/Orders';

// Users
import Users from './components/admin/Users';

// AdminLogin
import AdminLogin from './components/admin/AdminLogin';

// categories
import Categories from './components/admin/Categories';

// app-views
// Users
import Profile from './components/Profile';

// Checkout
import Checkout from './components/app-views/Checkout';

// about
import About from './components/app-views/About';

// notFound
import NotFound from "./components/app-views/NotFound";

// others
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
              path: "categories",
              name: "categories",
              component: Categories,
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
          // ./admin-page
        },
        {
          path: "*",
          name: "not-found",
          component: NotFound,
          meta: {
            hideNavigation: true,
          }
        },
      ]
    }
  ]
});