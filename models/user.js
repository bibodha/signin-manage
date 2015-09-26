var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, 8);
};

userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
