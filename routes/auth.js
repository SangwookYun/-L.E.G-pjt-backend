const { request } = require('express');
const express = require('express');
const router = express.Router();
const userModel = require('../models/user')
const auth = require('firebase-admin');
const admin = require('../firebaseSetUp');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     description: Add New User
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         require: true
 *         type: string
 *         example: test@mail.com
 *       - name: password
 *         in: body
 *         requrie: true
 *         type: string
 *         example: mypassword
 *       - name: firstName
 *         in: body
 *         require: true
 *         type: string
 *         example: Yun
 *       - name: lastName
 *         in: body
 *         require: true
 *         type: string
 *         example: Sangwook
 *       - name: userType
 *         in: body
 *         require: true
 *         type: string
 *         example: Admin
 *       - name: address
 *         in: body
 *         require: false
 *         type: string
 *         example: 1234 244 st
 *       - name: city
 *         in: body
 *         require: false
 *         type: string
 *         example: Vancouver
 *       - name: province
 *         in: body
 *         require: false
 *         type: string
 *         example: BC
 *     responses:
 *       201:
 *          description: success post user info
 *          content:
 *             application/json:
 *              example:
 *                  [
 *                   {
 *                      message: success post user info",
 *                      data: [{
 *                                  "restaurantOwned": [],
 *                                  "_id": "5asdfasdfoipje",
 *                                  "email": "test@gmail.com",
 *                                  "firstName": "J",
 *                                  "lastName": "Adam",
 *                                  "userType": "Admin",
 *                                  "address": "123456 211",
 *                                  "city": "Vancouver",
 *                                   "__v": 0
 *                      }]
 *                   }
 *               ]
 *       400:
 *          description: Missing credentials
 *       500:
 *          description: Server error fail to create
 *       default:
 *         description: fail to create use
 *     security:
 *       - Secured: []
 */
router.post("/register", function(req, res, next) {

    const {
        email,
        password,
        firstName,
        lastName,
        userType,
        address,
        city,
        province
    } = req.body

    if (!email || !password || !firstName || !lastName) {
        res.status(400).json({ message: "Missing credentials" });
    }
    let uid = "";
    admin.auth().createUser({
        email: req.body.email,
        password: req.body.password
    }).then((userRecord) => {
        uid = userRecord.uid;
        console.log('New uesr created');
        try {
            userModel.create({
                _id: uid,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                // Uncomment these if we are using it for register 
                // userType: req.body.userType,
                // address: req.body.address,
                // city: req.body.city,
                // province: req.body.province,
                userType: "",
                address: "",
                city: "",
                province: "",
            }).then((result) => {
                res.status(201).json({ message: "success create user", data: result });
            }).catch((e) => {
                // console.log(e)
                admin.auth().deleteUser(uid)
                res.status(500).json({ message: "Failed to create user", error: e.message });
            })
        } catch (e) {
            // console.log(e)
            admin.auth().deleteUser(uid)
            res.status(401).json({ message: "Failed to create user", error: e.message });
        }
    }).catch((e) => {
        // console.log(e)
        res.status(401).json({ message: "Failed to create user", error: e.message });
    })


});

// sign in user 





module.exports = router;