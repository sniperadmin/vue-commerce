<template>
  <div class="about mt-5 pt-5">
    <div class="container h-100 pt-5">
        <div class="h-100 align-items-center row">
          <div class="col-md-6">
            <h2>{{ $t('about.title') }}</h2>
            <h5 class="h5-responsive">
                {{ $t('about.content') }}
            </h5>
          </div>
          <div class="col-md-6">
            <img src="@/assets/img/about.svg" class="img-fluid" alt="overview image">
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
