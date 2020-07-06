import { fbAuth } from '../assets/js/firebase';

export default {
  methods: {
    verify() {
      fbAuth.auth().currentUser.sendEmailVerification().then(() => {
        console.info('Verification sent')
      })
        .catch(error => {
          console.log(error)
        });
    }
  },
}