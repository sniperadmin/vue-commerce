<template>
    <mdb-btn block color="pink" @click="loginGoogle">
        <i class="fab fa-google-plus-g mr-2"></i>
        login with google
    </mdb-btn>
</template>

<script>
    import {
        fbAuth,
        db
    } from '../../assets/js/firebase';
    import firebase from 'firebase';
    import { mdbBtn } from 'mdbvue';

    export default {
        name: 'google-login',
        components: {
            mdbBtn
        },
        methods: {
            loginGoogle() {
                const provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

                firebase.auth().signInWithPopup(provider).then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const token = result.credential.accessToken;
                    // The signed-in user info.
                    const {
                        user
                    } = result;

                    Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Logged in successfully',
                    showConfirmButton: false,
                    timer: 1500
                });

                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const {
                        email
                    } = error;
                    // The firebase.auth.AuthCredential type that was used.
                    const {
                        credential
                    } = error;
                    // ...
                });
            },
        }
    }
</script>