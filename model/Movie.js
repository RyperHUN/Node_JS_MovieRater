var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Movie = db.model('Movie', {
    _id : Schema.Types.ObjectId,
    name : String
});

module.exports = Movie;