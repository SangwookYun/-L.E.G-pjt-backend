const express = require('express');
const router = express.Router();
const advertisementModel = require('../../models/advertisement')
const restaurantModel = require('../../models/restaurant')

router.get('/:id', function(req, res, next) {
    advertisementModel.aggregate([{
            $match: { name: "Test" }
        }, {
            $project: {
                name: 1
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
    advertisementModel.find({},
    
        (err, result) => {
            console.log(err)
            if (err) {
                res.status(500).json({ message: "unable to retrieve data" });
            }

            console.log(result)
            res.status(200).json({ message: "success get All Advertisements!!", data: result });
        })
})


module.exports = router;