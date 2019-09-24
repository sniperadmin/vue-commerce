<template>
  <div class="profile mt-4 pt-4">
    <div class="container h-100 mt-4">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6">
            <h1>{{ $t('profile.title') }}</h1> <!-- Title -->
            <p>{{ $t('profile.text') }}</p><!-- sub -->
          </div>

          
          <div class="col-md-6">
            <img src="@/assets/img/profile.svg" class="img-fluid" alt="overview image"><!-- cover -->
          </div><!-- ./col-md-6 -->
        </div><!-- ./row -->
      </div><!-- ./intro -->
    </div><!-- ./container -->

    <div class="container-fluid"><!-- main contents -->
          <!-- alerts -->
          <mdb-alert color="success" v-if="!verified">
              <h4 class="alert-heading">{{ $t('alerts.verify') }}</h4>
              <hr>
              <p>{{ $t('alerts.verify-p') }}</p>
              <b-button variant="info" @click="verify">{{ $t('alerts.send-mail') }}</b-button>
            </mdb-alert>
      <b-card no-body><!-- card -->
        <b-tabs pills card justified><!-- tabs -->
          <b-tab :title="$t('profile.tabs.profile.title')" active><!-- tab title -->
            <b-card-text><!-- contents -->
              <b-container fluid>
                <b-row><!-- first row -->
                  <b-col md="4"><!-- col-1 -->
                    <b-form-group id="fieldset-horizontal" label-cols-sm="3" label-cols-lg="3"
                      :description="$t('profile.tabs.profile.name')" :label="$t('profile.tabs.profile.name')" label-align="right"
                      label-for="input-horizontal">
                      <b-form-input v-model="profile.name" id="input-horizontal"></b-form-input>
                    </b-form-group>
                  </b-col><!-- ./col-1 -->
                  <b-col md="5"><!-- col-2 -->
                    <b-form-group id="fieldset-horizontal" label-cols-sm="3" label-cols-lg="3"
                      :description="$t('profile.tabs.profile.phone')" :label="$t('profile.tabs.profile.phone')" label-align="right" label-for="input2-horizontal">
                      <b-form-input v-model="profile.phone" id="input2-horizontal"></b-form-input>
                    </b-form-group>
                  </b-col><!-- ./col-2 -->
                </b-row>

                <b-row><!-- row-2 -->
                  <b-col md="11"><!-- col -->
                    <b-form-group id="fieldset-horizontal" label-cols-sm="2" label-cols-lg="1"
                      :description="$t('profile.tabs.profile.address')" :label="$t('profile.tabs.profile.address')" label-align-sm="left" label-align-lg="right"
                      label-for="input3-horizontal">
                      <b-form-input v-model="profile.address" id="input3-horizontal"></b-form-input>
                    </b-form-group>
                  </b-col><!-- ./col -->
                </b-row><!-- ./row-2 -->

                <b-row><!-- row-3 -->
                  <b-col md="6"><!-- col-1 -->
                    <b-form-group id="fieldset-horizontal" label-cols-sm="2" label-cols-lg="2"
                      :description="$t('profile.tabs.profile.postcode')" :label="$t('profile.tabs.profile.postcode')" label-align="right"
                      label-for="input-horizontal">
                      <b-form-input v-model="profile.postcode" id="input-horizontal"></b-form-input>
                    </b-form-group>
                  </b-col><!-- ./col-1 -->

                  <b-col md="3" offset-md="1"><!-- col-2 -->
                    <b-button @click="updateProfile" block id="input2-horizontal">{{ $t('profile.tabs.profile.button') }}</b-button>
                  </b-col><!-- ./col-2 -->
                </b-row><!-- row-3 -->
              </b-container>
            </b-card-text>
          </b-tab><!-- first tab -->

          <b-tab :title="$t('profile.tabs.account.title')"><!-- second tab [Account Settings] -->
            <b-card-text>
              <b-container fluid>
                <b-row><!-- row-1 second tab [Account Settings] -->
                  <b-col md="6"><!-- col-1 -->
                    <b-form-group id="fieldset-horizontal"
                      :description="$t('profile.tabs.account.username')"
                      label-for="input-horizontal">
                      <b-form-input id="input-horizontal"></b-form-input>
                    </b-form-group>
                  </b-col><!-- ./col-1 -->

                  <b-col md="6"><!-- col-2 -->
                    <b-form-group id="fieldset-horizontal" 
                      :description="$t('profile.tabs.account.email')">
                      <b-form-input v-model="account.email" id="input2-horizontal"></b-form-input>
                    </b-form-group>
                  </b-col><!-- ./col-2 -->
                </b-row><!-- row-1 second tab [Account Settings] -->

                <!-- <b-row>
                  <b-col md="6">
                    <b-form-group id="fieldset-horizontal"
                      description="New password"
                      label-for="input-horizontal">
                      <b-form-input id="input-horizontal"></b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col md="6">
                    <b-form-group id="fieldset-horizontal"  
                      description="Confirm password">
                      <b-form-input id="input2-horizontal"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row> -->

                <b-row><!-- row-3 second tab [Account Settings] -->
                  <b-col md="5"><!-- col-1 -->
                    <!-- Styled -->
                    <b-form-file class="mb-3"
                      v-model="profileFile"
                      :state="Boolean(profileFile)"
                      :placeholder="$t('profile.tabs.account.choose')"
                      :drop-placeholder="$t('profile.tabs.account.choose')"
                    ></b-form-file>
                  </b-col><!-- ./col-1 -->

                  <b-col md="5" class="ml-auto"><!-- col-2 -->
                    <b-button id="input2-horizontal">{{ $t('profile.tabs.account.button-1') }}</b-button>
                    <b-button @click="resetPassword" variant="success" id="input2-horizontal">{{ $t('profile.tabs.account.button-2') }}</b-button>
                  </b-col><!-- ./col-2 -->
                </b-row><!-- ./row-3 second tab [Account Settings] -->
              </b-container>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

  </div>
</template>
<script>
import { fbAuth, db } from '../assets/js/firebase';
import { mdbAlert } from 'mdbvue';

  export default {
    name: "users",
    components: {
      mdbAlert
    },
    data() {
      return {
        profileFile: null,
        profile: {
          name: null,
          phone: null,
          address: null,
          postcode: null,
          isLoading: false,
        },
        account: {
          name: null,
          email: null,
          photoUrl: null,
        },
        verified: null
      }
    },
    firestore() {
      const user = fbAuth.auth().currentUser;
      return {
        // profiles: db.collection('profiles'),
        profile: db.collection('profiles').doc(user.uid)
      }
    },
    methods:{
      updateProfile() {
        const user = fbAuth.auth().currentUser;
          db.collection('profiles').doc(user.uid).update(this.profile).then(() => {
             toast.fire({
                  type: 'success',
                  title: 'Updated successfully'
              });
        }).catch(err => {
          toast.fire({
                type: 'error',
                title: 'Something wrong!'
            });
          });
      },
      resetPassword() {
        const auth = fbAuth.auth();
        console.log(auth.currentUser.email)
        auth.sendPasswordResetEmail(auth.currentUser.email).then(() => {
          toast.fire({
                  type: 'success',
                  title: 'Check your email!'
              });
        }).catch(() => {
          toast.fire({
                  type: 'error',
                  title: 'Something wrong!'
              });
        });
      },
      verify() {
        fbAuth.auth().currentUser.sendEmailVerification().then(() => {
          alert('Verification sent')
        }).catch(error => {
            console.log(error)
        });
      }
    },
    created() {
      this.$vs.loading({
        type: 'material'
      })
      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 1000);

      fbAuth.auth().onAuthStateChanged(user => { 
        this.verified = user.emailVerified;
      });
    }
  }
</script>