import { fbAuth, db } from '../assets/js/firebase';

export default {
  methods: {
    updateProfile() {
      const user = fbAuth.auth().currentUser;
      db.collection('profiles').doc(this.user.uid)
        .update(this.profile)
        .then(() => {
          toast.fire({
            type: 'success',
            title: 'Updated successfully'
          });
        })
        .catch(() => {
          toast.fire({
            type: 'error',
            title: 'Something wrong!'
          });
        });
    },
  }
}