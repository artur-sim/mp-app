let mongoose = require('mongoose');


let UserShema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});

module.exports = mongoose.model('user', UserShema) 