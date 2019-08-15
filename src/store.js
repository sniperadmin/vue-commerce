import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let cart = window.localStorage.getItem('cart');

const store = new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : [],
  },
  getters: {
    totalPrice: state => {
      let total = 0;
      state.cart.filter(item => {
        total += item.productPrice * item.productQuantity;
      });
      return total;
    }
  },
  mutations: {
    addToCart(state, item) {
      let spotted = state.cart.find(product => 
        product.productId == item.productId);
      
      if (spotted) {
        spotted.productQuantity++ ;
      } else {
        state.cart.push(item);
      }
      this.commit('saveData');
    },

    saveData(state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeData(state, item) {
      let index = state.cart.indexOf(item);
      state.cart.splice(index, 1);
      this.commit('saveData');
    }
  }
});

export default store;