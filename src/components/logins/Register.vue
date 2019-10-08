<template>
  <div class="register">

    <b-modal ref="my-modal" id="modal-1" scrollable>

      <template slot="modal-header" slot-scope="{ close }">
        <h3>
          {{ $t('modal.title') }}
          </h3>
        <b-button variant="outline-danger pt-1 pb-1 pr-2 pl-2">
          <i class="fas fa-times" @click="close"></i>
        </b-button>
      </template>

      <b-tabs pills align="center" justified>
          <b-tab :title="$t('modal.tabs.login.title')" active>
          <b-card-text>
              <p class="text-center mt-3">{{ $t('modal.tabs.register.sub-heading') }}</p>
             <p>
                <fb-login></fb-login>
                <google-login></google-login>
                <github-login></github-login>
              </p>
              <p class="divider-text">
                <span>{{ $t('modal.tabs.register.or') }}</span>
              </p>
            <form @submit.prevent="login" autocomplete="off">
              <div class="grey-text">
                
                <mdb-input v-model="email" :label="$t('modal.tabs.login.email')" icon="envelope" type="email" />

                <mdb-input v-model="password" :label="$t('modal.tabs.login.password')" icon="lock" type="password" />
              </div>
              <small class="text-danger" v-if="boo">{{ boo }}</small>
              <div class="text-center">
                <mdb-btn >{{ $t('modal.tabs.login.button') }}</mdb-btn>
              </div>
            </form>
          </b-card-text>
        </b-tab>

        <b-tab :title="$t('modal.tabs.register.title')">
          <b-card-text>

            <!-- Code for Registration Form Here -->

            <article class="card-body mx-auto" style="max-width: 400px;">
              <h4 class="card-title mt-3 text-center">{{ $t('modal.tabs.register.heading') }}</h4>
              <p class="text-center">{{ $t('modal.tabs.register.sub-heading') }}</p>
              <p>
                <fb-login></fb-login>
                <google-login></google-login>
                <github-login></github-login>
              </p>
              <p class="divider-text">
                <span>{{ $t('modal.tabs.register.or') }}</span>
              </p>
              <form @submit.stop.prevent="register" autocomplete="off">
                  <b-form-group id="example-input-group-1" :label="$t('modal.tabs.register.email')" label-for="email-form"
                    label-cols-sm="3"
                    label-cols-lg="3">
                    <b-form-input
                      id="email-form"
                      name="email-form"
                      v-model="$v.email.$model"
                      :state="$v.email.$dirty ? !$v.email.$error : null"
                      aria-describedby="email-live-feedback"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="email-live-feedback" v-if="$v.email.email">
                         {{ $t('modal.tabs.register.email-invalid-1') }}
                      </b-form-invalid-feedback>
                    <b-form-invalid-feedback id="email-live-feedback" v-if="$v.email.required">
                          {{ $t('modal.tabs.register.email-invalid-2') }}
                    </b-form-invalid-feedback>
                  
                    <b-form-valid-feedback id="email-live-feedback">  {{ $t('modal.tabs.register.email-valid') }}</b-form-valid-feedback>
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
               
               <b-form-group id="example-input-group-1" :label="$t('modal.tabs.register.password')" label-for="password-form"
                label-cols-sm="3"
                label-cols-lg="3">
                    <b-form-input
                      id="password-form"
                      name="password-form"
                      type="password"
                      v-model="$v.password.$model"
                      :state="$v.password.$dirty ? !$v.password.$error : null"
                      aria-describedby="password-live-feedback"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="password-live-feedback" v-if="$v.password.minLength">
                         {{ $t('modal.tabs.register.password-invalid-1') }}
                      </b-form-invalid-feedback>
                    <b-form-invalid-feedback id="password-live-feedback" v-if="$v.password.required">
                        {{ $t('modal.tabs.register.password-invalid-2') }} {{ $v.password.$params.minLength.min }} {{ $t('modal.tabs.register.characters') }}
                    </b-form-invalid-feedback>
                  
                    <b-form-valid-feedback id="password-live-feedback">{{ $t('modal.tabs.register.password-valid') }} </b-form-valid-feedback>
                  </b-form-group>

                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit" :disabled="$v.$invalid">{{ $t('modal.tabs.register.button') }}</button>
                </div> <!-- form-group// -->
                <p class="text-center">{{ $t('modal.tabs.register.option') }} <span>{{ $t('modal.tabs.register.link') }}</span> </p>
              </form>
              <p v-if="boo">{{ boo }}</p>
            </article>
          </b-card-text>
        </b-tab>
      </b-tabs>
      <div slot="modal-footer" class="w-100">
        <span>{{ $t('modal.footer') }}</span>
        <b-button variant="primary" size="sm" class="float-right" @click="hideModal">
          {{ $t('modal.close') }}
        </b-button>
      </div>

    </b-modal>
  </div>
</template>

<script>
import {fbAuth, db} from '../../assets/js/firebase';
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
import i18n from '../../i18n';
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
      msg: String,
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
          this.boo = errorMessage;
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

              fbAuth.auth().currentUser.sendEmailVerification().then(() => {
                alert('Verification sent')
              }).catch(error => {
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