import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let cart = window.localStorage.getItem('cart');

const store = new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : [],
    users: [],
    products: [],
  },
  getters: {
    totalPrice: state => {
      let total = 0;
      state.cart.filter(item => {
        total += item.productPrice * item.productQuantity;
      });
      return total;
    },
  },
  actions: {
    listAllUsers(context) {
      this.loading = true
      axios.get('https://us-central1-vue-shop-e3547.cloudfunctions.net/listUsers')
        .then(response => {
          // console.log(response.data.users)
          context.commit('loadUserData', response.data.users)
          // state.users.push(response.data.users)
        })
        .catch(err => console.log(err))
    },
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
    decreaseQuantity(state, item) {
      let spotted = state.cart.find(product => 
        product.productId == item.productId);
      if (spotted) {
        if (spotted.productQuantity > 1) {
          spotted.productQuantity-- ;
        }
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
    },
    loadUserData(state, payload) {
      state.users = payload;
    },
  }
});

export default store;