import { fbAuth } from '../assets/js/firebase';

export default {
  methods: {
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
  }
}