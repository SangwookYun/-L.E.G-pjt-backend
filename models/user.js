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
    _id: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        max: 255,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    province: {
        type: String,
        required: false,
    },
    restaurantOwned: {
        type: [ObjectID],
        required: false
    },
    // TODO: Need maybe user's credit card info

})
dbUserShema.plugin(uniqueValidator);
module.exports = mongoose.model('DBUser', dbUserShema);