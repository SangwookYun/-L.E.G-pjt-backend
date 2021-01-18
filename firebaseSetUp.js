var admin = require("firebase-admin");

var serviceAccount = require("./legbackend-firebase-adminsdk-nkepd-242f3e430b.json")

var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://legbackend-default-rtdb.firebaseio.com"
})

module.exports = admin;