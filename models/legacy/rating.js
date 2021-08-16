const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectID } = require('mongodb');


/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
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
const dbRatingShema = new Schema({
    _id: {
        type: String,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    restaurantID: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('DBRating', dbRatingShema);