<template>
  <div class="hello">
  <div  class="page-wrapper default-theme sidebar-bg bg1" :class="{ active : isActive, 'toggled' : acting}" v-if="isAdmin">
            
        <nav id="sidebar" class="sidebar-wrapper">
           
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">Vue-Commerce</a>
                    <b-button variant="outline-secondary" class="text-center ml-5 p-1" @click="acting = !acting">
                      <i class="fas fa-times fa-md"></i>
                    </b-button>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="https://image.flaticon.com/icons/svg/236/236832.svg" alt="User picture">
                    </div>
                    <div class="user-info">
                        <span class="user-name">
                            <strong>dynamic username</strong>
                        </span>
                        <span class="user-role">{{email}}</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span class="mx-2">{{ $t('adminPage.menu.status') }}</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control search-menu" :placeholder="$t('adminPage.menu.search')">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>{{ $t('adminPage.menu.general') }}</span>
                        </li>
                        <li class="sidebar" v-if="isAdmin">
                            <router-link :to="`/${$i18n.locale}/admin/overview`">
                                <i class="fa fa-tachometer-alt"></i>
                                <span class="menu-text mx-2">{{ $t('adminPage.menu.overview') }}</span>
                                <span class="badge badge-pill badge-warning">under construction</span>
                            </router-link>
                        </li>
                        <li class="sidebar" v-if="isAdmin">
                            <router-link :to="`/${$i18n.locale}/admin/products`">
                                <i class="fa fa-shopping-cart"></i>
                                <span class="menu-text mx-2">{{ $t('adminPage.menu.products') }}</span>
                                <span class="badge badge-pill badge-primary">{{ products.length }}</span>
                            </router-link>
                        </li>
                        
                        <li class="sidebar" v-if="isAdmin">
                            <router-link :to="`/${$i18n.locale}/admin/categories`">
                                <i class="fa fa-shopping-cart"></i>
                                <span class="menu-text mx-2">categories</span>
                                <span class="badge badge-pill badge-danger"> still static => 3</span>
                            </router-link>
                        </li>

                        <li class="sidebar" v-if="isAdmin">
                            <router-link :to="`/${$i18n.locale}/admin/orders`">
                                <i class="far fa-gem"></i>
                                <span class="menu-text mx-2">{{ $t('adminPage.menu.orders') }}</span>
                                <span class="badge badge-pill badge-warning">under construction</span>
                            </router-link>
                        </li>
                        <li class="sidebar-dropdown">
                            <router-link :to="`/${$i18n.locale}/admin/profile`">
                                <i class="far fa-user"></i>
                                <span class="menu-text mx-2">{{ $t('adminPage.menu.profile') }}</span>
                            </router-link>
                        </li>
                        <li class="sidebar-dropdown">
                            <router-link :to="`/${$i18n.locale}/admin/users`">
                                <i class="fas fa-users"></i>
                                <span class="menu-text mx-2" v-if="isAdmin">{{ $t('adminPage.menu.users') }}</span>
                            </router-link>
                        </li>
                        <li class="sidebar">
                            <a href="#" @click.prevent="logout">
                                <i class="fa fa-power-off"></i>
                                <span class="menu-text mx-2">{{ $t('adminPage.menu.logout') }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
        </nav>
        
        <!-- page-content  -->
        <main class="page-content pt-2">
          <div class="container-fluid">
            <div class="row">
              <div class="form-group col-md-12">
                  <!-- toggler -->
            <transition name="fade">
                <b-button class="btn btn-sm btn-dark ml-0 mt-0 position-fixed" v-if="!acting" @click="acting = !acting">
                    <i class="fas fa-bars"></i>
                </b-button>
            </transition>
            <transition name="fade">
                <router-view></router-view>
            </transition>
              </div>
            </div>
          </div>
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
// global {$, jQuery}
import { db, fbAuth } from '@/assets/js/firebase';
export default {
  name: "admin",
  props: {
    msg: String
  },
  data() {
      return {
          isActive: true,
          acting: true,
          name: null,
          email: null,
          isAdmin: null,
          products: [],
      }
  },
    methods: {
        logout() {
            fbAuth.auth().signOut()
                .then(() => {
                this.$router.replace('/');
                })
            .catch((response, err) => {
                console.log(err);
            });
        },
        toggleMenu() {
            jQuery($ => {
                //Pin sidebar
                $(".page-wrapper").addClass("pinned");

                $("#sidebar").hover(
                    () => {
                        console.log("mouseenter");
                        $(".page-wrapper").addClass("sidebar-hovered");
                    },
                    () => {
                        console.log("mouseout");
                        $(".page-wrapper").removeClass("sidebar-hovered");
                    }
                )
            });
        },
    },
    created() {
        fbAuth.auth().onAuthStateChanged(user => {
          if(user) {
              user.getIdTokenResult().then(idTokenResult => {
                  user.admin = idTokenResult.claims.admin;
                  this.isAdmin = user.admin
                  if (user.admin != true) {
                      this.$router.push('/')
                  } else {
                      var userInfo = fbAuth.auth().currentUser;
                      this.email = userInfo.email;
                  }
              });
          }
        });

        db.collection("products").onSnapshot(snapShot => {
            snapShot.forEach(doc => {
                this.products.push(doc.data())
            });
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.custom {
    left: 0;
}

</style>
