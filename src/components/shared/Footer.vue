<template>
    <!-- footer -->
    <mdb-footer v-if="!$route.meta.hideNavigation" color="stylish-color">
      <div style="backgroundColor: #6351ce">
        <mdb-container class="text-center">
          <b-row class="align-items-between">
            <b-col md="6" class="text-center mt-2 mb-1">
              <h6 class="white-text">{{ $t('footer.get-connected') }}</h6>
            </b-col>
            <b-col md="6" class="text-center mt-2 mb-1">
              <a><i class="fab fa-facebook white-text mr-4"></i></a>
              <a><i class="fab fa-twitter white-text mr-4"> </i></a>
              <a><i class="fab fa-google-plus white-text mr-4"> </i></a>
              <a><i class="fab fa-linkedin-in white-text mr-4"> </i></a>
              <a><i class="fab fa-instagram white-text mr-4"> </i></a>
            </b-col>
          </b-row>
        </mdb-container>
    </div>

    <mdb-container class="mt-5 mb-4 mx-auto text-center">
      <b-row class="mt-3 align-items-center" align-h="center">
        <b-col md="3" lg="4" xl="3" class="mb-4">
          <h6 class="text-uppercase font-weight-bold"><strong>Vue Commerce</strong></h6>
          <hr class="deep-purple accent-1 mb-4 mt-0 mx-auto" style="width: 60px;" />
          <p>{{ $t('footer.comment') }}</p>
        </b-col>

        <b-col md="2" lg="2" xl="2" class="mb-4">
          <h6 class="text-uppercase font-weight-bold"><strong>{{ $t('footer.plugins') }}</strong></h6>
          <hr class="deep-purple accent-1 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <p>
            <a href="https://mdbootstrap.com" target="_blank">
              {{ $t('footer.mdb') }}
            </a>
          </p>
          <p>
            <a href="https://bootstrap-vue.js.org" target="_blank">
              {{ $t('footer.bootstrapvue') }}
            </a>
          </p>
          
        </b-col>
        <b-col md="3" lg="2" xl="2" class="mb-4">
          <h6 class="text-uppercase font-weight-bold"><strong>{{ $t('footer.links') }}</strong></h6>
          <hr class="deep-purple accent-1 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <p><a href="https://forums.coretabs.net" target="_blank">{{ $t('footer.coretabs') }}</a></p>
          <p><a href="https://www.arabcoders.ae/" target="_blank">{{ $t('footer.arabcoders') }}</a></p>
        </b-col>

        <b-col md="4" lg="3" xl="3" class="mb-4">
          <h6 class="text-uppercase font-weight-bold"><strong>{{ $t('footer.contact') }}</strong></h6>
          <hr class="deep-purple accent-1 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <p><i class="fas fa-home mr-3 ml-3"></i> {{ $t('footer.country') }}</p>
          <p><i class="fas fa-envelope mr-3 ml-3"></i> {{ $t('footer.email') }}</p>
          <p><i class="fas fa-phone mr-3 ml-3"></i> {{ $t('footer.phone') }}</p>
        </b-col>
      </b-row>
    </mdb-container>

      <p class="footer-copyright mb-0 py-3 text-center">
        {{new Date().getFullYear()}} &copy; {{ $t('footer.copyright')}}: <a href="https://forums.coretabs.net/sniperadmin"> {{ $t('footer.name') }} </a>
      </p>
    </mdb-footer>
</template>

<script>
    import { mdbContainer, mdbFooter } from 'mdbvue';
export default {
    name: 'footer',
    components: {
        mdbContainer,
        mdbFooter
    },

}
</script>