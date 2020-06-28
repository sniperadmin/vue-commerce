<template>
  <div class="mini-cart">
    
        <b-modal id="my-cart" title="My Shopping Cart">
          
          <b-list-group>
            <b-list-group-item v-for="(item, index) in this.$store.state.cart" :key="index">
              <img class="float-left mr-3" :src="item.productImage" width="105px" :alt="item.productName">
              <span class="float-right" style="cursor: pointer" @click="$store.commit('removeData', item)">X</span>
              <div>
                <h3 class="h3-responsive">{{ item.productName }}</h3>
                <p class="pt-0">{{ item.productPrice | currency }}</p>
                <b-row>
                  <p class="pt-0 mr-5">Quantity:</p>
                  <div class="quantity">
                    <a @click="$store.commit('decreaseQuantity', item)">
                      <i class="fas fa-minus mr-1"></i>
                    </a>
                    <input type="text" class="text-center" style="width: 50px" disabled :value="item.productQuantity">
                    <a @click="$store.commit('addToCart', item)">
                      <i class="fas fa-plus ml-1"></i>
                    </a>
                  </div>
                </b-row>
              </div>
            </b-list-group-item>
          </b-list-group>

          <template slot="modal-footer" slot-scope="{ cancel }">
            <b-button @click="checkOut()" variant="success">
                Checkout
            </b-button>

            <b-button @click="cancel()">
              Continue Shopping
            </b-button>
          </template>
        </b-modal>
  </div>
</template>

<script>
import i18n from '../i18n';
export default {
  name: "mini-cart",
  props: {
    msg: String
  },
  methods: {
    checkOut(){
      this.$router.push(`/${i18n.locale}/checkout`);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
