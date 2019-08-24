<template>
  <div class="checkout">
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-9 mb-4">
          <h2 class="h2-responsive">Checkout Page</h2>

          <b-list-group>
            <b-list-group-item v-for="(item, index) in this.$store.state.cart" :key="index">
              <img class="float-left" :src="item.productImage" width="80px" :alt="item.productName">
              <span class="float-right" style="cursor: pointer" @click="$store.commit('removeData', item)">X</span>
              <h3 class="h3-responsive">{{ item.productName }}</h3>
              <p class="pt-0">{{ item.productPrice | currency }}</p>
              <p class="pt-0">Quantity: {{ item.productQuantity }}</p>
            </b-list-group-item>
          </b-list-group>

        </div>
        <div class="col-md-3">
          <h3 class="h3-responsive">Total Price:</h3>
          <h3 class="h3-responsive">{{ totalPrice | currency }}</h3>
          <b-button @click="payment" variant="warning">Checkout</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const stripe = Stripe("pk_test_EkgRdwSuRpwR0FUEsUSMJVCw00HJk4Sukt");

export default {
  name: "checkout",
  props: {
    msg: String
  },
  data() {
    return {
      sessionId: ''
    } 
  },
  methods: {
    payment() {

      let purchases = this.$store.state.cart.map(item => ({ [item.productId] : item.productQuantity }));
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
  created() {
  
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
