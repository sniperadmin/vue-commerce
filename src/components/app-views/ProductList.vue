<template>
  <mdb-container>
    <!-- some intro -->
    <h2 class="text-center mt-5 font-weight-bold">{{ $t('intro.title') }}</h2>
    <mdb-col md="10" class="mx-auto text-center text-muted mb-5">
      <p>{{ $t('intro.body') }}</p>

      <mdb-row class="justify-content-center pt-4">
        <!-- search -->
        <mdb-col md="6">
          <b-form-group :label="$t('search.label')" label-cols-sm="3" label-align-sm="right" label-size="sm"
            label-for="filterInput" class="mb-0">
            <b-input-group size="sm">
              <b-form-input @input="searchNow()" v-model="search" type="search" id="filterInput"
                :placeholder="$t('search.input')">
              </b-form-input>
              <b-input-group-append>
                <b-button :disabled="!search" @click="search = ''">{{ $t('search.clear') }}</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </mdb-col><!-- ./search -->

        <!-- display total -->
        <mdb-col md="6">
          <p class="h2-responsive">{{ $t('total') }}
            <b-badge>{{ !search ? products.length : searchResults.length }}</b-badge>
          </p>
        </mdb-col>
      </mdb-row>
    </mdb-col>

    <mdb-row>
      <mdb-col md="3" class="mb-5" v-for="(product, index) in !search ? products : searchResults" :key="index">
        <mdb-card class="animated fadeIn">
          <mdb-card-body>
            <carousel :perPage="1">
              <slide v-for="(image, index) in product.images" :key="index.id">
                <mdb-card-image :src="image" alt="Card image cap" v-if="product.images"></mdb-card-image>
              </slide>
            </carousel>
            <mdb-card-title class="d-flex justify-content-between">
              <p style="font-size: 18px" class="p-1">{{ product.name }}</p>
              <div>
                <b-badge variant="warning">{{ product.price | currency }}</b-badge>
              </div>
            </mdb-card-title>
            <!-- <mdb-card-text v-html="product.info"></mdb-card-text> -->
            <mdb-row class="justify-content-center mb-2">
              <mdb-col md="10" class="mb-2">
                <b-button block variant="success" pill @click="info(product)">
                  <i class="fas fa-info-circle fa-lg pl-2 pr-2"></i>
                  <span class="h5-responsive font-weight-bold">{{ $t('card.info') }}</span>
                </b-button>
              </mdb-col>
              <mdb-col md="12" class="mb-2">
                <add-to-cart :name="product.name" :price="product.price" :p-id="product.id" :image="product.images[0]"></add-to-cart>
              </mdb-col>
            </mdb-row>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
    <!-- if no search results -->
    <mdb-container>

      <mdb-row class="text-center">
        <mdb-col md="12" v-if="search && !searchResults.length">
          <mdb-alert color="warning">
            {{ $t('search.no-res') }}
          </mdb-alert>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <!-- modal -->
    <b-modal ref="test" id="modal-info" title="product details" size="xl" centered ok-only>
      <div class="row no-gutters">
        <aside class="col-sm-5 border-right">
          <article class="gallery-wrap">
            <div class="img-big-wrap">
              <div><img :src="clickedSrc ? clickedSrc : chosenProduct.images[0]"></div>
            </div> <!-- slider-product.// -->
            <div class="img-small-wrap">
              <div class="item-gallery" id="test" v-for="(image, index) in chosenProduct.images" :key="index"
                @click="maximize(image)">
                <img :src="image">
              </div>
            </div> <!-- slider-nav.// -->
          </article> <!-- gallery-wrap .end// -->
        </aside>
        <aside class="col-sm-7">
          <article class="p-5">
            <h3 class="title mb-3">{{ chosenProduct.name }}</h3>

            <div class="mb-3">
              <var class="price h3 text-warning">
                <span class="num">{{ chosenProduct.price | currency }}</span>
              </var>
              <!-- <span>/per kg</span> -->
            </div> <!-- price-detail-wrap .// -->
            <dl>
              <dt>Description</dt>
              <dd>
                <p v-html="chosenProduct.info"></p>
              </dd>
            </dl>
            <dl class="row">
              <dt class="col-sm-3">Model#</dt>
              <dd class="col-sm-9">12345611</dd>

              <dt class="col-sm-3">Color</dt>
              <dd class="col-sm-9">Black and white </dd>

              <dt class="col-sm-3">Delivery</dt>
              <dd class="col-sm-9">Russia, USA, and Europe </dd>
            </dl>
            <div class="rating-wrap">

              <ul class="rating-stars mr-2">
                <li class="stars-active" style="width:80%">
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </li>
                <li>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </li>
              </ul>
              <div class="label-rating">132 reviews</div>
              <div class="label-rating">154 orders </div>
            </div> <!-- rating-wrap.// -->
            <hr>
            <div class="row">
              <div class="col-sm-7">
                <dl class="dlist-inline">
                  <dt>Size: </dt>
                  <dd>
                    <label class="form-check form-check-inline ml-2">
                      <input name="inlineRadioOptions" class="form-check-input" id="inlineRadio2" type="radio"
                        value="option2">
                      <span class="form-check-label">SM</span>
                    </label>
                    <label class="form-check form-check-inline">
                      <input name="inlineRadioOptions" class="form-check-input" id="inlineRadio2" type="radio"
                        value="option2">
                      <span class="form-check-label">MD</span>
                    </label>
                    <label class="form-check form-check-inline">
                      <input name="inlineRadioOptions" class="form-check-input" id="inlineRadio2" type="radio"
                        value="option2">
                      <span class="form-check-label">XXL</span>
                    </label>
                  </dd>
                </dl> <!-- item-property .// -->
              </div> <!-- col.// -->
            </div> <!-- row.// -->
            <hr>
            <div class="d-inline-block">
              <add-to-cart :name="chosenProduct.name" :price="chosenProduct.price" :p-id="chosenProduct.id"
                :image="chosenProduct.images[0]">
              </add-to-cart>
            </div>
          </article> <!-- card-body.// -->
        </aside> <!-- col.// -->
      </div> <!-- row.// -->
    </b-modal>

  </mdb-container>
</template>

<script>
  import {
    db
  } from '../../assets/js/firebase';
  import i18n from '../../i18n';
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
    mdbAlert,
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
      mdbAlert,

    },
    data() {
      return {
        reversed: false,
        chosenProduct: {
          name: null,
          category: null,
          info: null,
          price: null,
          tags: [],
          images: [],
        },
        clickedSrc: null, // for modals
        clicked: false, // for modals
        search: '',
        searchResults: [],
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
      info(x) {
        // this.$bvModal.show('modal-info')
        this.clickedSrc = null
        this.$refs['test'].show()
        this.chosenProduct = x;
      },
      maximize(y) {
        this.clickedSrc = y
        this.clicked = true
      },
      searchNow() {
        this.searchResults = this.products.filter(product => {
          let print = product.name.toLowerCase().indexOf(this.search.toLowerCase()) != "-1";
          return print
        });
      }
    },
    created() {
      let car = document.getElementsByClassName('VueCarousel-inner');
      if (i18n.locale === 'ar') {
        setTimeout(() => {
          for (var i in car) {
            car[i].style.flexDirection = "row-reverse"
          }
        }, 3000)
      } else {
        setTimeout(() => {
          for (var i in car) {
            car[i].style.flexDirection = "row"
          }
        }, 3000)
      }
    }
  }
</script>

<style scoped>
  .customBorder {
    border: 1px solid red;
  }
</style>