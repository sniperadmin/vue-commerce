<template>
  <div class="about mt-5 pt-5">
    <div class="container h-100 pt-5">
      <div class="h-100 align-items-center row">
        <div class="col-md-6">
          <h2>{{ $t('about.title') }}</h2>
          <h5 class="h5-responsive" v-html="$t('about.content')">
            <!-- {{ $t('about.content') }} -->
          </h5>
        </div>
        <div class="col-md-6">
          <img src="@/assets/img/about.svg" class="img-fluid" alt="overview image">
        </div>
      </div>

      <hr>
      <section class="text-center">
        <h3 class="h3-responsive font-weight-bold my-5">{{ $t('about.programmer') }}</h3>

        <mdb-row class="mb-4">
          <mdb-col md="12" class="mb-lg-0 mb-5">
            <img tag="img" src="https://forums.coretabs.net/user_avatar/forums.coretabs.net/sniperadmin/120/2258_2.png"
              class="z-depth-1 rounded-circle" alt="Sample avatar" />
            <h5 class="font-weight-bold mt-4 mb-3">{{ $t('about.nasr') }}</h5>
            <p class="text-uppercase blue-text">{{ $t('about.nasr-job') }}</p>
            <p class="grey-text"> {{ $t('about.nasr-quote') }}</p>
            <ul class="list-unstyled mb-0">
              <a class="p-2 fa-lg" href="https://www.facebook.com/nasr.galal" target="_blank">
                <mdb-icon fab icon="facebook" class="blue-text" data-toggle="tooltip" title="facebook" />
              </a>
              <a class="p-2 fa-lg" href="https://forums.coretabs.net/u/sniperadmin" target="_blank">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/vue-shop-e3547.appspot.com/o/products%2Fcoretabs.png?alt=media&token=efd8b904-1d4d-4dee-b265-40e046528df8"
                  alt="coretabs link" style="width: 23px" data-toggle="tooltip" title="coretabs"
                  class="blue-text rounded-circle" />
              </a>
            </ul>
          </mdb-col>
        </mdb-row>

        <hr class="mt-4">

        <h3 class="h3-responsive font-weight-bold my-5">{{ $t('about.teachers') }}</h3>

        <mdb-row>
          <mdb-col md="6" class="mb-lg-0 mb-5">
            <img tag="img"
              src="https://forums.coretabs.net/user_avatar/forums.coretabs.net/yaseralnajjar/120/1862_2.png"
              class="z-depth-1 rounded-circle" alt="Sample avatar" />
            <h5 class="font-weight-bold mt-4 mb-3">{{ $t('about.yaser') }}</h5>
            <p class="text-uppercase blue-text">{{ $t('about.yaser-job') }}</p>
            <p class="grey-text">{{ $t('about.yaser-quote') }}</p>
            <ul class="list-unstyled mb-0">
              <a class="p-2 fa-lg" href="https://www.facebook.com/yasser.alnajar.56" target="_blank">
                <mdb-icon fab icon="facebook" class="blue-text" data-toggle="tooltip" title="facebook" />
              </a>
              <a class="p-2 fa-lg" href="https://forums.coretabs.net/u/yaseralnajjar" target="_blank">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/vue-shop-e3547.appspot.com/o/products%2Fcoretabs.png?alt=media&token=efd8b904-1d4d-4dee-b265-40e046528df8"
                  alt="coretabs link" style="width: 23px" data-toggle="tooltip" title="coretabs"
                  class="blue-text rounded-circle" />
              </a>
            </ul>

          </mdb-col>
          <mdb-col md="6" class="mb-lg-0 mb-5">
            <img tag="img" src="https://forums.coretabs.net/user_avatar/forums.coretabs.net/alhakem/120/2203_2.png"
              class="z-depth-1 rounded-circle" alt="Sample avatar" />
            <h5 class="font-weight-bold mt-4 mb-3">{{ $t('about.hakem') }}</h5>
            <p class="text-uppercase blue-text">{{ $t('about.hakem-job') }}</p>
            <p class="grey-text">{{ $t('about.yaser-quote') }}</p>
            <ul class="list-unstyled mb-0">
              <a class="p-2 fa-lg" href="https://www.facebook.com/mo.alhakem" target="_blank">
                <mdb-icon fab icon="facebook" class="blue-text" />
              </a>
              <a class="p-2 fa-lg" href="https://forums.coretabs.net/u/Alhakem" target="_blank">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/vue-shop-e3547.appspot.com/o/products%2Fcoretabs.png?alt=media&token=efd8b904-1d4d-4dee-b265-40e046528df8"
                  alt="coretabs link" style="width: 23px" data-toggle="tooltip" title="coretabs"
                  class="blue-text rounded-circle" />
              </a>
            </ul>
          </mdb-col>

        </mdb-row>
      </section>

    </div>
  </div>
</template>

<script>
  import {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbIcon
  } from 'mdbvue';
  export default {
    name: "about",
    props: {
      msg: String
    },
    components: {
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbIcon
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>