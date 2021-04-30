<template>
  <div id="app" class="flyout" v-dir>
    <Nav />
    <main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <vue-progress-bar></vue-progress-bar>
        <register></register>
    </main>

    <custom-footer></custom-footer>
  </div>
</template>

<script>
import Nav from './components/shared/Nav.vue'
import {fbAuth} from '../src/assets/js/firebase';
import i18n from './i18n';
import { 
  mdbContainer,
  } from 'mdbvue';

import register from './components/logins/Register';

export default {
  name: 'app',
  components: {
    register,
    mdbContainer,
    Nav
  },
  data() {
    return {
      session: null,
      name: null,
      reverse: false,
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
    },
  },
  directives: {
    dir: el => {
      if (i18n.locale === 'ar') {
        el.style.direction = "rtl";
        el.style.textAlign = "right"

        let car = el.getElementsByClassName('VueCarousel-inner');
          if (car)
            for (var i in car){
              car[i].style.flexDirection = "row-reverse"
            }

          } else if (i18n.locale === 'en') {
            el.style.direction = "ltr"
            el.style.textAlign = "left"
            el.style.textTransform = "capitalize"
        
          let car = el.getElementsByClassName('VueCarousel-inner');
          if (car)
            for (var i in car){
              car[i].style.flexDirection = "row"
          }
        }
    },
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

    this.$bvToast.toast('This project is under mentainance!', {
      title: 'Alerts & News',
      variant: 'warning',
      solid: true,
      noAutoHide: true,
      toaster: 'b-toaster-bottom-right'
    });
  },
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

.list {
  list-style: none !important;
}
</style>
