<template>
  <!-- sidebar-header  -->
  <div class="sidebar-item sidebar-header d-flex flex-nowrap">
    <div class="user-pic">
      <img class="img-responsive img-rounded"
        src="https://image.flaticon.com/icons/svg/236/236832.svg" alt="User picture">
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
</template>

<script>
  export default {
    name: 'SidebarHeader',
    props: {
      email: {
        type: String,
        default: 'test@me.com'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>