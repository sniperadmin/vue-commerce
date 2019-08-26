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
              <small class="text-danger" v-if="boo">{{ boo }}</small>
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
              <form @submit.stop.prevent="register" autocomplete="off">

                  <b-form-group id="example-input-group-1" label="Email:" label-for="email-form"
                    label-cols-sm="3"
                    label-cols-lg="3">
                    <b-form-input
                      id="email-form"
                      name="email-form"
                      v-model="$v.email.$model"
                      :state="$v.email.$touch ? !$v.email.$error : null"
                      aria-describedby="email-live-feedback"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="email-live-feedback" v-if="$v.email.email">
                         This is a required field.
                      </b-form-invalid-feedback>
                    <b-form-invalid-feedback id="email-live-feedback" v-if="$v.email.required">
                         must be a valid email.
                    </b-form-invalid-feedback>
                  
                    <b-form-valid-feedback id="email-live-feedback">Looks good!</b-form-valid-feedback>
                  </b-form-group>

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
               
               <b-form-group id="example-input-group-1" label="Password: " label-for="password-form"
                label-cols-sm="3"
                label-cols-lg="3">
                    <b-form-input
                      id="password-form"
                      name="password-form"
                      type="password"
                      v-model="$v.password.$model"
                      :state="$v.password.$touch ? !$v.password.$error : null"
                      aria-describedby="password-live-feedback"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="password-live-feedback" v-if="$v.password.minLength">
                         This is a required field.
                      </b-form-invalid-feedback>
                    <b-form-invalid-feedback id="password-live-feedback" v-if="$v.password.required">
                        Field must be {{ $v.password.$params.minLength.min }} characters.
                    </b-form-invalid-feedback>
                  
                    <b-form-valid-feedback id="password-live-feedback">Looks good!</b-form-valid-feedback>
                  </b-form-group>

                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit" :disabled="$v.$invalid">Create Account</button>
                </div> <!-- form-group// -->
                <p class="text-center">Have an account? <a href="">Log In</a> </p>
              </form>
              <p v-if="boo">{{ boo }}</p>
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
    import { validationMixin } from 'vuelidate';
  import { required, minLength, email } from 'vuelidate/lib/validators';

  import {
    mdbTabs,
    mdbInput,
    mdbBtn,
    mdbRow
  } from 'mdbvue';
  export default {
    mixins: [validationMixin],
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
        password: null,
        boo: '',
      }
    },
    validations: {
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(8),
        }
    },
    methods: {
      hideModal() {
        this.$refs['my-modal'].hide();
      },
      login() {
        let email = this.email,
            password = this.password;
        
        this.$Progress.start();
        
        fbAuth.auth().signInWithEmailAndPassword(email, password)
          .then(()=> {
            this.$Progress.finish();

            this.hideModal();

            Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Logged in successfully',
            showConfirmButton: false,
            timer: 1500
          });

        })
          .catch(error => {
          // Handle Errors here
          var errorCode = error.code;
          var errorMessage = error.message;
          this.$Progress.fail();
          // ...
          // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
              } else {
              this.boo = errorMessage;
              }
            // console.log(error);
            // [END_EXCLUDE]
        });
      },
      register() {
        // Sign in with email and pass.
        // [START createwithemail]
          let email = this.email,
              password = this.password;

          this.$v.$touch()
          if (this.$v.$anyError) {
            return
          }

          fbAuth.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
              this.hideModal();

              fbAuth.auth().currentUser.sendEmailVerification().then(function() {
                alert('Ver sent')
              }).catch(function(error) {
                console.log(error)
              });

              // Add a new document with a generated id.
              db.collection("profiles").doc(user.user.uid).set({
                name: this.name,
                phone: null,
                address: null,
                postcode: null,
                id: user.user.uid,
                email: this.email,
              })
              .then(user => {
                  console.log("Document written with ID: ", user);
              })
              .catch(error => {
                  console.error("Error adding document: ", error);
              });

            this.$router.replace('/');
            })
            .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
              } else {
              this.boo = errorMessage;
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