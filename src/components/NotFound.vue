<template>
  <div v-if="!$route.meta.hideNavigation">
    <div class="profile mt-4 pt-4">
    <div class="container h-100 mt-4">
      <div class="intro h-100">

        <!-- code here -->
        page not found

      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
