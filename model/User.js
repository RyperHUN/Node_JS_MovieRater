
var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User', {
    _id : Schema.Types.ObjectId,
    name : String,
    username : String,
    email : String,
    password : String,
    isAdmin : Boolean
});

module.exports = User;