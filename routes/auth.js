const { request } = require('express');
const express = require('express');
const router = express.Router();
const userModel = require('../models/user')
const {body} = require('express-validator/check')
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth')

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, {req})=> {
            return userModel.findOne({email: value}).then(userDoc => {
                if(userDoc) {
                    return Promise.reject('E-mail Address already exists!');
                }
            })
        })
        .normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('name').trim().not().isEmpty()

], authController.signup)

router.post('/login', authController.login)
router.post('/user', isAuth, authController.getUser)
router.put('/update_cp',  authController.updateCoupon)

module.exports = router;







// router.post("/register", function(req, res, next) {

//     const {
//         email,
//         password,
//         firstName,
//         lastName,
//         userType,
//         address,
//         city,
//         province
//     } = req.body

//     if (!email || !password || !firstName || !lastName) {
//         res.status(400).json({ message: "Missing credentials" });
//     }
//     let uid = "";
//     console.log(req.body)
//     admin.auth().createUser({
//         email: req.body.email,
//         password: req.body.password,
//         emailVerified: true,
//     }).then((userRecord) => {
//         uid = userRecord.uid;

//         try {
//             userModel.create({
//                 _id: uid,
//                 email: req.body.email,
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 // Uncomment these if we are using it for register 
//                 // userType: req.body.userType,
//                 // address: req.body.address,
//                 // city: req.body.city,
//                 // province: req.body.province,
//                 userType: "",
//                 address: "",
//                 city: "",
//                 province: "",
//             }).then((result) => {
//                 console.log('New uesr created');
//                 res.status(201).json({ message: "success create user", data: result });
//             }).catch((e) => {
//                 // console.log(e)
//                 admin.auth().deleteUser(uid)
//                 res.status(500).json({ message: "Failed to create user1", error: e.message });
//             })
//         } catch (e) {
//             // console.log(e)
//             admin.auth().deleteUser(uid)
//             res.status(401).json({ message: "Failed to create user2", error: e.message });
//         }
//     }).catch((e) => {
//         // console.log(e)
//         res.status(401).json({ message: "Failed to create user3", error: e.message });
//     })


// });

// // sign in user 

// router.post("/login", function(req, res, next) {

//     const {
//         email,
//         password
//     } = req.body

//     if (!email || !password) {
//         res.status(400).json({ message: "Missing credentials" });
//     }
//     let uid = "";
//     console.log(req.body)
//     userModel.find({email: req.body.email},
//         (err, result) => {
//             console.log(err)
//             if (err) {
//                 res.status(500).json({ message: "unable to retrieve data" });
//             }

//             console.log(result)
//             res.status(200).json({ message: "success get user", data: result });
//         })


// });
