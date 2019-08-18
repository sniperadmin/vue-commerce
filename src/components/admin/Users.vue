<template>
    <div class="users">
        <div class="container h-100">
            <div class="intro h-100">
                <div class="row h-100 align-items-center">
                    <div class="col-md-6">
                        <h1>Users Page</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quaerat quae quisquam quos necessitatibus, nisi, mollitia
                            temporibus expedita aliquam itaque exercitationem qui fugit
                            facere? Temporibus enim aperiam soluta ratione maxime beatae!
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="@/assets/img/orders.svg" class="img-fluid" alt="overview image">
                    </div>
                </div>
            </div>
<!-- 
                <input v-model="email" type="email" name="email">
                <b-button @click="addAmin" variant="success">
                    Make Admin
                </b-button> -->

        </div>
    </div>
</template>
<script>
    export default {
        name: 'users',
        data() {
            return {
                email: null,
            }
        },
        methods: {
            addAmin() {
                const makeAdmin = functions.httpsCallable('addAdminRole');
                makeAdmin({email: this.email}).then(result => {
                    console.log(result);
                })
            }
        }
    }
</script>