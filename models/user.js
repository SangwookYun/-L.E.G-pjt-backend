const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectID } = require('mongodb');

const uniqueValidator = require('mongoose-unique-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *         _id:
 *           type: string
 *       email:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *
 *
 */
const dbUserShema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default : "I am a new user!"
    }, 
    couponlimit: {
        type: Number,
        default : 3
    }, 
    coupons: [ {
        type:Schema.Types.ObjectId,
        ref:'DBCoupon'
    }]
    // TODO: Need maybe user's credit card info

})
dbUserShema.plugin(uniqueValidator);
module.exports = mongoose.model('DBUser', dbUserShema);