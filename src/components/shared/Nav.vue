<template>
  <mdb-navbar class="justify-content-between" v-if="!$route.meta.hideNavigation" dark position="top" color="stylish" scrolling :scrollingOffset="20">
  <!-- logo -->
    <mdb-navbar-brand to="/" waves class="font-weight-bold animated infinite pulse">
      Vue-Commerce
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav >
        <!-- navbar -->
        <mdb-nav-item exact :to="`/${$i18n.locale}`"><strong>{{ $t('nav.home') }}</strong></mdb-nav-item>
        <mdb-nav-item :to="`/${$i18n.locale}/about`"><strong>{{ $t('nav.about') }}</strong></mdb-nav-item>
        <mdb-nav-item v-b-modal.modal-1 v-if="!session"><strong>
        {{ $t('nav.login') }}
        </strong></mdb-nav-item>
          
        <!-- cart -->
        <mdb-nav-item :to="`/${$i18n.locale}/checkout`"><i class="fas fa-cart-plus"></i><strong>{{ $t('nav.cart') }}</strong></mdb-nav-item>
        
        <!-- <div class="locale-changer">
          <select v-model="$i18n.locale">
            <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
          </select>
        </div> -->
        <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed><strong>{{ $i18n.locale }}</strong></mdb-dropdown-toggle>
          <mdb-dropdown-menu >
            <mdb-dropdown-item @click.prevent="setLocale(lang)" v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang">{{ lang }}</mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </mdb-navbar-nav> 

        <!-- dropdown -->
        <mdb-dropdown tag="li" class="nav-item text-white">
        <mdb-dropdown-toggle v-if="session" tag="a" navLink slot="toggle" waves-fixed><strong>
        {{name}}
        </strong></mdb-dropdown-toggle>
        <mdb-dropdown-menu>
          <mdb-dropdown-item>
            <mdb-nav-item anchorClass="black-text" :to="`/${$i18n.locale}/profile`"><i class="fas fa-wrench mr-2"></i> 
            {{ $t('nav.dropdown.settings') }}
            </mdb-nav-item>
          </mdb-dropdown-item>
          <mdb-dropdown-item @click="logout"><i class="fas fa-power-off mr-2"></i> {{ $t('nav.dropdown.logout') }}</mdb-dropdown-item>
        </mdb-dropdown-menu>
        </mdb-dropdown><!-- ./dropdown -->
      
        <mdb-nav-item class="list" waves waves-fixed :to="`/${$i18n.locale}/adminlogin`"><strong class="text-white">{{ $t('nav.admin') }}</strong></mdb-nav-item>
      
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script lang="ts">
  import {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbNavbarBrand,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
  } from 'mdbvue'

  export default {
    name: 'Nav',
    components: {
      mdbNavbar,
      mdbNavItem,
      mdbNavbarNav,
      mdbNavbarToggler,
      mdbNavbarBrand,
      mdbDropdown,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbDropdownItem,
    }
  }
</script>

<style scoped>

</style>