<template>
    <b-button block variant="primary" @click="fbLogin"> 
        <i class="fab fa-facebook-f"></i> 
            &nbsp; {{ $t('modal.tabs.register.facebook') }}
        </b-button>
</template>

<script>
    import {fbAuth, db} from '../../assets/js/firebase';
    import firebase from 'firebase';
    export default {
        name: 'fb-login',

        data() {
            return {

            }
        },
        methods: {
            fbLogin() {
                var provider = new firebase.auth.FacebookAuthProvider();

                fbAuth.auth().signInWithPopup(provider).then(result => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
                console.log(user)
                }).catch(error => {
                    let errorCode = error.code,
                        errorMessage = error.message,
                        email = error.email,
                        credential = error.credential;
                    console.log(errorMessage)
                });
            }
        }
    }
</script>