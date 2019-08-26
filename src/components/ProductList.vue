<template>
    <mdb-container>
        <h2 class="text-center mt-5 font-weight-bold">{{ $t('intro.title') }}</h2>
        <mdb-col md="10" class="mx-auto text-center text-muted mb-5">
          <p>{{ $t('intro.body') }}</p>
        </mdb-col>
        <mdb-row>
          <mdb-col md="3" class="mb-5" v-for="product in products" :key="product.id">
            <mdb-card class="animated fadeIn">
              <mdb-card-body>
              <carousel :perPage="1" >
              <slide v-for="(image, index) in product.images" :key="index.id">
              <mdb-card-image :src="image" alt="Card image cap" style="max-width:100%"></mdb-card-image>
              </slide>
            </carousel>
                <mdb-card-title class="d-flex justify-content-between">
                  <strong>{{ product.name }}</strong>
                  <mdb-badge color="warning">{{ product.price | currency }}</mdb-badge>
                </mdb-card-title>
                <mdb-card-text v-html="product.info"></mdb-card-text>
                  <add-to-cart
                    :name="product.name"
                    :price="product.price"
                    :p-id="product.id"
                    :image="getImage(product.images)"
                    >
                  </add-to-cart>
              </mdb-card-body>
            </mdb-card>
          </mdb-col>
        </mdb-row>
      </mdb-container>
</template>

<script>
import {db} from '../assets/js/firebase';

import { mdbContainer, 
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

import { Carousel, Slide } from 'vue-carousel';

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
    firestore () {
      return {
        // Collection
        products: db.collection('products'),
      }
    },
    methods: {
      getImage(images) {
        return images[0];
      }
    },
  
}
</script>
