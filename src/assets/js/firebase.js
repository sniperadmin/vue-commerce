import Vue from 'vue';
import firebase from 'firebase';
import 'firebase/storage';
import VueFirestore from 'vue-firestore';
require("firebase/firestore");

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true
});

const firebaseConfig = {
  apiKey: "AIzaSyDysFijkiv4oY64bY61kUVavBCEYE8rhsg",
  authDomain: "vue-shop-e3547.firebaseapp.com",
  databaseURL: "https://vue-shop-e3547.firebaseio.com",
  projectId: "vue-shop-e3547",
  storageBucket: "vue-shop-e3547.appspot.com",
  messagingSenderId: "10671603786",
  appId: "1:10671603786:web:48ee8e706025b608"
};

const fbAuth = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const functions = firebase.functions();
export {fbAuth, db, functions}
// export default fbAuth;
