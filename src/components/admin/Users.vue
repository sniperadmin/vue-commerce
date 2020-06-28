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
                    <div class="col-md-6 align-content-center">
                        <img src="@/assets/img/orders.svg" class="img-fluid" alt="overview image">
                    </div>
                </div><!-- ./top-intro -->
            </div>

            <!-- body-title -->
            <b-row class="my-2 justify-content-between">
                <h2 class="d-inline-block h2-responsive">users list</h2>
                <b-button class="p-2 mt-0" variant="success" disabled @click="createNew">create user</b-button>
            </b-row><!-- ./body-title -->

            <!-- row -->
            <b-row align-h="between">
                <!-- col-1 -->
                <b-col cols="4">
                    <!-- search -->
                    <b-form-group label="Filter" label-cols-sm="3" label-align-sm="right" label-size="sm"
                        label-for="filterInput" class="mb-0">

                        <b-input-group size="sm">

                            <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Search by email">
                            </b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>

                        </b-input-group>

                    </b-form-group><!-- ./search -->
                </b-col><!-- ./col-1 -->

                <!-- col-2 -->
                <b-col cols="4">
                    <h2 class="h2-responsive">total users
                        <b-badge>{{ totalRows }}
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
                @filtered="onFiltered" small stacked="md" responsive striped :busy="busy">

                <template slot="emailVerified" slot-scope="row">
                    <h5>
                        <mdb-badge color="success" v-if="row.item.emailVerified">verified account</mdb-badge>
                        <mdb-badge color="pink lighten-2" v-if="!row.item.emailVerified">not verified</mdb-badge>
                    </h5>
                </template>

                <template slot="userRole" slot-scope="row">
                    <h5>
                        <mdb-badge color="primary" v-if="!row.item.customClaims">standard user</mdb-badge>
                        <mdb-badge color="teal darken-1" v-else-if="row.item.customClaims">admin</mdb-badge>
                    </h5>
                </template>
                
                <template slot="status" slot-scope="row">
                    <h5>
                        <mdb-badge v-if="row.item.disabled" color="pink lighten-2">Disabled</mdb-badge>
                        <mdb-badge v-if="!row.item.disabled" color="teal darken-2">Enabled</mdb-badge>
                    </h5>
                </template>

                <template slot="actions" slot-scope="row">
                    <!-- edit user -->
                    <b-button data-toggle="tooltip" title="edit account" variant="primary" disabled class="p-2">
                        <i class="fas fa-edit fa-sm"></i>
                    </b-button>

                    <!-- make admin -->
                    <b-button data-toggle="tooltip" title="make admin" variant="success" class="pr-3 pl-3"
                    v-if="!row.item.customClaims && row.item.emailVerified" @click="addAdmin(row.item.email)"
                    disabled>
                        make admin
                    </b-button>
                    
                    <!-- disable account -->
                    <button data-toggle="tooltip" title="disable account" class="p-2 btn btn-amber" v-if="!row.item.disabled && !row.item.customClaims" @click="disableAccount(row.item.uid)">
                        <i class="fas fa-lock fa-sm"></i>
                    </button>
                    
                    <!-- enable account -->
                    <b-button data-toggle="tooltip" title="enable account" variant="warning" class="p-2" v-if="row.item.disabled" @click="enableAccount(row.item.uid)">
                        <i class="fas fa-lock-open fa-sm"></i>
                    </b-button>

                    <!-- delete user -->
                    <button v-b-popover.hover="'Popover!'" class="p-2 btn btn-pink" @click="deleteUser(row.item.uid)"
                        v-if="!row.item.customClaims">
                        <i class="fas fa-trash fa-sm"></i>
                    </button>
                </template>
            </b-table><!-- ./table -->

            <!-- loader component -->
            <bar-loader :loading="loading" :color="`#3C36D7`" :height="8" :sizeUnit="`px`" class="w-100"></bar-loader>
            <!-- ./loader component -->

            <!-- pagination -->
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
                class="my-3 border heavy-rain-gradient" first-text="First" prev-text="Prev" next-text="Next"
                last-text="Last">
            </b-pagination>
            <!-- ./pagination -->

            <b-modal centered ref="modal" id="create">
                <div slot="modal-title">
                    <h3 v-if="modal === 'new'">create user</h3>
                    <h3 v-if="modal === 'edit'">edit user</h3>
                </div>

                <form @submit.prevent="newUser" method="POST">
                    <b-form-group id="example-input-group-1" label="email" label-for="email-form" label-cols-sm="3"
                        label-cols-lg="3">
                        <b-form-input id="email-form" name="email-form" v-model="$v.email.$model"
                            :state="$v.email.$dirty ? !$v.email.$error : null" aria-describedby="email-live-feedback">
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
                        label-cols-sm="3" label-cols-lg="3">
                        <b-form-input id="displayName-form" name="displayName-form" type="text"
                            v-model="$v.displayName.$model"
                            :state="$v.displayName.$dirty ? !$v.displayName.$error : null"
                            aria-describedby="password-live-feedback">
                        </b-form-input>
                        <b-form-invalid-feedback id="password-live-feedback" v-if="$v.displayName.minLength">
                            this is a required field
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback id="password-live-feedback" v-if="$v.displayName.required">
                            name should be at least {{ $v.displayName.$params.minLength.min }} chars
                        </b-form-invalid-feedback>

                        <b-form-valid-feedback id="password-live-feedback">
                            {{ $t('modal.tabs.register.password-valid') }} </b-form-valid-feedback>
                    </b-form-group>

                    <b-row class="justify-content-center">
                        <b-button variant="success" type="submit">create</b-button>
                    </b-row>
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
    import firebase from 'firebase';
    const functions = firebase.functions();
    import {
        mapGetters,
        mapState
    } from 'vuex';
    import {
        email
    } from 'vuelidate/lib/validators';

    import {
        BarLoader,
        ClipLoader,
        CircleLoader
    } from '@saeris/vue-spinners';
    import { mdbBadge } from 'mdbvue';
    import axios from 'axios';
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
            ClipLoader,
            CircleLoader,
            mdbBadge
        },
        data() {
            return {
                users: [],
                perPage: 10,
                currentPage: 1,
                filter: null,
                totalRows: null,
                fields: [
                    {
                        key: 'email',
                        sortable: true
                    },
                    {
                        key: 'emailVerified',
                        label: 'email verified',
                        sortable: true
                    },
                    {
                        key: 'userRole',
                        label: 'user role',
                    },
                    {
                        key: 'metadata.creationTime',
                        label: 'created at',
                        sortable: true
                    },
                    {
                        key: 'status',
                        label: 'account status',
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
                busy: false,
                modal: null,
                // form
                email: null,
                phoneNumber: null,
                password: null,
                displayName: null,
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
            listAllUsers() {
                this.busy = true;
                this.loading = true;
                axios.get('https://us-central1-vue-shop-e3547.cloudfunctions.net/listUsers').then(response => {
                    this.users = response.data.users
                    this.loading = false;
                    this.busy = false;
                    return this.totalRows = this.users.length;
                }).catch(err => console.log(err))
            },
            addAdmin(value) {
                console.log(value)
                const makeAdmin = functions.httpsCallable('addAdminRole');
                makeAdmin({
                    email: value
                }).then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                });
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
                } else if (!this.$v.$anyError) {
                    axios.post('https://us-central1-vue-shop-e3547.cloudfunctions.net/makeNewUser', {
                            email: this.email,
                            password: 12345678,
                            firstName: this.displayName,
                        }).then(r => {
                            toast.fire({
                                type: 'success',
                                title: 'created new user successfully'
                            });
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    Fire.$emit('done');
                }
            },
            disableAccount(x) {
                // .. callable function
                const disable = functions.httpsCallable('disableAccount');
                this.$Progress.start();
                disable({
                    uid: x
                }).then(x => {
                    this.$bvToast.toast(`disabled user successfully`, {
                        title: 'status update',
                        variant: 'success',
                        autoHideDelay: 10000,
                    });
                    this.$Progress.finish();
                    Fire.$emit('done');
                })
                .catch(err=> {
                    this.$Progress.fail();
                    this.$bvToast.toast(`${err}`, {
                        title: 'error updating',
                        variant: 'danger',
                        autoHideDelay: 10000,
                    });
                });
            },
            enableAccount(x) {
                // launch
                const enable = functions.httpsCallable('enableAccount');
                this.$Progress.start();
                enable({
                    uid: x
                }).then(x => {
                    this.$bvToast.toast(`enabled user successfully`, {
                        title: 'status update',
                        variant: 'success',
                        autoHideDelay: 5000,
                    });
                    this.$Progress.finish();
                    Fire.$emit('done');
                })
                .catch(err=> {
                    this.$Progress.fail();
                    this.$bvToast.toast(`${err}`, {
                        title: 'status update',
                        autoHideDelay: 5000,
                    });
                });
            },
            deleteUser(x) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(result => {
                    if (result.value) {
                        this.$Progress.start()
                        const deleting = functions.httpsCallable('deleteUser');
                        deleting({
                            uid: x
                        }).then(result => {
                            toast.fire({
                                type: 'success',
                                title: 'deleted user successfully'
                            });
                            Fire.$emit('done');
                            this.$Progress.finish();

                        }).catch(err => {
                            this.$Progress.fail()
                            console.log(err)
                        });
                    }
                })
            },  
        },
        // if using vuex instead
        // computed: 
        //     mapState({ users: state => state.users }),

        created() {
            this.listAllUsers();

            // if wanted to use vuex instead
            // this.loading = true
            // this.$store.dispatch('listAllUsers').then(() => {
            //     this.loading = false
            //     return this.totalRows = this.users.length;
            // })
        },
        mounted() {
            Fire.$on('done', () => {
                // this.users = []
                this.listAllUsers()
            })

        }
    }
</script>