var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/users",{ useNewUrlParser: true,useCreateIndex: true})
var db = mongoose.connection

//schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

var user = module.exports = mongoose.model('user', UserSchema);

module.exports.createUser = function (newUser, callback) {
    newUser.save(callback);
}