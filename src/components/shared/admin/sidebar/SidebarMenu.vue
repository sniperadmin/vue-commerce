<template>
  <div class=" sidebar-item sidebar-menu">
    <ul>
      <li class="header-menu">
        <span>{{ $t('adminPage.menu.general') }}</span>
      </li>
      <!-- overview -->
      <ListItem
        :url="`/${$i18n.locale}/admin/overview`"
        iconName="tachometer-alt"
        :buttonName="$t('adminPage.menu.overview')"
        underConstruction
      />
      <!-- products -->
      <ListItem
        :url="`/${$i18n.locale}/admin/products`"
        iconName="shopping-cart"
        :buttonName="$t('adminPage.menu.products')"
        :productsVal="productsBadgeLength"
      />

      <!-- categories -->
      <ListItem
        :url="`/${$i18n.locale}/admin/categories`"
        iconName="shopping-cart"
        buttonName="categories"
        underConstruction
      />

      <!-- orders -->
      <ListItem
        :url="`/${$i18n.locale}/admin/orders`"
        iconName="gem"
        :buttonName="$t('adminPage.menu.orders')"
        underConstruction
      />

      <!-- profile -->
      <ListItem
        :url="`/${$i18n.locale}/admin/profile`"
        iconName="user"
        :buttonName="$t('adminPage.menu.profile')"
      />

      <!-- users -->
      <li class="sidebar-dropdown">
        <router-link :to="`/${$i18n.locale}/admin/users`">
          <i class="fas fa-users"></i>
          <span class="menu-text mx-2">{{ $t('adminPage.menu.users') }}</span>
          <span class="badge badge-pill badge-primary">{{ usersBageLength }}</span>
        </router-link>
      </li>

      <!-- logout -->
      <li class="sidebar">
        <a href="#" @click.prevent="$emit('logout')">
          <i class="fa fa-power-off"></i>
          <span class="menu-text mx-2">{{ $t('adminPage.menu.logout') }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    ListItem,
    SidebarSearch,
    SidebarHeader,
    SidebarBrand,
  }
  from './'

  export default {
    name: 'SidebarMenu',
    components: {
      SidebarBrand,
			SidebarHeader,
			SidebarSearch,
			ListItem
    },
    props: {
      productsBadgeLength: {
        type: Number,
        default: 0
      },
      usersBageLength: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>