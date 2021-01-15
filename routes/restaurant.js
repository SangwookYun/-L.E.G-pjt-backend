const express = require('express');
const router = express.Router();
const restaurantModel = require('../models/restaurant')


// router.post('/', function(req, res, next) {

// })
// router.get('/:category', function(req, res, next) {

// })
router.get('/:restaurantid', function(req, res, next) {
    console.log(req.params.restaurantid)
    restaurantModel.aggregate([{
            $match: { newid: req.params.restaurantid}
        }, {
            $project: {
                _id: 1,
                newid:1,
                name: 1, 
                phone: 1,
                address: 1,
                cuisine: 1,
                email: 1,
                website:1
            }
        }],
        (err, result) => {
            console.log(err)
            if (err) {
                res.status(500).json({ message: "unable to retrieve data" });
            }

            console.log(result)
            res.status(200).json({ message: "success get restaurant", data: result });
        })
})

router.get('/', function(req, res, next) {
    console.log(req.params.restaurantid)
    restaurantModel.find({isBusiness: true},
        (err, result) => {
            console.log(err)
            if (err) {
                res.status(500).json({ message: "unable to retrieve data" });
            }

            console.log(result)
            res.status(200).json({ message: "success get restaurant", data: result });
        })
})
// router.patch('/:restaurantid', function(req, res, next) {

// })
// router.delete('/:restaurantid', function(req, res, next) {

// })

module.exports = router;