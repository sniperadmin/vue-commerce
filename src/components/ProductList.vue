<template>
  <mdb-container>
    <h2 class="text-center mt-5 font-weight-bold">{{ $t('intro.title') }}</h2>
    <mdb-col md="10" class="mx-auto text-center text-muted mb-5">
      <p>{{ $t('intro.body') }}</p>
    </mdb-col>
    <mdb-row>
      <mdb-col md="3" class="mb-5" v-for="(product, index) in products" :key="index">
        <mdb-card class="animated fadeIn" v-animateOnScroll="{ animation: 'fadeInLeft' }">
          <mdb-card-body>
            <carousel :perPage="1" >
              <slide v-for="(image, index) in product.images" :key="index.id">
                <mdb-card-image :src="image" alt="Card image cap"
                  v-animateOnScroll="{ animation: 'fadeIn', delay: 1000 }"></mdb-card-image>
              </slide>
            </carousel>
            <mdb-card-title class="d-flex justify-content-between">
              <strong>{{ product.name }}</strong>
              <mdb-badge color="warning">{{ product.price | currency }}</mdb-badge>
            </mdb-card-title>
            <!-- <mdb-card-text v-html="product.info"></mdb-card-text> -->
            <add-to-cart :name="product.name" :price="product.price" :p-id="product.id"
              :image="product.images[0]">
            </add-to-cart>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
  import {
    db
  } from '../assets/js/firebase';
  import i18n from '../i18n';
  import {
    mdbContainer,
    mdbJumbotron,
    mdbCol,
    mdbRow,
    mdbIcon,
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbBtn,
    mdbEdgeHeader,
    mdbCard,
    mdbCardImage,
    mdbCardTitle,
    mdbCardText,
    mdbCardBody,
    animateOnScroll,
    mdbBadge,
  } from 'mdbvue';

  import {
    Carousel,
    Slide
  } from 'vue-carousel';

  export default {
    name: "product-list",

    components: {
      mdbContainer,
      mdbCol,
      mdbRow,
      mdbIcon,
      mdbNavbar,
      mdbNavItem,
      mdbNavbarNav,
      mdbNavbarToggler,
      mdbBtn,
      mdbEdgeHeader,
      mdbCard,
      mdbCardImage,
      mdbCardTitle,
      mdbCardText,
      mdbCardBody,
      mdbJumbotron,
      Carousel,
      Slide,
      mdbBadge,
    },
    data() {
      return {
        reversed: false
      }
    },
    directives: {
      animateOnScroll,
    },
    firestore() {
      return {
        // Collection
        products: db.collection('products'),
      }
    },
    methods: {
      // getImage(images) {
      //   images[0]
      //   // console.log(images[0])
      // },
    },
  }
</script>

<style>
/* .VueCarousel-inner {
    direction: ltr !important;
  } */
</style>