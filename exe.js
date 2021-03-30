var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/users",{ useNewUrlParser: true,useCreateIndex: true})
var db = mongoose.connection

//schema
var exeschema = mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    content: {
        type: String,
    },
    author: {
        type: String,
    }
});

var exescm = module.exports = mongoose.model('exescm', exeschema);
