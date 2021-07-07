const restaurant = require('../models/restaurant')

exports.getAllRestaurants = (req, res, next) => {
    restaurant.find({isBusiness: true},
        (err, result) => {
            console.log(err)
            if (err) {
                res.status(500).json({ message: "unable to retrieve data" });
            }

            // console.log(result)
            res.status(200).json({ message: "success get restaurant", data: result });
        })
} 