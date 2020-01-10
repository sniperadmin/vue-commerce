<template>
  <div class="checkout">
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-9 mb-4">
          <h2 class="h2-responsive">{{ $t('cart.title') }}</h2>

          <!-- alerts -->
          <transition name="slide">
            <mdb-alert color="warning" v-if="logged && !verified">
              <h4 class="alert-heading">{{ $t('alerts.verify') }}</h4>
              <hr>
              <p class="mb-0">{{ $t('alerts.verify-p') }}</p>
            </mdb-alert>

            <mdb-alert color="info" v-if="!logged && !verified">
              <h4 class="alert-heading">{{ $t('alerts.login') }}</h4>
              <hr>
              <p class="mb-0">{{ $t('alerts.login-p') }}</p>
            </mdb-alert>
          </transition>
          <!-- main content -->
          <b-list-group>
            <b-list-group-item v-for="(item, index) in this.$store.state.cart" :key="index">
              <div class="d-flex flex-row-reverse bd-highlight">
                <span style="cursor: pointer" @click="$store.commit('removeData', item)">X</span>
              </div>

              <div class="d-inline-flex align-items-center">
                <img class="mr-3" :src="item.productImage" width="100px" :alt="item.productName">
                <div>
                  <h3 class="h3-responsive">{{ item.productName }}</h3>
                  <p class="pt-0">{{ item.productPrice | currency }}</p>

                  <div class="d-flex">
                    <p class="pt-0">{{ $t('checkout.quantity') }} </p>
                    <div class="mx-1">
                    <a @click="$store.commit('addToCart', item)" class="mx-2">
                      <i class="fas fa-plus"></i>
                    </a>
                      <input type="text" class="text-center" style="width: 50px" disabled :value="item.productQuantity">
                    </div>
                    <a @click="$store.commit('decreaseQuantity', item)" class="mx-2">
                      <i class="fas fa-minus"></i>
                    </a>
                  </div>
                </div>
              </div>

            </b-list-group-item>
          </b-list-group>

        </div>
        <div class="col-md-3">
          <h3 class="h3-responsive">{{ $t('cart.total') }}</h3>
          <h3 class="h3-responsive">{{ totalPrice | currency }}</h3>
          <b-button disabled="disabled" @click="payment" variant="warning" v-if="logged && verified">Checkout</b-button>
          <b-button disabled="disabled" variant="warning" v-if="logged && !verified">{{ $t('alerts.verify-button') }}
          </b-button>
          <b-button disabled="disabled" variant="warning" v-if="!logged && !verified">{{ $t('alerts.login-button') }}
          </b-button>

          <paypal></paypal>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    fbAuth
  } from '../../assets/js/firebase';
  import axios from 'axios';
  const stripe = Stripe("pk_test_EkgRdwSuRpwR0FUEsUSMJVCw00HJk4Sukt");
  import {
    mdbAlert
  } from 'mdbvue';

  export default {
    name: "checkout",
    props: {
      msg: String
    },
    components: {
      mdbAlert
    },
    data() {
      return {
        sessionId: '',
        verified: true,
        logged: true,
      }
    },
    methods: {
      payment() {

        let purchases = this.$store.state.cart.map(item => ({
          [item.productId]: item.productQuantity
        }));
        purchases = Object.assign({}, ...purchases);
        console.log(purchases)

        axios.get('http://localhost:5000/vue-shop-e3547/us-central1/checkoutSession', {
            params: {
              products: purchases
            }
          })
          .then(response => {
            this.sessionId = response.data;
            // console.log('response: ' + response.data);
            stripe.redirectToCheckout({
              sessionId: this.sessionId.id,
            }).then((result) => {});
          })
          .catch(err => {
            console.log('Catch! :' + err);
          });

      }
    },
    computed: {
      totalPrice() {
        return this.$store.getters.totalPrice;
      }
    },
    beforeCreate() {
      fbAuth.auth().onAuthStateChanged(user => {
        if (user) {
          this.logged = true;
          this.verified = user.emailVerified;
        } else {
          this.logged = false;
          this.verified = false;
        }
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>