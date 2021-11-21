<template>
  <div class="adminlogin mt-5 pt-5 h-100 container">
    <section class="form-gradient">
      <mdb-row class="justify-content-md-center">
        <mdb-col md="5">
          <!-- login for admins -->
          <mdb-card v-if="!isAdmin">
            <div class="header pt-3 peach-gradient">
              <mdb-row class="d-flex justify-content-center">
                <h3 class="white-text mb-3 pt-3 font-weight-bold"> {{ $t('adminlogin.title') }}</h3>
              </mdb-row>
            </div>
            <!-- card-body -->
            <mdb-card-body class="mx-4 mt-4">
              <b-alert show variant="success">
                <h4 class="alert-heading">Demo</h4>
                <p>email: vue-commerce-admin@me.com</p>
                <p>password: 12345678</p>
              </b-alert>
              <!-- form starts here -->
              <form method="POST" @submit.prevent="login">
              <mdb-input v-model="email" :placeholder="$t('adminlogin.email')" type="email" outline />
              <mdb-input v-model="password" :placeholder="$t('adminlogin.password')" type="password" outline containerClass="mb-0"/>
              <mdb-row class="d-flex align-items-center mb-4 mt-5">
                <mdb-col md="5" class="d-flex align-items-start">
                  <div class="text-center">
                    <mdb-btn type="submit" color="grey" rounded class="z-depth-1a">{{ $t('adminlogin.button') }}</mdb-btn>
                  </div>
                </mdb-col>
                <mdb-col md="7" class="d-flex justify-content-end">
                </mdb-col>
              </mdb-row>
                <p class="red-text">{{ boo }}</p>
              </form>
              <!-- form ends here -->
            </mdb-card-body><!-- ./card-body -->
          </mdb-card>

          <!-- this is just to see if admin could not be redirected for some reason -->
          <mdb-card v-if="isAdmin">
            <mdb-row>
              <h2 class="h2-responsive">Welcome Admin</h2>
            </mdb-row>
            <mdb-card-body>
              if you see this page, then contact us as soon as possible to fix it
            </mdb-card-body>
          </mdb-card>
          <!-- this is just to see if admin could not be redirected for some reason -->
          
        </mdb-col>
      </mdb-row>
    </section>
  </div>
</template>
<script>
  import {
    fbAuth
  } from '../../assets/js/firebase';
  import i18n from '../../i18n';
  import {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbInput,
    mdbBtn,
    mdbIcon
  } from 'mdbvue';
  export default {
    name: "adminlogin",
    props: {
      msg: String
    },
    components: {
      mdbRow,
      mdbCol,
      mdbCard,
      mdbCardBody,
      mdbInput,
      mdbBtn,
      mdbIcon
    },
    data() {
      return {
        email: null,
        password: null,
        isAdmin: false,
        boo: '',
        isAdmin: false,
      }
    },
    methods: {
      login() {
        this.$Progress.start();
        let email = this.email,
          password = this.password;
        console.log(email)

        fbAuth.auth().signInWithEmailAndPassword(email, password)
          .then(user => {
            this.$router.push(`/${i18n.locale}/admin`)
            this.$Progress.finish();
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

            // this.boo = errorMessage;
            // ...
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              this.boo = errorMessage;
            }
            console.log(error);
            // [END_EXCLUDE]
          });
      },
    },
    created() {
      fbAuth.auth().onAuthStateChanged(user => {
        user.getIdTokenResult().then(idTokenResult => {
          this.$Progress.start();
          user.admin = idTokenResult.claims.admin;
          this.isAdmin = user.admin
              if (user.admin != true) {
                this.$Progress.fail();
                Swal.fire({
                position: 'top-end',
                type: 'warning',
                title: 'restricted access',
                showConfirmButton: false,
                timer: 1500
              });
                this.$router.push(`/`);
              } else {
                  this.$Progress.start();
                  this.$router.push(`/${i18n.locale}/admin/overview`);
                  this.$Progress.finish();
              }
        });
      });
    }
  }
</script>

<style scoped>

  .form-gradient .font-small {
    font-size: 0.8rem; }

  .form-gradient .header {
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem; }

  .form-gradient input[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #fd9267;
    -webkit-box-shadow: 0 1px 0 0 #fd9267;
    box-shadow: 0 1px 0 0 #fd9267; }

  .form-gradient input[type=text]:focus:not([readonly]) + label {
    color: #4f4f4f; }

  .form-gradient input[type=password]:focus:not([readonly]) {
    border-bottom: 1px solid #fd9267;
    -webkit-box-shadow: 0 1px 0 0 #fd9267;
    box-shadow: 0 1px 0 0 #fd9267; }

  .form-gradient input[type=password]:focus:not([readonly]) + label {
    color: #4f4f4f; }

</style>