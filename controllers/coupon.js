const coupon = require('../models/coupon')

exports.getCouponsByRestaurant = (req, res, next) => {
    const restaurant = req.params.restaurantId
    coupon.find({restaurant: restaurant},
        (err, result) => {
            console.log(err)
            if (err) {
                res.status(500).json({ message: "unable to retrieve data" });
            }

            console.log(result)
            res.status(200).json({ message: "success get coupon", data: result });
        })
} 
exports.getCouponsByUser = (req, res, next) => {
    // const user = req.body.userId
    const list_coupons = req.body.couponList
    const data_fetched = [];
    coupon.find({}, 
        (err, result)=> {
            console.log(err)
            if(err) {
                res.status(500).json({message : 'unable to retrieve data'});
            }
            console.log("this is result", result)
            console.log("this is list_coupons", list_coupons)
            for (const idx in result) {
                console.log(result[idx]._id)
                console.log(typeof(result[idx]._id))
                if(list_coupons.includes(result[idx]._id.toString())) {
                    console.log("this is included", result[idx])
                    data_fetched.push(result[idx])
                }
            }
            res.status(200).json({ message: "success get user's coupon", data: data_fetched });

        })
}

exports.getAllCoupons = (req, res, next) => {
    coupon.find({},
        (err, result) => {
            console.log(err)
            if (err) {
                res.status(500).json({ message: "unable to retrieve data" });
            }

            console.log(result)
            res.status(200).json({ message: "success get coupon", data: result });
        })
} 