const { request } = require('express');
const express = require('express');
const router = express.Router();
const userModel = require('../models/user')

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
            res.status(200).json({ message: "success get user email", data: result });
        })

})

router.delete('/:email', function(req, res, next) {
    userModel.deleteOne({ email: req.params.email }).then((result) => {
        if (result.deleteCount < 1) {
            res.status(500).json({ message: "Fail to delete" });
        } else {
            res.status(200).json({ message: "success delete user info" });
        }
    })
})

router.post('/', function(req, res, next) {

    userModel.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userType: req.body.userType,
        address: req.body.address,
        city: req.body.city,
        provice: req.body.city,
    }).then((result) => {
        res.status(201).json({ message: "success post user info", data: result });
    }).catch((e) => {
        console.log(e)
        res.status(500).json({ message: "fail to create user", error: e.errors });
    })
})

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
        res.status(500).json({ message: "fail to updae user", error: err.errors });
    })

})


module.exports = router;