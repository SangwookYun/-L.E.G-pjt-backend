const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectID } = require('mongodb');

const uniqueValidator = require('mongoose-unique-validator');

const dbCouponSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    restaurant: {
        type: String,
        required: true,
    },
    price : {
        type: String,
        required : true
    }, 
    qrcode : {
        type:String,
        required : true
    }, 
    qrcodedetail : {
        type:String,
        required : true
    }
    
})
dbCouponSchema.plugin(uniqueValidator);
module.exports = mongoose.model('DBCoupon', dbCouponSchema, 'dbCoupons');