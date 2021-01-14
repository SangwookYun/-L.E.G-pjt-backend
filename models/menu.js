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
const dbMenuShema = new Schema({
    // _id: {
    //     type: String,
    // },

    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    restaurantID: {
        type: String,
        require: true,
    },
    items: {
        type: Array,
        required: true,
    },
    item: {
        type: Object,
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        description: {
            type: String,
        },
        picture: {
            type: String,
        }
    }

})

module.exports = mongoose.model('DBMenu', dbMenuShema);