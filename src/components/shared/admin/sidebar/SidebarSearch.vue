<template>
  <!-- sidebar-search  -->
  <div class="sidebar-item sidebar-search">
    <div>
      <div class="input-group">
        <input type="text" class="form-control search-menu"
          :placeholder="$t('adminPage.menu.search')">
        <div class="input-group-append">
          <span class="input-group-text">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SidebarSearch'
  }
</script>

<style lang="scss" scoped>

</style>