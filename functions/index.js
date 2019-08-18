const functions = require('firebase-functions');
const {Storage} = require('@google-cloud/storage');
const projectId = 'vue-shop-e3547';
let gcs = new Storage({ projectId });
const os = require('os');
const path = require('path');

const admin = require('firebase-admin');
admin.initializeApp();

// const spawn = require('child-process-promise').spawn;
// const stripe = require("stripe")("pk_test_EkgRdwSuRpwR0FUEsUSMJVCw00HJk4Sukt");
// const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// test a rename functionality for pictures on firestore
exports.onFileChange = functions.storage.object().onFinalize(event => {
  const bucket = event.bucket;
  const contentType = event.contentType;
  const filepath = event.name;
  console.log('change detected');

  if (path.basename(filepath).startsWith('renamed-')) {
    console.log('file already renamed');
    return;
  }

  const destBucket = gcs.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filepath));
  const metadata = { contentType };

  return destBucket.file(filepath).download({
    destination: tmpFilePath
  })
    .then(() => {
      return destBucket.upload(tmpFilePath, {
        destination: 'renamed-' + path.basename(filepath),
        metadata
      })
    })
});

/* ---- Setting User Privilages

1- Specify Admin [Who is the controller]
2- adding subAdmins
---- */

// 1- Specify Admin [Who is the controller]

admin.auth().getUserByEmail('sniperadmin@me.com')
  .then(user => {
    // Add custom claims for additional privileges.
    // This will be picked up by the user on token refresh or next sign in on new device.
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });
  })
  .then(user => {
    user.getIdTokenResult().then(idTokenResult => {
      console.log(idTokenResult.claims.admin)
    })
  })
  .catch(error => {
    console.log(error);
  });

// 2- adding subAdmins or promote to subAdmin

exports.addAdminRole = functions.https.onCall((data, context) => {

  // Check if request made is by an admin
  if (context.auth.token.admin !== true) {
    return { error: 'Only admins can do this!' }
  }

  // get user and add custom claim [admin]
  return admin.auth().getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin:true
      })
        .then(() => {
          console.log(user);
          return {
            message: `Success ${data.email} has been made an admin`
          }
        })
        .catch(err => {
          // return err;
          console.log(err);
        });
    });
});

// Checkout
exports.checkoutSession = functions.https.onRequest((request, response) => {
  
  let myProducts = request.query.products;
  myProducts = Object.entries(JSON.parse(myProducts));
  response.send(myProducts);
  console.log(myProducts)

  // // Enable CORS using the `cors` express middleware.
  // return cors(request, response, () => {
  //   stripe.checkout.sessions.create({
  //     success_url: "https://example.com/success",
  //     cancel_url: "https://example.com/cancel",
  //     payment_method_types: ["card"],
  //     line_items: [{
  //       name: "T-shirt",
  //       description: "Comfortable cotton t-shirt",
  //       amount: 1500,
  //       currency: "usd",
  //       quantity: 2
  //     }]
  //   }, (_err, _session) => {
  //     // asynchronously called
  //     response.send(_session);
  //   });
  // })

});