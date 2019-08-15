<template>
  <div class="register">

    <b-modal ref="my-modal" id="modal-1" scrollable title="Bootstrap Vue Modal">
      <b-tabs pills align="center" justified>
        <b-tab title="Login" active>
          <b-card-text>
            <form @submit.prevent="login" autocomplete="off">
              <div class="grey-text">
                <mdb-input v-model="email" label="Your email" icon="envelope" type="email" />
                <mdb-input v-model="password" label="Your password" icon="lock" type="password" />
              </div>
              <div class="text-center">
                <mdb-btn >Login</mdb-btn>
              </div>
            </form>
          </b-card-text>
        </b-tab>

        <b-tab title="Register">
          <b-card-text>

            <!-- Code for Registration Form Here -->

            <article class="card-body mx-auto" style="max-width: 400px;">
              <h4 class="card-title mt-3 text-center">Create Account</h4>
              <p class="text-center">Get started with your free account</p>
              <p>
                <a class="btn btn-block btn-twitter white-text" href=""> <i class="fab fa-twitter"></i> &nbsp; Login via
                  Twitter</a>
                <a class="btn btn-block btn-facebook white-text" href=""> <i class="fab fa-facebook-f"></i> &nbsp; Login
                  via facebook</a>
              </p>
              <p class="divider-text">
                <span>OR</span>
              </p>
              <form @submit.prevent="register" autocomplete="off">
                <div class="form-group input-group">

                  <!-- Error validation -->
                  <!-- <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                      <li v-for="(error, index) in errors"
                      :key="index"
                      >{{ error }}</li>
                    </ul>
                  </p> -->

                  <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                  </div>
                  <input v-model="name" class="form-control" type="text" placeholder="Full name" autocomplete="off">
                </div> <!-- form-group// -->
                <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                  </div>
                  <input v-model="email" class="form-control" type="email" placeholder="Email address">
                </div> <!-- form-group// -->
                <!-- <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                  </div>
                  <select class="custom-select" style="max-width: 120px;">
                    <option selected="">+971</option>
                    <option value="1">+972</option>
                    <option value="2">+198</option>
                    <option value="3">+701</option>
                  </select>
                  <input v-model="phone" class="form-control" type="text" placeholder="Phone number">
                </div> form-group// -->
                <!-- <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-building"></i> </span>
                  </div>
                  <select class="form-control">
                    <option selected=""> Select job type</option>
                    <option>Designer</option>
                    <option>Manager</option>
                    <option>Accaunting</option>
                  </select>
                </div> form-group end.// -->
                <div class="form-group input-group">
                  <!-- <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                  </div>
                  <input class="form-control" type="password" placeholder="Create password"> -->
                </div> <!-- form-group// -->
                <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                  </div>
                  <input v-model="password" class="form-control" type="password" placeholder="Repeat password">
                </div> <!-- form-group// -->
                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit">Create Account</button>
                </div> <!-- form-group// -->
                <p class="text-center">Have an account? <a href="">Log In</a> </p>
              </form>
            </article>

          </b-card-text>
        </b-tab>
      </b-tabs>
      <div slot="modal-footer" class="w-100">
        <span>Nasr Galal Designs</span>
        <b-button variant="primary" size="sm" class="float-right" @click="hideModal">
          Close
        </b-button>
      </div>

    </b-modal>
  </div>
</template>

<script>
  import {fbAuth, db} from '../assets/js/firebase';
  import {
    mdbTabs,
    mdbInput,
    mdbBtn,
    mdbRow
  } from 'mdbvue';
  export default {
    name: "register",
    props: {
      msg: String
    },
    components: {
      mdbTabs,
      mdbInput,
      mdbBtn,
      mdbRow
    },
    data() {
      return {
        // errors:[],
        name: null,
        email: null,
        password: null
      }
    },
    methods: {
      hideModal() {
        this.$refs['my-modal'].hide();
      },
      login() {
        let email = this.email,
            password = this.password;
        
        fbAuth.auth().signInWithEmailAndPassword(email, password)
          .then(()=> {
            this.hideModal();
            this.$router.replace('admin');
          })
          .catch(function(error) {
          // Handle Errors here
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
              } else {
              alert(errorMessage);
              }
            // console.log(error);
            alert(error);
            // [END_EXCLUDE]
        });

      },
      register() {
        // Sign in with email and pass.
        // [START createwithemail]
          let email = this.email,
              password = this.password;

          this.errors = [];

          if((name) && (email)) {return true;}
            
          if (name == !name) { return false; this.errors.push('Name empty!');}
          if (email == !email) { return false; this.errors.push('Email Required!');}

          fbAuth.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
              this.hideModal();
              
              // Add a new document with a generated id.
              db.collection("profiles").doc(user.user.uid).set({
                name: this.name,
                phone: null,
                address: null,
                postcode: null,
              })
              .then(() => {
                  console.log("Document written with ID: ");
              })
              .catch(error => {
                  console.error("Error adding document: ", error);
              });

              this.$router.replace('admin');
            })
            .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
              } else {
                alert(errorMessage);
              }
            // console.log(error);
            alert(error);
            // [END_EXCLUDE]
          });
          // [END createwithemail]
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>