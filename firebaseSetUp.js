var admin = require("firebase-admin");
const dotenv = require('dotenv');
dotenv.config();
// var serviceAccount = require("./legbackend-firebase-adminsdk-nkepd-242f3e430b.json")

var app = admin.initializeApp({
    credential: admin.credential.cert({
        "private_key": process.env.private_key.replace(/\\n/g, '\n'),
        "client_email": process.env.client_email,
        "project_id": process.env.project_id,
    }),
    databaseURL: "https://legbackend-default-rtdb.firebaseio.com"
})

module.exports = admin;