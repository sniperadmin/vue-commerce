const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const express = require('express');
// eslint-disable-next-line no-unused-vars
const app = express();
const stripe = require("stripe")("pk_test_EkgRdwSuRpwR0FUEsUSMJVCw00HJk4Sukt");
const cors = require('cors')({origin: true});

// const app = express();
// app.get('/timestamp', (request, response) => {
//   response.send(`${Date.now()}`);
// });

// app.get('/timestamp-cached', (request, response) => {
//   response.set('Cache-Control', 'public, max-age=100, s-maxage=600');
//   response.send(`${Date.now()}`);
// })

/* ---- Setting User Privilages

1- Specify Admin [Who is the controller]
2- adding subAdmins
---- */

// 1- Specify Admin [Who is the controller]

admin.auth().getUserByEmail('vue-commerce-admin@me.com')
  .then(user => {
    // Add custom claims for additional privileges.
    // This will be picked up by the user on token refresh or next sign in on new device.
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });
  })
  // .then(user => {
  //   user.getIdTokenResult().then(idTokenResult => {
  //     console.log(idTokenResult.claims.admin)
  //   })
  // })
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
          context.status(500).send(err);
        });
    });
});

// getting users information
exports.listUsers = functions.https.onRequest(async (req, res) => {
  // eslint-disable-next-line no-empty-function
  cors(req, res, () => {});
  try {
    let users = [];
    const list = async nextPageToken => {
      await admin.auth().listUsers(1000, nextPageToken)
        .then(async result => {
          result.users.forEach(userRecord => {
            const user = userRecord;
            users.push(user);
            // console.log(userRecord);
          });
          if (result.pageToken) {
            await list(result.pageToken)
          }
        })
    };
    await list()
    res.status(200).send({
      success: 'SUCCESS',
      users
    });
  } catch (error) {
    res.status(500).send({error});
  }
});

// Creating users
exports.makeNewUser = functions.https.onRequest((request, response) => {

  admin.auth().createUser({
    email: request.body.email,
    emailVerified: false,
    password: request.body.password,
    firstName: request.body.firstName,
    disabled: false
  })
    .then(userRecord => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
    })
    .catch(error => {
      response.status(500).send(error);
      console.log('error! something happened', error)
    });
});

// disable account
exports.disableAccount = functions.https.onCall((data, context) => {
  admin.auth().updateUser(data.uid, {
    disabled: true
  })
    .then(userRecord => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully updated user', userRecord.toJSON());
    })
    .catch(error => {
      context.status(500).send(error);
      console.log('Error updating user:', error);
    });
});

// enable account
exports.enableAccount = functions.https.onCall((data, context) => {
  admin.auth().updateUser(data.uid, {
    disabled: false
  })
    .then(userRecord => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully updated user', userRecord.toJSON());
    })
    .catch(error => {
      context.status(500).send(error);
      console.log('Error updating user:', error);
    });
})

// deleting user
exports.deleteUser = functions.https.onCall((data, context) => {
  admin.auth().deleteUser(data.uid)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch(error => {
      context.status(500).send(error);
      console.log('Error deleting user:', error);
    });
});

// Checkout
exports.checkoutSession = functions.https.onRequest((request, response) => {
  
  cors(request, response, async() => {
    
    let myProducts = request.query.products;
    myProducts = Object.entries(JSON.parse(myProducts));
    // response.send(myProducts);
    
    const productArray = [];
    
    myProducts.array.forEach(item => {
      const p = admin.firestore().doc(`products/${item[0]}`)
        .get();
      productArray.push(p);
    });
    
    const all = await Promise.all(productArray);
    // this is to configure data dynamically and pass them to stripe checkout information
    const results = [];
    all.forEach(item => {
      // stripe accepts object
      const data = {};
      // defining sub objects
      data.amount = parseFloat(item.data().price * 100);
      data.currency = "aud";
      data.description = item.data().description;
      data.name = item.data().name;
      // for the quantity, we can get it from the end user
      myProducts.forEach(q => {
        if (item.id == q[0]) {
          return  data.quantity[1];
        }
      });
      results.push(data);
    });

    stripe.checkout.sessions.create({
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
      payment_method_types: ["card"],
      // configuring dynamic data
      line_items: results
    }, (_err, _session) => {
      // asynchronously called
      response.send(_session);
    });
  });

  // // Enable CORS using the `cors` express middleware.
  // return cors(request, response, () => {
  // stripe.checkout.sessions.create({
  //   success_url: "https://example.com/success",
  //   cancel_url: "https://example.com/cancel",
  //   payment_method_types: ["card"],
  //   line_items: [{
  //     name: "T-shirt",
  //     description: "Comfortable cotton t-shirt",
  //     amount: 1500,
  //     currency: "usd",
  //     quantity: 2
  //   }]
  // }, (_err, _session) => {
  //   // asynchronously called
  //   response.send(_session);
  // });
  // })

});