const express = require('express');
const router = express.Router();
const coupon = require('../models/coupon')
const couponController = require('../controllers/coupon')


// router.get('/:restaurantID', (req, res, next)=> {
//     console.log("TESt")
//     console.log(req.params.restaurantID)
//     res.status(200).json({ message: "success get restaurant", data: req.params.restaurantID });
// })
router.get('/', couponController.getAllCoupons)
router.get('/:restaurantId', couponController.getCouponsByRestaurant)
router.post('/user', couponController.getCouponsByUser)
// router.post('/', function(req, res, next) {})
// router.patch('/:restaurantid', function(req, res, next) {})
// router.delete('/:restaurantid', function(req, res, next) {})

module.exports = router;

