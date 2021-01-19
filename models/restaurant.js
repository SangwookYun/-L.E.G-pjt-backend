const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectID } = require('mongodb');

const uniqueValidator = require('mongoose-unique-validator');

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
const dbRestaurantSchema = new Schema({
    // _id: {
    //     type: String,
    // },
    name: {
        type: String,
        required: true,
    },
    newid: {
        type: String,
        required: true,
    },
    isBusiness: {
        type: Boolean,
        required: true,
    },
    mainTitle: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        max: 255,
    },
    phone: {
        type: Number,
        required: true,
    },
    website: {
        type: String,
        required: false,
    },
    mainPicture: {
        type: String,
        required: false,
    },
    address: {
        street: {
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
        postalCode: {
            type: String,
            required: false,
        },
        coordinate: {
            type: [Number, Number],
            required: false,
        },
    },
    //     hours: {
    //         type: Array,
    //         required: false,
    //     },
    //     hour: {
    //         type: Object,
    //         day: {
    //             type: String,
    //         },
    //         from: {
    //             type: String,
    //         },
    //         to: {
    //             type: String,
    //         },
    //         closed: {
    //             type: Boolean,
    //         }
    //     },
})
dbRestaurantSchema.plugin(uniqueValidator);
module.exports = mongoose.model('DBRestaurant', dbRestaurantSchema);