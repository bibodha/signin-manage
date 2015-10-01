var mongoose = require('mongoose');

var kidSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    street: String,
    city: String,
    state: String,
    zip: Number,
    dateOfBirth: Date,
    gender: String,
    school: String
});

module.exports = mongoose.model('Kid', kidSchema);
