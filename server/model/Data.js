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

})

module.exports = mongoose.model('data', DataSchema)