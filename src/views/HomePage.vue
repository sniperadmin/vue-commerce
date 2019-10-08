<template>
    <div>
    <mdb-card class="card-image" style="background-image: url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)">
        <div class="text-white text-center py-5 px-4 my-5">
          <flip-countdown deadline="2020-5-30 00:00:00"></flip-countdown>
          <div>
            <h2 class="card-title h1-responsive pt-3 mb-5 font-bold mt-5"><strong>{{ $t('jumbotron.title') }}</strong></h2>
            <h4 class="mx-5 mb-5">{{ $t('jumbotron.body') }}</h4>
            <mdb-btn outline="white" size="md" icon="clone">{{ $t('jumbotron.button') }}</mdb-btn>
          </div>
        </div>
    </mdb-card>
      
      <product-list></product-list>

      <mini-cart></mini-cart>
    </div>
</template>

<script>
import FlipCountdown from 'vue2-flip-countdown';
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

export default {
  name: 'HomePage',
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
    mdbBadge,
    FlipCountdown,
  },
  directives: {
    animateOnScroll
  },
  data() {
    return {
      // products: [],
    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.home-feature-box {
  padding: 40px 0;
}

.home-feature-box i {
  font-size: 6rem;
}

.home-feature-box span {
  display: block;
  color: black;
  font-size: 20px;
  font-weight: bold;
  padding-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  color: #42b983;
}

.home-page-background {
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background: url('../assets/img/prof.svg') center;
  background-size: contain;
}

</style>
