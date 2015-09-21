var mongoose = require('mongoose');

var kidSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    street: String,
    city: String,
    state: String,
    zip: Number,
    dateOfBirth: Date,
    gender: String,
    school: String
});

module.exports = mongoose.model('Kid', kidSchema);
