const mongoose = require('mongoose');

const {Schema} = mongoose;

const dbCategory = new Schema({
    name : {
        type:String,
        required: true
    },
    picture : {
        type: String,
        required: true
    }, 
}, {collection : "dbCategory"})

module.exports = mongoose.model('dbCategory', dbCategory)