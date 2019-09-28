<template>
    <div class="add-to-cart">
        <b-button block variant="primary" pill @click="addToCart">
          <i class="fas fa-cart-plus fa-lg pr-1 pl-1"></i> 
          <span class="h5-responsive font-weight-bold">
            {{ $t('card.addToCart') }}
          </span>
        </b-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
export default {
  name: "add-to-cart",
  props: {
    name: String,
    price: String,
    pId: String,
    image: String,
  },
  data() {
    return {
      item: {
        productName: this.name,
        productPrice: this.price,
        productId: this.pId,
        productImage: this.image,
        productQuantity: 1,
      }
    }
  },
  methods: {
    addToCart() {
      this.$bvModal.show('my-cart');
      this.$store.commit('addToCart', this.item);
      console.log(this.item)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
