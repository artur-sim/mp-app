let mongoose = require('mongoose');


let DataSchema = new mongoose.Schema({

    product: {
        type: String,
    },
    brand: {
        type: String,
    },
    remainder: {
        type: Number,
    },
    columnName: {
        type: String,
    },
    columnValue: {
        type: String,
    },

})

module.exports = mongoose.model('data', DataSchema)