<template>
  <div id="app" class="flyout">
    <mdb-navbar v-if="!$route.meta.hideNavigation" id="main-navbar" dark position="top" color="stylish" scrolling :scrollingOffset="20">
      <mdb-navbar-brand to="/" waves class="font-weight-bold">
        Vue-Commerce
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <mdb-nav-item exact :to="`/${$i18n.locale}`"><strong>{{ $t('nav.home') }}</strong></mdb-nav-item>
          <!-- <mdb-nav-item to="/css"><strong>About</strong></mdb-nav-item> -->
          <mdb-nav-item v-b-modal.modal-1 v-if="!session"><strong>
          Login/Register
          </strong></mdb-nav-item>
          
          <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle v-if="session" tag="a" navLink slot="toggle" waves-fixed><strong>
          {{name}}
          </strong></mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <mdb-dropdown-item color="cyan">
              <mdb-nav-item anchorClass="black-text" :to="`/${$i18n.locale}/profile`">
                profile settings
              </mdb-nav-item>
            </mdb-dropdown-item>
            <mdb-dropdown-item @click="logout">Logout</mdb-dropdown-item>
          </mdb-dropdown-menu>
          </mdb-dropdown>
          <mdb-nav-item :to="`/${$i18n.locale}/checkout`"><i class="fas fa-cart-plus"></i><strong>{{ $t('nav.cart') }}</strong></mdb-nav-item>
          <mdb-nav-item :to="`/${$i18n.locale}/adminlogin`"><strong>Admin Access</strong></mdb-nav-item>
          
          <!-- <div class="locale-changer">
            <select v-model="$i18n.locale">
              <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
            </select>
          </div> -->

          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed><strong>{{ $i18n.locale }}</strong></mdb-dropdown-toggle>
            <mdb-dropdown-menu dropleft>
              <mdb-dropdown-item @click.prevent="setLocale(lang)" v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang">{{ lang }}</mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>

        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>

    <main>
      <transition name="fade" mode="out-in">
          <router-view></router-view>
      </transition>
      <vue-progress-bar></vue-progress-bar>
        <register></register>
    </main>
    <mdb-footer v-if="!$route.meta.hideNavigation" color="stylish-color">
      <p class="footer-copyright mb-0 py-3 text-center">
        &copy; {{new Date().getFullYear()}} Copyright: <a href="https://forums.coretabs.net/sniperadmin"> Nasr Galal</a>
      </p>
    </mdb-footer>
  </div>
</template>

<script>
import {fbAuth} from '../src/assets/js/firebase';
import { 
  mdbNavbar, 
  mdbNavItem, 
  mdbNavbarNav, 
  mdbNavbarToggler, 
  mdbNavbarBrand, 
  mdbFooter,
  mdbDropdown, 
  mdbDropdownMenu, 
  mdbDropdownToggle,
  mdbDropdownItem,
  } from 'mdbvue';

import register from './components/Register';

export default {
  name: 'app',
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbNavbarBrand,
    mdbFooter,
    register,
    mdbDropdown, 
    mdbDropdownMenu, 
    mdbDropdownToggle,
    mdbDropdownItem,
  },
  data() {
    return {
      session: null,
      name: null,
      // langs: ['en', 'ar']
    }
  },
  methods: {
      logout() {
            fbAuth.auth().signOut()
                .then(() => {
                toast.fire({
                  type: 'success',
                  title: 'Logged out Successfully'
                });
                this.$router.replace('/');
                })
            .catch((response, err) => {
                console.log(err);
                response.status(500).send(err);
            });
        },
        setLocale(locale) {
          this.$i18n.locale = locale;
          this.$router.push({
            params: { lang: locale }
          });
        }
  },
  created() {
    fbAuth.auth().onAuthStateChanged(user => {
          if(user) {
            const logged = fbAuth.auth().currentUser;
            this.session = logged;
            let username = logged.email;
            this.name = username;
          }
        });
  }
};

</script>

<style>
* {
  text-transform: capitalize;
}
.flyout {
	display:flex;
	flex-direction: column;
	min-height:100vh;
	justify-content: space-between;
}
.active{
  background-color: rgba(255, 255, 255, 0.1);
}
.demo-section {
  padding: 20px 0;
}
.demo-section > section {
  border: 1px solid #e0e0e0;
  padding: 15px;
}
.demo-section > h4 {
  font-weight: bold;
  margin-bottom: 20px;
}
.demo-title {
  color: #9e9e9e;
  font-weight: 700;
  margin-bottom: 0;
  padding-left: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
