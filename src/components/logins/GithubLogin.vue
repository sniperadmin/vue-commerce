<template>
    <mdb-btn block color="elegant" @click="loginGit">
        <i class="fab fa-github mr-2"></i>
        login with Github
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
    name: 'github-login',
    components: {
        mdbBtn
    },
    methods: {
        loginGit() {
            var provider = new firebase.auth.GithubAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            });
        }
    }
}
</script>