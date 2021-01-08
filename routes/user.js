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
router.post('/:email', function(req, res, next) {
    res.status(200).json({ message: "success post user info" });
})
router.patch('/:email', function(req, res, next) {
    res.status(200).json({ message: "success update user info" });
})
router.delete('/:email', function(req, res, next) {
    res.status(200).json({ message: "success delete user info" });
})

module.exports = router;