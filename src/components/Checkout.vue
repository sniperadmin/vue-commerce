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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkout",
  props: {
    msg: String
  },
  computed: {
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
