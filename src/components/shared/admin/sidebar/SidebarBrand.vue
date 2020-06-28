<template>
  <!-- sidebar-brand  -->
  <div class=" sidebar-brand">
    <a>Vue-Commerce</a>
    <b-button variant="light" class="p-1 mt-0 float-right" @click="$emit('click')">
      <i class="fas fa-times fa-md"></i>
    </b-button>
  </div>
</template>

<script>
  export default {
    name: 'SidebarBrand',
  }
</script>

<style lang="scss" scoped>

</style>