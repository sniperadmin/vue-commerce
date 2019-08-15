<template>
  <div class="hello">
  <div  class="page-wrapper default-theme sidebar-bg bg1 " :class="{ active : isActive, 'toggled' : acting}">
    <!-- toggler -->
            <b-button class="btn btn-sm btn-dark" @click="acting = !acting">
            <i class="fas fa-bars"></i>
            </b-button>
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
                        <span class="user-name">Jhon
                            <strong>Smith</strong>
                        </span>
                        <span class="user-role">{{email}}</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control search-menu" placeholder="Search...">
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
                            <span>General</span>
                        </li>
                        <li class="sidebar">
                            <router-link to="/admin/overview">
                                <i class="fa fa-tachometer-alt"></i>
                                <span class="menu-text">Overview</span>
                                <span class="badge badge-pill badge-warning">New</span>
                            </router-link>
                        </li>
                        <li class="sidebar">
                            <router-link to="/admin/products">
                                <i class="fa fa-shopping-cart"></i>
                                <span class="menu-text">Products</span>
                                <span class="badge badge-pill badge-danger">3</span>
                            </router-link>
                        </li>
                        <li class="sidebar">
                            <router-link to="/admin/orders">
                                <i class="far fa-gem"></i>
                                <span class="menu-text">Orders</span>
                            </router-link>
                        </li>
                        <li class="sidebar-dropdown">
                            <router-link to="/admin/profile">
                                <i class="far fa-user"></i>
                                <span class="menu-text">Profile</span>
                            </router-link>
                        </li>
                        <li class="sidebar">
                            <a href="#" @click.prevent="logout">
                                <i class="fa fa-power-off"></i>
                                <span class="menu-text">Logout</span>
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
                <router-view></router-view>
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
import {fbAuth} from '@/assets/js/firebase';
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
      }
  },
    methods: {
        logout() {
            fbAuth.auth().signOut()
                .then(() => {
                this.$router.replace('/');
                })
            .catch((err) => {
                console.log(err);
            });
        },
        toggleMenu() {
            jQuery(function ($) {
                $(".page-wrapper").toggleClass("toggled");
            });
        },
    },
    created() {
        var user = fbAuth.auth().currentUser;
        this.email = user.email;
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.custom {
	position: fixed;
	// right: -62px;
  padding: .5rem 1.2rem;
    // display: none;
}

</style>
