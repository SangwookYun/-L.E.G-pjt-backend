const mongoose = require('mongoose');

const {Schema} = mongoose;

const dbAdvertisementSchema = new Schema({
    name : {
        type:String,
        required: true
    },
    picture : {
        type: String,
        required: true
    }, 
    priority : {
        type : Number,
        required :true
    }
}, {collection : "dbAdvertisements"})

module.exports = mongoose.model('dbAdvertisement', dbAdvertisementSchema)