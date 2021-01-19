
let admin = require("firebase-admin");

let serviceAccount = require("./serviceAccountKey.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "legbackend.appspot.com"
});



console.log(bucket)

module.exports = admin;
