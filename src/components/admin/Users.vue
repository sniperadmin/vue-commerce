<template>
    <div class="users">
        <div class="container h-100">
            <div class="intro h-100">
                <!-- top-intro -->
                <div class="row h-100 align-items-center">
                    <div class="col-md-6">
                        <h1>Users Management</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quaerat quae quisquam quos necessitatibus, nisi, mollitia
                            temporibus expedita aliquam itaque exercitationem qui fugit
                            facere? Temporibus enim aperiam soluta ratione maxime beatae!
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="@/assets/img/orders.svg" class="img-fluid" alt="overview image">
                    </div>
                </div><!-- ./top-intro -->
            </div>
            
            <!-- body-title -->
            <b-row class="my-2 justify-content-between">
                <h2 class="d-inline-block h2-responsive">users list</h2>
                <b-button class="p-2 mt-0" variant="success" @click="createNew" disabled>create user</b-button>
            </b-row><!-- ./body-title -->

            <!-- row -->
            <b-row align-h="between">
                <!-- col-1 -->
                <b-col cols="4">
                    <!-- search -->
                    <b-form-group label="Filter" label-cols-sm="3" label-align-sm="right" label-size="sm"
                        label-for="filterInput" class="mb-0">

                        <b-input-group size="sm">

                            <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search">
                            </b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>

                        </b-input-group>

                    </b-form-group><!-- ./search -->
                </b-col><!-- ./col-1 -->

                <!-- col-2 -->
                <b-col cols="4">
                    <h2 class="h2-responsive">total users <b-badge>{{ totalRows }}
                            <clip-loader :loading="loading" :color="`#fff`" :size="25"></clip-loader>
                        </b-badge>
                    </h2>
                </b-col><!-- col-2 -->

            </b-row><!-- ./row -->
            
            <!-- pagination -->
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
                class="my-2 border heavy-rain-gradient" first-text="First" prev-text="Prev" next-text="Next"
                last-text="Last"></b-pagination><!-- ./pagination -->

            <!-- table -->
            <b-table id="my-table" class="text-center" bordered hover head-variant="dark" :items="users"
                :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter"
                @filtered="onFiltered">
                <template slot="actions" slot-scope="row">
                    <b-button variant="primary" disabled>edit</b-button>
                    <b-button variant="success" v-if="!row.item.customClaims && row.item.emailVerified"
                        @click="addAdmin(row.item.email)" disabled>make admin</b-button>
                    <b-button variant="danger" v-if="!row.item.customClaims" disabled>delete</b-button>
                </template>
            </b-table><!-- ./table -->

            <!-- loader component -->
            <bar-loader :loading="loading" :color="`#3C36D7`" :height="8" :sizeUnit="`px`" class="w-100"></bar-loader>
            <!-- ./loader component -->

            <!-- pagination -->
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
                class="my-3 border heavy-rain-gradient" first-text="First" prev-text="Prev" next-text="Next"
                last-text="Last">
            </b-pagination><!-- ./pagination -->

              <b-modal centered ref="modal" id="create">
                <div slot="modal-title">
                    <h3 v-if="modal === 'new'">create user</h3>
                    <h3 v-if="modal === 'edit'">edit user</h3>
                </div>

                <form @submit.prevent="newUser" autocomplete="off">

                <b-form-group id="example-input-group-1" label="email" label-for="email-form"
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
                         this field is required
                      </b-form-invalid-feedback>
                    <b-form-invalid-feedback id="email-live-feedback" v-if="$v.email.required">
                          should be a valid email
                    </b-form-invalid-feedback>
                  
                    <b-form-valid-feedback id="email-live-feedback">looks good</b-form-valid-feedback>
                  </b-form-group>

                  <b-form-group id="example-input-group-1" label="display name" label-for="displayName-form"
                label-cols-sm="3"
                label-cols-lg="3">
                    <b-form-input
                      id="displayName-form"
                      name="displayName-form"
                      type="text"
                      v-model="$v.displayName.$model"
                      :state="$v.displayName.$dirty ? !$v.displayName.$error : null"
                      aria-describedby="password-live-feedback"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="password-live-feedback" v-if="$v.displayName.minLength">
                        this is a required field
                      </b-form-invalid-feedback>
                    <b-form-invalid-feedback id="password-live-feedback" v-if="$v.displayName.required">
                        name should be at least {{ $v.displayName.$params.minLength.min }} chars
                    </b-form-invalid-feedback>
                  
                    <b-form-valid-feedback id="password-live-feedback">{{ $t('modal.tabs.register.password-valid') }} </b-form-valid-feedback>
                  </b-form-group>

                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit" :disabled="!$v.$invalid">create</button>
                </div> <!-- form-group// -->
            </form>
            <p v-if="boo">{{ boo }}</p>

            <div slot="modal-footer" class="w-100" slot-scope="{cancel}">
                <span>designs by/ Nasr Galal</span>
                <b-button variant="primary" size="sm" class="float-right" @click="cancel()">
                    cancel
                </b-button>
            </div>
            </b-modal>

        </div>
    </div>
</template>

<script>
import { email } from 'vuelidate/lib/validators';

    import {
        BarLoader,
        ClipLoader
    } from '@saeris/vue-spinners'
    import axios from 'axios'
    import {
        validationMixin
    } from 'vuelidate'
    import {
        required,
        minLength
    } from 'vuelidate/lib/validators'
    export default {
        name: 'users',
        components: {
            BarLoader,
            ClipLoader
        },
        data() {
            return {
                users: [],
                perPage: 10,
                currentPage: 1,
                filter: null,
                totalRows: null,
                fields: [{
                        key: 'email',
                        sortable: true
                    },
                    {
                        key: 'emailVerified',
                        sortable: true
                    },
                    {
                        key: 'metadata.creationTime',
                        label: 'created at',
                        sortable: true
                    },
                    {
                        key: 'metadata.lastSignInTime',
                        label: 'last signin',
                        sortable: true
                    },
                    {
                        key: 'providerData[0].providerId',
                        label: 'signed via',
                        sortable: false
                    },
                    {
                        key: 'actions',
                        sortable: false
                    }
                ],
                loading: false, // for the loading components
                modal: null,
                // form
                email: null,
                phoneNumber: null,
                password: null,
                displayName: null,
                disabled: false,
                // error reporting
                boo: ''
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
        },
        displayName: {
            required,
            minLength: minLength(4)
        }
    },
        methods: {
            addAdmin(value) {
                console.log(value)
                const makeAdmin = functions.httpsCallable('addAdminRole');
                makeAdmin({
                    email: value
                }).then(result => {
                    console.log(result);
                })
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            createNew() {
                this.modal = 'new';
                // this.reset()
                this.$refs.modal.show()
            },
            newUser() {
                this.$v.$touch()
                if (this.$v.$anyError) {
                    return
                }
                const createProcess = functions.httpsCallable('makeNewUser');
                createProcess({
                    email: data.email,
                    emailVerified: false,
                    password: 12345678,
                    displayName: data.displayName,
                    disabled: false
                }).then(() => {console.log('nice')})
                .catch(() => {console.log('error')})
                
            },
        },
        created() {
            this.loading = true
            axios.get('https://us-central1-vue-shop-e3547.cloudfunctions.net/listUsers').then(response => {
                this.users = response.data.users
                console.log(Object.entries(this.users))
                this.loading = false
                return this.totalRows = this.users.length;

            }).catch((err) => console.log(err))
        },
    }
</script>