const { request } = require('express');
const express = require('express');
const router = express.Router();
const userModel = require('../models/user')

/**
 * @swagger
 * /user/{email}:
 *   get:
 *     tags:
 *       - User
 *     description: Get User info
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: path
 *         require: true
 *         type: string
 *         example: test@mail.com
 *     responses:
 *       200:
 *          description: success get user info
 *          content:
 *             application/json:
 *              example:
 *                  [
 *                   {
 *                      message: success get user email,
 *                      data: [
 *                              {
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
 *       
 *                   }
 *               ]
 *       400:
 *          description: Unauthorized
 *       default:
 *         description: unable to retrieve data
 *     security:
 *       - Secured: []
 */
router.get('/:email', function(req, res, next) {
    userModel.aggregate([{
                $match: { email: req.params.email }
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    userType: 1,
                    address: 1,
                    city: 1,
                    province: 1,
                    restaurantOwned: 1,
                }
            }
        ],
        (err, result) => {
            if (err) {
                res.status(500).json({ message: "unable to retrieve data" });
            }
            // console.log(JSON.stringify(result, undefined, 2))
            res.status(200).json({ message: "success get user info", data: result });
        })

})

/**
 * @swagger
 * /user/{email}:
 *   delete:
 *     tags:
 *       - User
 *     description: delete user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: term
 *         in: path
 *         require: true
 *         type: string
 *         example: test@mail.com
 *     responses:
 *       200:
 *          description: OK
 *          content:
 *             application/json:
 *              example:
 *                  [
 *                   {
 *                      message: success delete user info
 *                   }
 *               ]
 *       400:
 *          description: Fail to add 
 *       default:
 *         description: Fail to delete
 *     security:
 *       - Secured: []
 */
router.delete('/:email', function(req, res, next) {
    userModel.deleteOne({ email: req.params.email }).then((result) => {
        if (result.deleteCount < 1) {
            res.status(500).json({ message: "Fail to delete" });
        } else {
            res.status(200).json({ message: "success delete user info" });
        }
    })
})

/**
 * @swagger
 * /user/:
 *   post:
 *     tags:
 *       - User
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
 *         require: true
 *         type: string
 *         example: 1234 244 st
 *       - name: city
 *         in: body
 *         require: true
 *         type: string
 *         example: Vancouver
 *       - name: province
 *         in: body
 *         require: true
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
 *          description: Unauthorized 
 *       default:
 *         description: fail to create use
 *     security:
 *       - Secured: []
 */
router.post('/', function(req, res, next) {

    userModel.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userType: req.body.userType,
        address: req.body.address,
        city: req.body.city,
        provice: req.body.province,
    }).then((result) => {
        res.status(201).json({ message: "success post user info", data: result });
    }).catch((e) => {
        console.log(e)
        res.status(500).json({ message: "fail to create user", error: e.errors });
    })
})

/**
 * @swagger
 * /user/:
 *   patch:
 *     tags:
 *       - User
 *     description: Update User
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
 *         require: true
 *         type: string
 *         example: 1234 244 st
 *       - name: city
 *         in: body
 *         require: true
 *         type: string
 *         example: Vancouver
 *       - name: province
 *         in: body
 *         require: true
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
 *          description: Unauthorized 
 *       default:
 *         description: fail to create use
 *     security:
 *       - Secured: []
 */
router.patch('/', function(req, res, next) {
    // console.log(req.body)
    userModel.findOneAndUpdate({ _id: req.body.userid }, {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userType: req.body.userType,
        address: req.body.address,
        city: req.body.city,
        provice: req.body.city,
    }).then((result) => {
        // console.log(result)
        res.status(200).json({ message: "success update user info", data: result });

    }).catch((e) => {
        res.status(500).json({ message: "fail to update user", error: err.errors });
    })

})


module.exports = router;